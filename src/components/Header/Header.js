import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({
  mainPage, savedNews, openPopup, isLoggedIn, setLoggedIn, isOpen,
}) => {
  const [isMenu, setIsMenu] = React.useState(false);

  function handleMenuClick() {
    setIsMenu(!isMenu);
  }

  return (
    <header className={` header ${mainPage ? 'header_theme_light' : ''}
    ${isMenu ? 'header_theme_background' : ''}
    ${!isOpen ? 'header_fixed' : ''}`} >
      <div className='header__container container'>
        <Link to='/' className={`header__title ${mainPage ? 'header__title_theme_light' : ''} ${isMenu ? 'header__title_theme_light' : ''}`}>
        NewsExplorer
        </Link>
        <Navigation
          mainPage={mainPage}
          openPopup={openPopup}
          savedNews={savedNews}
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          handleMenuClick={handleMenuClick}
          isMenu={isMenu}
          isOpen={isOpen}
        />
      </div>
    </header >
  );
};

export default Header;
