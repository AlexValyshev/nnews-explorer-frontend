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
  isOpen, onClose, isLoginPopupOpen, isRegisteredPopupOpen, isLoggedIn, openPopup, onSignOut,
  onRegister, isRegistered, errorSubmit, setErrorSubmit, setKeyword, localKeyword, onDeleteNews,
  openPopupRegister, isPreloader, setErrorMessage, errorNewsApi, onOpenSavedNews,
  openPopupLogin, onLogin, isRegisterPopupOpen, savednewsCard,
  errorMessage, onSearchNews, newsCards, onSaveNews, localSavedNewsCards,
}) {
  const [isKeyword, setIsKeyword] = React.useState(false);
  const localNewsCards = (newsCards !== null && newsCards !== undefined);
  const keywordCardsResult = localNewsCards ? (newsCards.length > 0) : false;
  const keyword = (localKeyword === null || localKeyword === undefined) ? '' : localKeyword;
  const savedNewsCards = (localSavedNewsCards === null || localSavedNewsCards === undefined)
    ? [] : localSavedNewsCards;

  function handleUpdateKeyword(onUpdateKeyword) {
    setIsKeyword(true);
    onSearchNews(onUpdateKeyword);
  }

  return (
    <>
      <div className='main-background'>
        <Header mainPage={true}
          openPopup={openPopup}
          isLoggedIn={isLoggedIn}
          onSignOut={onSignOut}
          isOpen={isOpen}
          onOpenSavedNews={onOpenSavedNews}
        />
        <SearchForm search={true}
          onUpdateKeyword={handleUpdateKeyword}
          setKeyword={setKeyword}
          errorSubmit={errorSubmit}
          setErrorSubmit={setErrorSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          keyword={keyword}
          setIsKeyword={setIsKeyword}/>
      </div>
      {isPreloader ? <Preloader /> : ''}
      {keywordCardsResult && !isPreloader && !errorNewsApi ? <NewsCardList mainPage={true}
        isLoggedIn={isLoggedIn}
        openPopup={openPopup}
        keywordCardsResult={keywordCardsResult}
        newsCards={newsCards}
        onSaveNews={onSaveNews}
        keyword={keyword}
        savedNewsCards={savedNewsCards}
        onDeleteNews={onDeleteNews}
        savednewsCard={savednewsCard}
        isKeyword={isKeyword}
      /> : ''}
      {(isKeyword && !keywordCardsResult && !isPreloader) || errorNewsApi ? < NotFound errorNewsApi={errorNewsApi} /> : ''}
      <About />
      <Popup
        isOpen={isOpen}
        onClose={onClose}
        onLogin={onLogin}
        isLoginPopupOpen={isLoginPopupOpen}
        isRegisterPopupOpen={isRegisterPopupOpen}
        isRegisteredPopupOpen={isRegisteredPopupOpen}
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
