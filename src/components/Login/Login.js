import React from 'react';
import './Login.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Login({
  openBox, isRegistered, onClose, onLogin,
  openPopupRegister, errorSubmit, setErrorSubmit, errorMessage,
  isRegisteredPopupOpen,
}) {
  return (
    <PopupWithForm title='Вход' nameButton='Войти' link='Зарегистрироваться'
      isRegistered={isRegistered}
      onClose={onClose}
      onUserUpdate={onLogin}
      errorSubmit={errorSubmit}
      setErrorSubmit={setErrorSubmit}
      openBox={openBox}
      isRegisteredPopupOpen={isRegisteredPopupOpen}
      errorMessage={errorMessage}
      onOpenPopupBox={openPopupRegister}
    />
  );
}

export default Login;
