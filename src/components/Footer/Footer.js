import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import git from '../../images/github.svg';
import facebook from '../../images/fb.svg';

function Footer() {
  return (
    <div className='footer container'>
      <p className='footer__copyright'>&copy; {new Date().getFullYear()} Supersite, Powered by News API</p>
      <div className='footer__container'>
        <ul className='footer__menu'>
          <li>
            <Link to='/' className='footer__link'>Главная</Link>
          </li>
          <li>
            <a href='https://praktikum.yandex.ru/' rel="noreferrer" target='_blank' className='footer__link'>Яндекс.Практикум</a>
          </li>
        </ul>
        <ul className='footer__socials'>
          <li className='footer__social'>
            <a href='https://github.com/AlexValyshev' rel="noreferrer" target='_blank' className='footer__social-link'>
              <img src={git} alt='ссылка на github' />
            </a>
          </li>
          <li className='footer__social'>
            <a href='https://facebook.com/' rel="noreferrer" target='_blank' className='footer__social-link'>
              <img src={facebook} alt='ссылка на facebook' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
