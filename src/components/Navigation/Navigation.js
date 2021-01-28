import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Navigation.css';
import Button from '../Button/Button';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Navigation = ({
  mainPage, openPopup, onOpenSavedNews,
  handleMenuClick, isMenu, isLoggedIn, onSignOut, isOpen,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  function handleButtonIn() {
    handleMenuClick();
    openPopup();
  }

  function handleButtonOut() {
    handleMenuClick();
    history.push('/');
    onSignOut();
  }

  return (
    <div className='navigation'>
      <div className={isMenu ? 'navigation__container navigation__menu' : 'navigation__container'}>
        <nav className='navigation__links'>
          <NavLink to='/' onClick={handleMenuClick}
            className={`navigation__link ${mainPage ? 'navigation_theme-light navigation__link_active navigation__link_active_theme-light' : ''}
            ${isMenu ? 'navigation_theme-light' : ''}`}>
            Главная
          </NavLink>
          {isLoggedIn
            ? <NavLink to='/saved-news' onClick={mainPage ? onOpenSavedNews : handleMenuClick}
              className={`navigation__link ${(isMenu || mainPage) ? 'navigation_theme-light' : 'navigation__link_active'}`}>
              Сохраненные статьи
            </NavLink> : ''
          }
        </nav>
        <Button
          mainPage={mainPage}
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
