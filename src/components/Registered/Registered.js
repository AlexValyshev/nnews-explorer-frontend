import React from 'react';
import './Registered.css';

function Registered({
  isRegistered, onClose,
  openPopupLogin, openBox,
}) {
  return (
    <div className={`popup__container ${openBox ? 'popup__container_opened' : ''}
      popup__container_registered`}>
      <button onClick={onClose} className='popup__close' type='button' />
      <div className='popup__box'>
        <h2 className='popup__title popup__title_registered'>
          Пользователь успешно зарегистрирован!
        </h2>
        <div className='popup__choice popup__choice_registered'>{isRegistered ? '' : 'Или '}
          <button onClick={openPopupLogin} className='popup__link popup__link_registered'>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registered;
