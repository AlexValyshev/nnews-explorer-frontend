import React from 'react';
import './SavedNewsHeader.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { description, keywordsList } from '../../utils/header-description';

function SavedNewsHeader({ savedNewsCards }) {
  const currentUser = React.useContext(CurrentUserContext);
  const numbersResult = (savedNewsCards.length === 0 || (savedNewsCards === (undefined || null)));
  const numbers = numbersResult ? 'нет' : savedNewsCards.length;
  const keywords = savedNewsCards.map((item) => item.keyword);
  const newKeywords = keywords.filter((item, index) => keywords.indexOf(item) === index);

  return (
    <section className='news container'>
      <p className='news__info'>Сохраненные статьи</p>
      <h1 className='news__title'>{currentUser.name}, у вас {numbers > 20 ? '' : numbers} {description(numbers)}</h1>
      <p className='news__subtitle'>{numbersResult ? '' : 'По ключевым словам:'}
        <span className='news__keywords'>{numbersResult ? '' : keywordsList(newKeywords)}</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
