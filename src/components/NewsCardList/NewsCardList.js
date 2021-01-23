import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import Button from '../Button/Button';

function NewsCardList({
  mainPage, savedNewsPage, isLoggedIn, keywordCardsResult,
  newsCards, onSaveNews, savedNewsCards, keyword, onDeleteNews, openPopup,
}) {
  const [numbers, setNumbers] = React.useState(3);
  const [hiddenButton, setHiddenButton] = React.useState(false);

  function handleButtonClick() {
    setNumbers(numbers + 3);
    if ((numbers + 3) >= newsCards.length) {
      setHiddenButton(true);
    }
  }

  return (
    <section className={`cards  ${keywordCardsResult || (newsCards || savedNewsCards)
      ? 'cards_opened' : ''} ${savedNewsPage ? 'cards_opened cards_saved-news' : ''}`}>
      <div className='container'>
        {mainPage ? <h2 className='cards__title'>
          Результаты поиска
        </h2> : ''}
        <ul className={`cards__elements ${savedNewsPage ? 'cards__elements_saved-news' : ''}
        ${hiddenButton ? 'cards__elements_button-hidden' : ''}`}>
          {(mainPage && keywordCardsResult)
            ? newsCards.slice(0, numbers).map((card, i) => (<NewsCard
              key={i} card={card}
              savedNews={savedNewsCards.find((item) => (item.link === card.url))}
              onSaveNews={onSaveNews}
              isLoggedIn={isLoggedIn}
              mainPage={mainPage}
              openPopup={openPopup}
              savedNewsPage={savedNewsPage}
              keyword={keyword}
              onDeleteNews={onDeleteNews}
              keywordCardsResult={keywordCardsResult}/>))
            : savedNewsCards.map((card, i) => <NewsCard
              key={i} card={card}
              isLoggedIn={isLoggedIn}
              mainPage={mainPage}
              savedNewsPage={savedNewsPage}
              onDeleteNews={onDeleteNews}/>)}
        </ul>
        <Button
          mainPage={mainPage}
          savedNewsPage={savedNewsPage}
          isLoggedIn={isLoggedIn}
          nameButton='Показать еще'
          cardsList={true}
          handleButtonClick={handleButtonClick}
          hiddenButton={hiddenButton}
        />
      </div>
    </section>
  );
}

export default NewsCardList;
