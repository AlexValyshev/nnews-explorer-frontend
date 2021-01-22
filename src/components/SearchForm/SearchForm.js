import React from 'react';
import './SearchForm.css';
import Button from '../Button/Button';

function SearchForm({
  onUpdateKeyword, errorSubmit, errorMessage, search,
  setErrorSubmit, setErrorMessage, setKeyword, keyword,
}) {
  const form = React.useRef(null);

  function handleKeyWordChange(evt) {
    setKeyword(evt.target.value);
    if (evt.target.value) {
      validationSearch();
    }
  }
  function validationSearch() {
    if (keyword.length < 1) {
      setErrorSubmit(true);
      setErrorMessage('Длина ключевого слова должна быть от 2 до 30 символов, сейчас 1 ');
    } else {
      setErrorSubmit(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (keyword === '') {
      setErrorSubmit(true);
      setErrorMessage('Нужно ввести ключевое слово');
    } if (keyword.length > 1) {
      onUpdateKeyword(keyword);
      form.current.reset();
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
            onChange={handleKeyWordChange} />
          <Button
            mainPage={true}
            search={search}
            nameButton='Искать'
            cardsList={false}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
