/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Popup.css';
import Registered from '../Registered/Registered';
import Register from '../Register/Register';
import Login from '../Login/Login';

function Popup({
  isRegistered, isOpen, isLoginPopupOpen, onClose,
  errorSubmit, setErrorSubmit, isRegisteredPopupOpen, errorMainApi,
  errorMessage, isRegisterPopupOpen, onLogin, background, setIsDisabled,
  openPopupLogin, openPopupRegister, onRegister, isDisabled, isInputDisabled,
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
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        isInputDisabled={isInputDisabled}
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
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        isInputDisabled={isInputDisabled}
      />
      <Registered
        openBox={isRegisteredPopupOpen ? isOpen : false}
        isRegistered={isRegistered}
        onClose={onClose}
        openPopupLogin={openPopupLogin}
        errorMainApi={errorMainApi}
        errorMessage={errorMessage}
      />
    </section>
  );
}

export default Popup;
