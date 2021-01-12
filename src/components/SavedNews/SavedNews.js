import React from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({
  openPopup, isLoggedIn, setLoggedIn, savedNewsCards,
}) {
  return (
    <>
      <Header
        isSaved={true}
        openPopup={openPopup}
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
      />
      <SavedNewsHeader savedNewsCards={savedNewsCards}/>
      <NewsCardList
        savedNews={true}
        isLoggedIn={isLoggedIn}
        savedNewsCards={savedNewsCards}
      />
    </>
  );
}

export default SavedNews;
