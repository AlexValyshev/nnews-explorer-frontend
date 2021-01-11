import React from 'react';
import './Popup.css';
import Registered from '../Registered/Registered';
import Register from '../Register/Register';
import Login from '../Login/Login';

function Popup({
  isRegistered, isOpen, isLoginPopupOpen, onClose,
  onCloseOverlay, errorSubmit, setErrorSubmit, isRegisteredPopupOpen,
  errorMessage, isRegisterPopupOpen, onLogin, background,
  openPopupLogin, openPopupRegister, onRegister,
}) {
  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''} ${background ? 'popup_background' : ''}`}
      onClick={onCloseOverlay}>
      <Login
        openBox={isLoginPopupOpen ? isOpen : false}
        isRegistered={isRegistered}
        onClose={onClose}
        onLogin={onLogin}
        openPopupRegister={openPopupRegister}
        errorSubmit={errorSubmit}
        setErrorSubmit={setErrorSubmit}
        errorMessage={errorMessage}
        isRegisteredPopupOpen={isRegisteredPopupOpen}
      />
      <Register
        openBox={isRegisterPopupOpen ? isOpen : false}
        isRegistered={isRegistered}
        onClose={onClose}
        onRegister={onRegister}
        openPopupLogin={openPopupLogin}
        isRegisteredPopupOpen={isRegisteredPopupOpen}
        errorSubmit={errorSubmit}
        setErrorSubmit={setErrorSubmit}
        errorMessage={errorMessage}
      />
      <Registered
        openBox={isRegisteredPopupOpen ? isOpen : false}
        isRegistered={isRegistered}
        onClose={onClose}
        openPopupLogin={openPopupLogin}
      />
    </section>
  );
}

export default Popup;
