import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <section className='not-found'>
      <div className='not-found__box container'>
        <div className='not-found__image'></div>
        <h2 className='not-found__title'>Ничего не найдено</h2>
        <p className='not-found__text'>К сожалению по вашему запросу ничего не найдено.</p>
      </div>
    </section>
  );
}

export default NotFound;
