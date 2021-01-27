import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({
  mainPage, savedNewsPage, openPopup, isLoggedIn, onSignOut, isOpen, onOpenSavedNews,
}) => {
  const [isMenu, setIsMenu] = React.useState(false);

  function handleMenuClick() {
    setIsMenu(!isMenu);
  }

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      handleMenuClick();
    }
  }

  return (
    <header className={` header ${mainPage ? 'header_theme_light' : ''}
    ${isMenu ? 'header_theme_background' : ''}
    ${!isOpen ? 'header_fixed' : ''}`} >
      <div onClick={handleOverlayClose} className={isMenu ? 'navigation__background' : ''}></div>
      <div className='header__container container'>
        <Link to={savedNewsPage ? '/' : '#'} onClick={isMenu ? handleMenuClick : null}
          className={`header__title ${mainPage ? 'header__title_theme_light' : ''} ${isMenu ? 'header__title_theme_light' : ''}`}>
        NewsExplorer
        </Link>
        <Navigation
          mainPage={mainPage}
          openPopup={openPopup}
          savedNewsPage={savedNewsPage}
          isLoggedIn={isLoggedIn}
          onSignOut={onSignOut}
          handleMenuClick={handleMenuClick}
          isMenu={isMenu}
          isOpen={isOpen}
          onOpenSavedNews={onOpenSavedNews}
        />
      </div>
    </header >
  );
};

export default Header;
