import React from 'react';
import photo from '../../images/main-photo.jpg';
import './About.css';

function About() {
  return (
    <section className='about container'>
      <div className='about__photo-container'>
        <img className='about__photo' src={photo} alt='Фото автора' />
      </div>
      <div className='about__container'>
        <h2 className='about__title'>Об авторе</h2>
        <p className='about__info'>
          Вся моя жизнь - это обучение.
          И данный проект не исключение - это шаг к дальнейшему развитию!
        </p>
      </div>
    </section>
  );
}

export default About;
