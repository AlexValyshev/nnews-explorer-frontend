import React from 'react';
import './Register.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useFormWithValidation from '../../utils/validationForm';

const Register = ({
  isRegistered, openBox, onClose, onRegister,
  openPopupLogin, errorSubmit, setErrorSubmit, errorMessage,
  isRegisteredPopupOpen, isDisabled, isInputDisabled, setIsDisabled,
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {
    handleChange, errors, resetForm, values, isValid,
  } = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [openBox, resetForm]);

  function handleNameChange(evt) {
    setName(evt.target.value);
    setErrorSubmit(false);
    setIsDisabled(false);
    handleChange(evt);
  }

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
      email={email}
      password={password}
      name={name}
      isValid={isValid}
      isDisabled={isDisabled}
    >
      <fieldset className='popup__info'>
        <div className='popup__input-container'>
          <label className='popup__label'>Email</label>
          <input className='popup__input'
            id='email-reg'
            name='email'
            type='email'
            placeholder='Введите почту'
            required
            onChange={handleEmailChange}
            value={values.email || ''}
            disabled={isInputDisabled}
          />
          <span id='email-reg-error' className='popup__error popup__error_input'>{errors.email || ''}</span>
        </div>
        <div className='popup__input-container'>
          <label className='popup__label'>Пароль</label>
          <input className='popup__input'
            id='password-reg'
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
          <span id='password-reg-error' className='popup__error popup__error_input'>{errors.password || ''}</span>
        </div>
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
            value={values.name || ''}
            disabled={isInputDisabled}
          />
          <span id='name-error' className='popup__error popup__error_input'>{errors.name || ''}</span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default Register;
