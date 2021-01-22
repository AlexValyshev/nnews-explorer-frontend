import React from 'react';
import './NotFound.css';

function NotFound({ errorNewsApi }) {
  return (
    <section className='not-found'>
      <div className='not-found__box container'>
        <div className='not-found__image'></div>
        <h2 className='not-found__title'>
          {errorNewsApi ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}
        </h2>
        <p className='not-found__text'>К сожалению по вашему запросу ничего не найдено.</p>
      </div>
    </section>
  );
}

export default NotFound;
