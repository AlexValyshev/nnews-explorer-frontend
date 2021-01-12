import React from 'react';
import Button from '../Button/Button';
import './PopupWithForm.css';
import FormValidator from '../../utils/validation-form';
import validationConfig from '../../utils/validation-config';

function PopupWithForm({
  title, nameButton, link, isRegistered, children, onClose,
  onUserUpdate, errorSubmit, setErrorSubmit, openBox, isRegisteredPopupOpen,
  errorMessage, name, onOpenPopupBox,
}) {
  const form = React.useRef(null);
  const [formValid, setFormValid] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    const formValidation = new FormValidator(validationConfig, form.current);
    formValidation.enableValidation();
    setFormValid(formValidation);
  }, []);

  React.useEffect(() => {
    openBox ? formValid.resetForm() : form.current.reset();
  }, [formValid, openBox]);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    setErrorSubmit(false);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
    setErrorSubmit(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUserUpdate({
      email, password, name,
    });
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
        <form className={`popup__form ${isRegisteredPopupOpen ? 'popup__form_hidden' : ''} `}
          action="#" method="post"
          onSubmit={handleSubmit}
          noValidate
          ref={form}>
          <fieldset className='popup__info'>
            <div className='popup__input-container'>
              <label className='popup__label'>Email</label>
              <input className='popup__input'
                id={isRegisteredPopupOpen ? 'email-reg' : 'email'}
                name='email'
                type='email'
                placeholder='Введите почту'
                required
                onChange={handleEmailChange}
              />
              <span id={isRegisteredPopupOpen ? 'email-reg-error' : 'email-error'} className='popup__error' />
            </div>
            <div className='popup__input-container'>
              <label className='popup__label'>Пароль</label>
              <input className='popup__input'
                id={isRegisteredPopupOpen ? 'password-reg' : 'password'}
                name='password'
                type='password'
                placeholder='Введите пароль'
                minLength='6'
                maxLength='20'
                required
                onChange={handlePasswordChange}
              />
              <span id={isRegisteredPopupOpen ? 'password-reg-error' : 'password-error'} className='popup__error'></span>
            </div>
            {children}
          </fieldset>
          <span id='error' className={`popup__error popup__error_form ${errorSubmit ? 'popup__error_visible' : ''} `}>{errorMessage}</span>
          <Button
            popupForm={true}
            nameButton={nameButton}
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
