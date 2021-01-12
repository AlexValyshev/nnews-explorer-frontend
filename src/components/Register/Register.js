import React from 'react';
import './Register.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Register = ({
  isRegistered, openBox, onClose, onRegister,
  openPopupLogin, errorSubmit, setErrorSubmit, errorMessage,
  isRegisteredPopupOpen,
}) => {
  const [name, setName] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
    setErrorSubmit(false);
  }

  return (
    <PopupWithForm title='Регистрация' nameButton='Зарегистрироваться' link='Войти'
      isRegisteredPopupOpen={isRegisteredPopupOpen}
      isRegistered={isRegistered}
      openBox={openBox}
      onOpenPopupBox={openPopupLogin}
      onClose={onClose}
      onUserUpdate={onRegister}
      errorSubmit={errorSubmit}
      setErrorSubmit={setErrorSubmit}
      errorMessage={errorMessage}
      name={name}>
      <div className='popup__input-container'>
        <label className='popup__label'>Имя</label>
        <input className='popup__input'
          id='name'
          name='name'
          type='text'
          placeholder='Введите своё имя'
          minLength='2'
          maxLength='30'
          required
          onChange={handleNameChange}
        />
        <span id='name-error' className='popup__error'></span>
      </div>
    </PopupWithForm>
  );
};

export default Register;
