import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Popup from '../Popup/Popup';

function Main({
  isOpen, onClose, isLoginPopupOpen, isRegisteredPopupOpen, isLoggedIn, openPopup, setLoggedIn,
  onRegister, isRegistered, errorSubmit, setErrorSubmit, openPopupRegister,
  openPopupLogin, onLogin, isRegisterPopupOpen, errorMessage, onSearchNews, newsCards, onSaveNews,
}) {
  const [isKeyword, setIsKeyword] = React.useState('');
  const [isPreloader, setIsPreloader] = React.useState(false);

  const keywordCardsResult = (newsCards.length > 0 && (newsCards !== (undefined || null)));

  const handleUpdateKeyword = (onUpdateKeyword) => {
    setIsKeyword(onUpdateKeyword.keyword);
    onSearchNews(onUpdateKeyword.keyword);
    setIsPreloader(true);
    setTimeout(closePreloader, 1000);
  };

  const closePreloader = () => {
    setIsPreloader(false);
  };

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  return (
    <>
      <div className='main-background'>
        <Header mainPage={true}
          openPopup={openPopup}
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isOpen={isOpen}
        />
        <SearchForm mainPage={true}
          onUpdateKeyword={handleUpdateKeyword} />
      </div>
      {isPreloader ? <Preloader /> : ''}
      {keywordCardsResult && !isPreloader ? <NewsCardList mainPage={true}
        isLoggedIn={isLoggedIn}
        keywordCardsResult={keywordCardsResult}
        newsCards={newsCards}
        onSaveNews={onSaveNews}
        /> : ''}
      {isKeyword && !keywordCardsResult && !isPreloader ? < NotFound /> : ''}
      <About />
      <Popup
        isOpen={isOpen}
        onClose={onClose}
        onLogin={onLogin}
        isLoginPopupOpen={isLoginPopupOpen}
        isRegisterPopupOpen={isRegisterPopupOpen}
        isRegisteredPopupOpen={isRegisteredPopupOpen}
        onCloseOverlay={handleOverlayClose}
        onRegister={onRegister}
        isRegistered={isRegistered}
        errorSubmit={errorSubmit}
        setErrorSubmit={setErrorSubmit}
        errorMessage={errorMessage}
        openPopupRegister={openPopupRegister}
        openPopupLogin={openPopupLogin}
      />
    </>
  );
}

export default Main;
