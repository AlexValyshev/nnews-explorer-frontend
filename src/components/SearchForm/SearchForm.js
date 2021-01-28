import React from 'react';
import './SearchForm.css';
import Button from '../Button/Button';
import { TimeDelayError, TimeDelayReset } from '../../utils/constant';

function SearchForm({
  onUpdateKeyword, errorSubmit, errorMessage, search, setIsDisabled,
  setErrorSubmit, setErrorMessage, isDisabled,
}) {
  const form = React.useRef(null);
  const [inputSearch, setInputSearch] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);

  function handleKeyWordChange(evt) {
    if (evt.target) {
      validationSearch(evt.target);
    }
    setInputSearch(evt.target.value);
  }

  function validationSearch(input) {
    if (!input.validity.valid) {
      setErrorSubmit(true);
      setErrorMessage(input.validationMessage);
    } else {
      setErrorSubmit(false);
    }
  }

  function handleOutInput() {
    setTimeout(resetInput, TimeDelayReset);
  }

  function resetInput() {
    if (!isSubmit) {
      form.current.reset();
      setInputSearch('');
      setErrorSubmit(false);
    }
  }

  function removeError() {
    setErrorSubmit(false);
    setIsSubmit(false);
    setIsDisabled(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSubmit(true);
    if (inputSearch === '') {
      setErrorSubmit(true);
      setErrorMessage('Нужно ввести ключевое слово');
      setIsDisabled(true);
      setTimeout(removeError, TimeDelayError); // Ошибка исчезнет через 2 секунды.
    } if (inputSearch.length > 1) {
      onUpdateKeyword(inputSearch);
      form.current.reset();
      setInputSearch('');
      setIsSubmit(false);
    }
  }

  return (
    <section className='search container'>
      <h1 className='search__title'>Что творится в мире?</h1>
      <p className='search__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className='search__form'
        action="#" method="post"
        noValidate
        ref={form}
        onBlur={handleOutInput}
        onSubmit={handleSubmit}>
        <span id="search-input-error" className={`search__error ${errorSubmit ? 'search__error_visible' : ''}`}>
          {errorMessage}
        </span>
        <div className='search__container'>
          <input className='search__input' type="text" name="search"
            id='search-input'
            placeholder='Введите тему новости'
            minLength='2'
            maxLength="30"
            required
            onChange={handleKeyWordChange}
            disabled={isDisabled}
          />
          <Button
            mainPage={true}
            search={search}
            nameButton='Искать'
            cardsList={false}
            isDisabled={isDisabled}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
