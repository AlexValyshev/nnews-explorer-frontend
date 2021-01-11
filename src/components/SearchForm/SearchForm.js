import React from 'react';
import './SearchForm.css';
import Button from '../Button/Button';

function SearchForm({ mainPage, onUpdateKeyword }) {
  const currentKeyword = React.useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateKeyword({
      keyword: currentKeyword.current.value,
    });
  }

  return (
    <section className='search container'>
      <h1 className='search__title'>Что творится в мире?</h1>
      <p className='search__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className='search__form'
        action="#" method="post"
        onSubmit={handleSubmit}>
        <span id="search-input-error" className="search__error" />
        <div className='search__container'>
          <input className='search__input' type="text" name="search"
            placeholder='Введите тему новости'
            minLength='2'
            maxLength="30"
            required
            ref={currentKeyword} />
          <Button
            mainPage={mainPage}
            search={true}
            loggedIn={false}
            nameButton='Искать'
            cardsList={false}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
