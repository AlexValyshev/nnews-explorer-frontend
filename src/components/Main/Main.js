import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
// import Popup from '../Popup/Popup';

function Main({
  isOpen, isLoggedIn, openPopup, onSignOut,
  errorSubmit, setErrorSubmit, localKeyword, onDeleteNews,
  isPreloader, setErrorMessage, errorNewsApi, onOpenSavedNews,
  isDisabled, setIsDisabled, isKeyword,
  errorMessage, onSearchNews, newsCards, onSaveNews, localSavedNewsCards, number,
}) {
  const localNewsCards = (newsCards !== null && newsCards !== undefined);
  const keywordCardsResult = localNewsCards
    ? ((newsCards.length > 0 && newsCards.length !== 0)) : false;
  const keyword = (localKeyword === null || localKeyword === undefined) ? '' : localKeyword;
  const savedNewsCards = (localSavedNewsCards === null || localSavedNewsCards === undefined)
    ? [] : localSavedNewsCards;

  function handleUpdateKeyword(onUpdateKeyword) {
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
          errorSubmit={errorSubmit}
          setErrorSubmit={setErrorSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setIsDisabled={setIsDisabled}
          isDisabled={isDisabled}/>
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
        number={number}
      /> : ''}
      {(isKeyword && !keywordCardsResult && !isPreloader) || errorNewsApi ? < NotFound errorNewsApi={errorNewsApi} /> : ''}
      <About />
    </>
  );
}

export default Main;
