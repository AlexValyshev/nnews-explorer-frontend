import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import Button from '../Button/Button';

function NewsCardList({
  mainPage, savedNews, isLoggedIn, keywordCardsResult, newsCards, onSaveNews, savedNewsCards,
}) {
  const [numbers, setNumbers] = React.useState(3);
  const handleButtonClick = () => {
    setNumbers(numbers + 3);
  };
  return (
    <section className={`cards  ${keywordCardsResult || (newsCards || savedNewsCards)
      ? 'cards_opened' : ''} ${savedNews ? 'cards_opened cards_saved-news' : ''} `}>
      <div className='container'>
        {mainPage ? <h2 className='cards__title'>
          Результаты поиска
        </h2> : ''}
        <ul className={`cards__elements ${savedNews ? 'cards__elements_saved-news' : ''} `}>
          {mainPage
            ? newsCards.slice(0, numbers).map((card, i) => (<NewsCard
              key={i} card={card}
              onSaveNews={onSaveNews}
              isLoggedIn={isLoggedIn}
              mainPage={mainPage}
              savedNews={savedNews} />))
            : savedNewsCards.map((card, i) => <NewsCard
              key={i} card={card}
              isLoggedIn={isLoggedIn}
              mainPage={mainPage}
              savedNews={savedNews} />)}
        </ul>
        <Button
          mainPage={mainPage}
          savedNews={savedNews}
          isLoggedIn={isLoggedIn}
          nameButton='Показать еще'
          cardsList={true}
          handleButtonClick={handleButtonClick}
        />
      </div>
    </section>
  );
}

export default NewsCardList;
