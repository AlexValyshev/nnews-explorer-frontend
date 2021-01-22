import React from 'react';
import Button from '../Button/Button';
import './PopupWithForm.css';

function PopupWithForm({
  title, nameButton, link, isRegistered, children, onClose,
  onUserUpdate, errorSubmit, openBox, isRegisteredPopupOpen,
  errorMessage, name, email, password, onOpenPopupBox, isValid,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onUserUpdate(email, password, name);
  }

  function handleLinkChange() {
    onOpenPopupBox();
  }

  return (
    <div className={`popup__container ${openBox ? 'popup__container_opened' : ''}
      ${isRegisteredPopupOpen ? 'popup__container_registered' : 'popup__container_form'}`}>
      <button onClick={onClose} className='popup__close' type='button' />
      <div className='popup__box'>
        <h2 className={`popup__title ${isRegisteredPopupOpen ? 'popup__title_registered' : ''}`}>{title}</h2>
        <form className={`popup__form ${(isRegisteredPopupOpen) ? 'popup__form_hidden' : ''} `}
          action="#" method="post"
          onSubmit={handleSubmit}
          noValidate
        >
            {children}
          <span id='error' className={`popup__error popup__error_form ${errorSubmit ? 'popup__error_visible' : ''} `}>{errorMessage}</span>
          <Button
            popupForm={true}
            nameButton={nameButton}
            isDisabled={isValid}
          />
        </form>
        <div className={`popup__choice ${isRegisteredPopupOpen ? 'popup__choice_registered' : ''}`}>{isRegistered ? '' : 'Или '}
        <button onClick={handleLinkChange} className={`popup__link ${isRegisteredPopupOpen ? 'popup__link_registered' : ''}`}>
        {link}
        </button>
      </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
