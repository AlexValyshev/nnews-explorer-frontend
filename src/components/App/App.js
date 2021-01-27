import React from 'react';
import {
  Switch, Route, useHistory,
} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import { newsApi } from '../../utils/NewsApi';
import * as mainApi from '../../utils/MainApi';
import { TimeDelaySearch, TimeDelayPopup, TimeDelaySubmit } from '../../utils/constant';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isRegisteredPopupOpen, setRegisteredPopupOpen] = React.useState(false);
  const [isRegistered, setRegistered] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [isKeyword, setIsKeyword] = React.useState(false);
  const [errorSubmit, setErrorSubmit] = React.useState(false);
  const [errorNewsApi, setErrorNewsApi] = React.useState(false);
  const [errorMainApi, setErrorMainApi] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [newsCards, setNewsCards] = React.useState([]);
  const [savedNewsCards, setSavedNewsCards] = React.useState([]);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);
  const history = useHistory();
  const [number, setNumberCard] = React.useState(1);

  function handleOpenPopup() {
    setLoginPopupOpen(true);
    setIsOpen(true);
  }

  function handleLoginClick() {
    setLoginPopupOpen(true);
  }

  function openPopupLogin() {
    setRegisterPopupOpen(false);
    setErrorSubmit(false);
    setRegisteredPopupOpen(false);
    setTimeout(handleLoginClick, TimeDelayPopup);
  }

  function handleRegisterClick() {
    setRegisterPopupOpen(true);
  }

  function openPopupRegister() {
    setLoginPopupOpen(false);
    setErrorSubmit(false);
    setTimeout(handleRegisterClick, TimeDelayPopup);
  }

  function handleRegisteredClick() {
    setRegisteredPopupOpen(true);
  }

  function closeAllPopups() {
    setIsOpen(false);
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setRegisteredPopupOpen(false);
    setErrorSubmit(false);
    setErrorMainApi(false);
    setErrorMessage(false);
  }

  function closePreloader() {
    setIsPreloader(false);
  }

  function unlockButton() {
    setIsDisabled(false);
    setIsInputDisabled(false);
  }

  function visibleErrorSubmit() {
    setErrorSubmit(true);
    setIsInputDisabled(false);
  }

  function openPopupWithError() {
    setIsOpen(true);
    setRegisteredPopupOpen(true);
    setErrorMainApi(true);
    setErrorMessage('Ошибка при сохранении, попробуйте позже.');
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.tokenValid(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          setKeyword(JSON.parse(localStorage.getItem('keyword')));
          const oldNumber = JSON.parse(localStorage.getItem('number'));
          console.log(oldNumber);
          const number1 = (oldNumber === null) ? 1 : oldNumber;
          setNumberCard(number1);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token');
          setLoggedIn(false);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    setSavedNewsCards(JSON.parse(localStorage.getItem('savedCards')));
    setNewsCards(JSON.parse(localStorage.getItem('newsCards')));
  }, []);

  function onRegister(email, password, name) {
    setIsDisabled(true);
    setIsInputDisabled(true);
    auth.register(email, password, name)
      .then(() => {
        setRegisterPopupOpen(false);
        setRegistered(true);
        setTimeout(handleRegisteredClick, TimeDelayPopup);
        setTimeout(unlockButton, TimeDelayPopup);
      })
      .catch((err) => {
        setTimeout(visibleErrorSubmit, TimeDelaySubmit);
        if (err.message === '409') {
          setErrorMessage('Такой пользователь уже есть');
        } else if (err.message === '400') {
          setErrorMessage('Пароль или email введены некорректно!');
        } else {
          setErrorMessage('Ошибка сервера!');
        }
      });
  }

  function onLogin(email, password) {
    setIsDisabled(true);
    setIsInputDisabled(true);
    auth.login(email, password)
      .then((data) => {
        setTimeout(closeAllPopups, TimeDelayPopup);
        setTimeout(unlockButton, TimeDelayPopup);
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setKeyword(localStorage.removeItem('keyword'));
        setNewsCards(localStorage.removeItem('newsCards'));
        setIsKeyword(false);
        handleOpenSavedMews();
        history.push('/');
      })
      .catch((err) => {
        setTimeout(visibleErrorSubmit, TimeDelaySubmit);
        if (err.message === '401') {
          setErrorMessage('Вы не зарегестрированы');
        } else if (err.message === '400') {
          setErrorMessage('Пароль или email введены некорректно!');
        } else {
          setErrorMessage('Ошибка сервера!');
        }
      });
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setKeyword(localStorage.removeItem('keyword'));
    setSavedNewsCards(localStorage.removeItem('savedCards'));
    setNewsCards(localStorage.removeItem('newsCards'));
    setNumberCard(localStorage.removeItem('number'));
    setLoggedIn(false);
    setIsKeyword(false);
    setErrorNewsApi(false);
    setCurrentUser({});
    setNumberCard(1);
    setKeyword('');
  }

  function handleSearchNews(updateKeyword) {
    setErrorNewsApi(false);
    setIsPreloader(true);
    setIsDisabled(true);
    newsApi.getNews(updateKeyword)
      .then((data) => {
        setTimeout(closePreloader, TimeDelaySearch);
        setTimeout(unlockButton, TimeDelaySearch);
        setNewsCards(data.articles);
        localStorage.setItem('newsCards', JSON.stringify(data.articles));
        localStorage.setItem('keyword', JSON.stringify(updateKeyword));
        if (data.totalResults === 0) {
          setIsKeyword(true);
          setKeyword('');
        } else {
          setIsKeyword(false);
          setKeyword(updateKeyword);
        }
      })
      .catch((err) => {
        setTimeout(closePreloader, TimeDelaySearch);
        setTimeout(unlockButton, TimeDelaySearch);
        setErrorNewsApi(true);
      });
  }

  function addIdNewNewsCards(card) {
    return newsCards.map((item) => {
      if (item.url === card.link) {
        return { ...item, _id: card._id };
      }
      return item;
    });
  }

  function handleSaveNews(card, IconSaveDel) {
    const jwt = localStorage.getItem('token');
    mainApi.addArticle(card, jwt)
      .then((savedCard) => {
        const newNewsCards = addIdNewNewsCards(savedCard);
        setNewsCards(newNewsCards);
        localStorage.setItem('newsCards', JSON.stringify(newNewsCards));
        const newNumber = savedCard.number + 1;
        setNumberCard(newNumber);
        localStorage.setItem('number', JSON.stringify(newNumber));
      })
      .catch((err) => {
        console.log(err.message);
        IconSaveDel(err);
        openPopupWithError();
        setErrorMessage('Ошибка при сохранении, попробуйте позже.');
      });
  }

  function handleOpenSavedMews() {
    const jwt = localStorage.getItem('token');
    mainApi.getArticles(jwt)
      .then((savedCards) => {
        const result1 = [...savedCards];
        const result2 = result1.sort((a, b) => b.number - a.number);
        setSavedNewsCards(result2);
        localStorage.setItem('savedCards', JSON.stringify(result2));
        const startNumberCard = (savedCards === [] || savedCards === null
        || savedCards === undefined)
          ? 1 : Math.max.apply(null, savedCards.map((item) => item.number)) + 1;
        setNumberCard(startNumberCard);
        localStorage.setItem('number', JSON.stringify(startNumberCard));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function delIdNewNewsCard(card) {
    const newNewsCards = newsCards.map((item) => {
      if (item.url === card) {
        return { ...item, _id: '' };
      }
      return item;
    });
    setNewsCards(newNewsCards);
    localStorage.setItem('newsCards', JSON.stringify(newNewsCards));
  }

  function handleDeleteNews(card, IconSave) {
    const jwt = localStorage.getItem('token');
    mainApi.deleteArticle(card._id, jwt)
      .then((delCard) => {
        const newSavedNewsCards = savedNewsCards.filter((item) => item._id !== delCard._id);
        setSavedNewsCards(newSavedNewsCards);
        localStorage.setItem('savedCards', JSON.stringify(newSavedNewsCards));
        if (newsCards !== null || newsCards !== undefined) {
          delIdNewNewsCard(delCard.link);
        }
      })
      .catch((err) => {
        console.log(err.message);
        IconSave(err);
        openPopupWithError();
        setErrorMessage('Ошибка при удалении, попробуйте позже.');
      });
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main
              isOpen={isOpen}
              openPopup={handleOpenPopup}
              isLoggedIn={isLoggedIn}
              onSignOut={onSignOut}
              errorSubmit={errorSubmit}
              setErrorSubmit={setErrorSubmit}
              errorMessage={errorMessage}
              onSearchNews={handleSearchNews}
              newsCards={newsCards}
              onSaveNews={handleSaveNews}
              isPreloader={isPreloader}
              setErrorMessage={setErrorMessage}
              errorNewsApi={errorNewsApi}
              localKeyword={keyword}
              isKeyword={isKeyword}
              onOpenSavedNews={handleOpenSavedMews}
              onDeleteNews={handleDeleteNews}
              localSavedNewsCards={savedNewsCards}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
              number={number}
            />
          </Route>
          <ProtectedRoute exact path='/saved-news'
            component={SavedNews}
            isLoggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
            openPopup={handleOpenPopup}
            onSignOut={onSignOut}
            localSavedNewsCards={savedNewsCards}
            onDeleteNews={handleDeleteNews}
          />
        </Switch>
      </CurrentUserContext.Provider>
      <Popup
        isOpen={isOpen}
        onClose={closeAllPopups}
        onLogin={onLogin}
        isLoginPopupOpen={isLoginPopupOpen}
        isRegisterPopupOpen={isRegisterPopupOpen}
        isRegisteredPopupOpen={isRegisteredPopupOpen}
        onRegister={onRegister}
        isRegistered={isRegistered}
        errorSubmit={errorSubmit}
        errorMainApi={errorMainApi}
        setErrorSubmit={setErrorSubmit}
        errorMessage={errorMessage}
        openPopupRegister={openPopupRegister}
        openPopupLogin={openPopupLogin}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        isInputDisabled={isInputDisabled}
      />
      <Footer />
    </div>
  );
}

export default App;
