import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import cards from '../../utils/cards';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isRegistered, setRegistered] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [errorSubmit, setErrorSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [isRegisteredPopupOpen, setRegisteredPopupOpen] = React.useState(false);
  const userInfo = {
    name: 'Александр',
    email: 'av@mail.ru',
    password: '123456',
  };
  const [currentUser, setCurrentUser] = React.useState(userInfo);
  const [newsCards, setNewsCards] = React.useState([]);
  const [savedNewsCards, setSavedNewsCards] = React.useState(cards);

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

  function onRegister(userRegisrationData) {
    if (userRegisrationData.email === currentUser.email) {
      setErrorSubmit(true);
      setErrorMessage('Такой пользователь уже есть');
    } else {
      setRegisterPopupOpen(false);
      setCurrentUser(userRegisrationData);
      setRegistered(true);
      setTimeout(handleRegisteredClick, 700);
    }
  }

  function onLogin(userLoginData) {
    if ((userLoginData.email === currentUser.email)
      && (userLoginData.password === currentUser.password)) {
      closeAllPopups();
      setLoggedIn(true);
    } else {
      if (userLoginData.email !== currentUser.email) {
        setErrorMessage('Вы не зарегестрированы');
      } else {
        setErrorMessage('Пароль или email введены некорректно!');
      }
      setErrorSubmit(true);
    }
  }

  function handleSearchNews(keyword) {
    // Здесь будет запрос к newsApi по ключевому слову "keyword"
    //  пока сделаем вооброжаемый поиск из исходного массива новостей в файле "cards"
    const keywordCards = cards.filter((item) => {
      if (item.keyword === keyword) {
        return true;
      }
      return false;
    });
    setNewsCards(keywordCards);
  }

  function handleSaveNews(newCard) {
    // Здесь будет запрос к моему Api на сохрание статьи
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
              setLoggedIn={setLoggedIn}
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
              />
          </Route>
          <Route path='/saved-news'>
            <SavedNews
              isLoggedIn={true}
              setLoggedIn={setLoggedIn}
              savedNewsCards={savedNewsCards}
            />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
