import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth';
import { newsApi } from '../../utils/NewsApi';
import * as mainApi from '../../utils/MainApi';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isRegisteredPopupOpen, setRegisteredPopupOpen] = React.useState(false);
  const [isRegistered, setRegistered] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [errorSubmit, setErrorSubmit] = React.useState(false);
  const [errorNewsApi, setErrorNewsApi] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [newsCards, setNewsCards] = React.useState([]);
  const [savedNewsCards, setSavedNewsCards] = React.useState([]);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const history = useHistory();

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
    setTimeout(handleLoginClick, 700);
  }

  function handleRegisterClick() {
    setRegisterPopupOpen(true);
  }

  function openPopupRegister() {
    setLoginPopupOpen(false);
    setErrorSubmit(false);
    setTimeout(handleRegisterClick, 700);
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
  }

  function closePreloader() {
    setIsPreloader(false);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.tokenValid(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token');
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    setKeyword(localStorage.getItem('keyword'));
    setSavedNewsCards(JSON.parse(localStorage.getItem('savedCards')));
    setNewsCards(JSON.parse(localStorage.getItem('newsCards')));
  }, []);

  function onRegister(email, password, name) {
    auth.register(email, password, name)
      .then(() => {
        setRegisterPopupOpen(false);
        setRegistered(true);
        setTimeout(handleRegisteredClick, 700);
      })
      .catch((err) => {
        setErrorSubmit(true);
        setErrorMessage('Такой пользователь уже есть');
        console.log(`Ошибка: ${err.message}`);
      });
  }

  function onLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        closeAllPopups();
        setLoggedIn(true);
        setKeyword(localStorage.removeItem('keyword'));
        setNewsCards(localStorage.removeItem('newsCards'));
        handleOpenSavedMews();
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        if (err.message === '401') {
          setErrorMessage('Вы не зарегестрированы');
        } else {
          setErrorMessage('Пароль или email введены некорректно!');
        }
        setErrorSubmit(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setKeyword(localStorage.removeItem('keyword'));
    setSavedNewsCards(localStorage.removeItem('savedCards'));
    setNewsCards(localStorage.removeItem('newsCards'));
    setLoggedIn(false);
    setCurrentUser({});
    setKeyword('');
    console.log(keyword);
  }

  function handleSearchNews(updateKeyword) {
    console.log(updateKeyword);
    setErrorNewsApi(false);
    setIsPreloader(true);
    newsApi.getNews(updateKeyword)
      .then((data) => {
        setTimeout(closePreloader, 1000);
        setNewsCards(data.articles);
        localStorage.setItem('newsCards', JSON.stringify(data.articles));
        setKeyword(updateKeyword);
        localStorage.setItem('keyword', updateKeyword);
      })
      .catch((err) => {
        setTimeout(closePreloader, 1000);
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

  function handleSaveNews(card) {
    const jwt = localStorage.getItem('token');
    mainApi.addArticle(card, jwt)
      .then((savedCard) => {
        const newNewsCards = addIdNewNewsCards(savedCard);
        setNewsCards(newNewsCards);
        localStorage.setItem('newsCards', JSON.stringify(newNewsCards));
        setSavedNewsCards([savedCard, ...savedNewsCards]);
        localStorage.setItem('savedCards', JSON.stringify([savedCard, ...savedNewsCards]));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleOpenSavedMews() {
    const jwt = localStorage.getItem('token');
    mainApi.getArticles(jwt)
      .then((savedCards) => {
        setSavedNewsCards(savedCards);
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
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

  function handleDeleteNews(card) {
    const jwt = localStorage.getItem('token');
    mainApi.deleteArticle(card._id, jwt)
      .then((delCard) => {
        const newSavedNewsCards = savedNewsCards.filter((item) => item._id !== delCard._id);
        setSavedNewsCards(newSavedNewsCards);
        localStorage.setItem('savedCards', JSON.stringify(newSavedNewsCards));
        delIdNewNewsCard(delCard.link);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main
              isOpen={isOpen}
              onClose={closeAllPopups}
              onLogin={onLogin}
              isLoginPopupOpen={isLoginPopupOpen}
              isRegisterPopupOpen={isRegisterPopupOpen}
              isRegisteredPopupOpen={isRegisteredPopupOpen}
              openPopup={handleOpenPopup}
              isLoggedIn={isLoggedIn}
              onSignOut={onSignOut}
              onRegister={onRegister}
              isRegistered={isRegistered}
              errorSubmit={errorSubmit}
              setErrorSubmit={setErrorSubmit}
              errorMessage={errorMessage}
              openPopupLogin={openPopupLogin}
              openPopupRegister={openPopupRegister}
              onSearchNews={handleSearchNews}
              newsCards={newsCards}
              onSaveNews={handleSaveNews}
              isPreloader={isPreloader}
              setErrorMessage={setErrorMessage}
              errorNewsApi={errorNewsApi}
              localKeyword={keyword}
              setKeyword={setKeyword}
              onOpenSavedNews={handleOpenSavedMews}
              onDeleteNews={handleDeleteNews}
              localSavedNewsCards={savedNewsCards}
            />
          </Route>
          <ProtectedRoute exact path='/saved-news'
            component={SavedNews}
            isLoggedIn={isLoggedIn}
            openPopup={handleOpenPopup}
            onSignOut={onSignOut}
            localSavedNewsCards={savedNewsCards}
            onDeleteNews={handleDeleteNews}
          />
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
