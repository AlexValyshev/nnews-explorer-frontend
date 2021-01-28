/* eslint-disable no-param-reassign */
import React from 'react';
import './SavedNewsHeader.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { description, keywordsList } from '../../utils/header-description';

function SavedNewsHeader({ savedNewsCards }) {
  const currentUser = React.useContext(CurrentUserContext);
  const numbersResult = (savedNewsCards.length === 0 || (savedNewsCards === (undefined || null)));
  const numbers = numbersResult ? 'нет' : savedNewsCards.length;
  const copySavedNewsCards = [...savedNewsCards];

  const result1 = copySavedNewsCards.reduce((sum, item) => {
    sum[item.keyword] = (sum[item.keyword] || 0) + 1;
    return sum;
  }, {});

  const result2 = Object.entries(result1).sort((a, b) => b[1] - a[1]);
  const keywords = result2.map((item) => item[0][0].toUpperCase() + item[0].substring(1));

  return (
    <section className='news container'>
      <p className='news__info'>Сохраненные статьи</p>
      <h1 className='news__title'>{currentUser.name}, у вас {numbers} {description(numbers)}</h1>
      <p className='news__subtitle'>{numbersResult ? '' : 'По ключевым словам:'}
        <span className='news__keywords'>{numbersResult ? '' : keywordsList(keywords)}</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
