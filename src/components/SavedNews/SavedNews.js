import React from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  openPopup, isLoggedIn, onSignOut, onDeleteNews, localSavedNewsCards,
}) {
  const savedNewsCards = (localSavedNewsCards === null || localSavedNewsCards === undefined)
    ? [] : localSavedNewsCards;
  return (
    <>
      <Header
        isSaved={true}
        openPopup={openPopup}
        isLoggedIn={isLoggedIn}
        onSignOut={onSignOut}
        savedNewsPage={true}
      />
      <SavedNewsHeader savedNewsCards={savedNewsCards}/>
      <NewsCardList
        savedNewsPage={true}
        isLoggedIn={isLoggedIn}
        savedNewsCards={savedNewsCards}
        onDeleteNews={onDeleteNews}
      />
    </>
  );
}

export default SavedNews;
