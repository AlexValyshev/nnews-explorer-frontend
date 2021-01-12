import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Navigation.css';
import Button from '../Button/Button';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Navigation = ({
  mainPage, openPopup, savedNews,
  handleMenuClick, isMenu, isLoggedIn, setLoggedIn, isOpen,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  const handleButtonIn = () => {
    handleMenuClick();
    openPopup();
  };

  const handleButtonOut = () => {
    history.push('/');
    setLoggedIn(false);
  };
  return (
    <div className='navigation'>

      <div className={isMenu ? 'navigation__container navigation__menu' : 'navigation__container'}>
        <div className={isMenu ? 'navigation__background' : ''}></div>
        <nav className='navigation__links'>
          <NavLink to='/' className={`navigation__link ${mainPage ? 'navigation_theme-light navigation__link_active navigation__link_active_theme-light' : ''}
            ${isMenu ? 'navigation_theme-light' : ''}`}>
            Главная
          </NavLink>
          {isLoggedIn
            ? <NavLink to='/saved-news' className={`navigation__link ${(isMenu || mainPage) ? 'navigation_theme-light' : 'navigation__link_active'}`}>
              Сохраненные статьи
            </NavLink> : ''
          }
        </nav>
        <Button
          mainPage={mainPage}
          savedNews={savedNews}
          nameButton={isLoggedIn ? currentUser.name : 'Авторизоваться'}
          isMenu={isMenu}
          handleButtonIn={handleButtonIn}
          handleButtonOut={handleButtonOut}
          search={false}
          isLoggedIn={isLoggedIn}
          cardsList={false}
        />
      </div>
      <div onClick={handleMenuClick}
        className={`navigation__icon-menu
          ${isOpen ? 'navigation__icon-menu_hidden' : ''}
          ${isMenu ? 'navigation__icon-menu_close ' : 'navigation__icon-menu_open'}
          ${!isMenu && mainPage ? 'navigation__icon-menu_theme-light' : ''}`}>
      </div>
    </div>
  );
};

export default Navigation;
