import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <section className='preloader'>
      <div className='preloader__box container'>
        <i className='preloader__search' />
        <h3 className="preloader__paragraph">Идет поиск новостей...</h3>
      </div>
    </section>
  );
}

export default Preloader;
