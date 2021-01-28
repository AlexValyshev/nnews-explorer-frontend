import React from 'react';
import './Login.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../utils/validationForm';

function Login({
  openBox, isRegistered, onClose, onLogin,
  openPopupRegister, errorSubmit, setErrorSubmit, errorMessage,
  isRegisteredPopupOpen, isDisabled, isInputDisabled, setIsDisabled,
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {
    handleChange, errors, resetForm, values, isValid,
  } = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [openBox, resetForm]);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    setErrorSubmit(false);
    setIsDisabled(false);
    handleChange(evt);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
    setErrorSubmit(false);
    setIsDisabled(false);
    handleChange(evt);
  }

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
      email={email}
      password={password}
      isValid={isValid}
      isDisabled={isDisabled}
    >
      <fieldset className='popup__info'>
        <div className='popup__input-container'>
          <label className='popup__label'>Email</label>
          <input className='popup__input'
            id='email'
            name='email'
            type='email'
            placeholder='Введите почту'
            required
            onChange={handleEmailChange}
            value={values.email || ''}
            disabled={isInputDisabled}
          />
          <span id='email-error' className='popup__error popup__error_input'>{errors.email || ''}</span>
        </div>
        <div className='popup__input-container'>
          <label className='popup__label'>Пароль</label>
          <input className='popup__input'
            id='password'
            name='password'
            type='password'
            placeholder='Введите пароль'
            minLength='6'
            maxLength='20'
            required
            onChange={handlePasswordChange}
            value={values.password || ''}
            disabled={isInputDisabled}
          />
          <span id='password-error' className='popup__error popup__error_input'>{errors.password || ''}</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default Login;
