/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Popup.css';
import Registered from '../Registered/Registered';
import Register from '../Register/Register';
import Login from '../Login/Login';

function Popup({
  isRegistered, isOpen, isLoginPopupOpen, onClose,
  errorSubmit, setErrorSubmit, isRegisteredPopupOpen,
  errorMessage, isRegisterPopupOpen, onLogin, background,
  openPopupLogin, openPopupRegister, onRegister,
}) {
  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [handleEscClose]);

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''} ${background ? 'popup_background' : ''}`}
      onClick={handleOverlayClose}>
      <Login
        openBox={isLoginPopupOpen ? isOpen : false}
        isLoginPopupOpen={isLoginPopupOpen}
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
        isRegisterPopupOpen={isRegisterPopupOpen}
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
