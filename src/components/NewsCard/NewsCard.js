import React from 'react';
import './NewsCard.css';
import * as myDate from '../../utils/myDate';
import { TimeDelayPopup } from '../../utils/constant';

const NewsCard = ({
  card, isLoggedIn, mainPage, savedNewsPage, onSaveNews,
  keyword, onDeleteNews, savedNews, openPopup, number,
}) => {
  const saved1 = savedNews !== undefined;
  const [isHover, setIsHover] = React.useState(false);
  const cardDate = myDate.getArticle(card.publishedAt);
  const saved = (card._id === '' || card._id === undefined) ? saved1 : true;
  const [isSave, setIsSave] = React.useState(saved || false);
  function handleSave() {
    setIsSave(true);
    onSaveNews({
      number,
      keyword,
      title: card.title,
      text: card.description,
      date: cardDate,
      source: card.source.name,
      link: card.url,
      image: card.urlToImage,
    }, IconSaveDel);
  }

  function IconSaveDel(err) {
    if (err) {
      setIsSave(false);
    }
  }

  function IconSave(err) {
    if (err) {
      setIsSave(true);
    }
  }

  function handleDeleteSaved() {
    setIsSave(false);
    onDeleteNews({
      _id: card._id === undefined ? savedNews._id : card._id,
    }, IconSave);
  }

  function handleOpenPopup() {
    setTimeout(openPopup, TimeDelayPopup);
  }

  const onTogleSave = !isSave ? handleSave : handleDeleteSaved;
  const onChoice = savedNewsPage ? handleDeleteSaved : handleOpenPopup;

  function handleMouseEnter() {
    setIsHover(true);
  }

  function handleMouseLeave() {
    setIsHover(false);
  }

  return (
    <li className="card">
      <a href={mainPage ? card.url : card.link} rel="noreferrer" target='_blank' className='card__link'>
        <img className="card__image" alt='фото темы карточки' src={mainPage ? card.urlToImage : card.image} />
      </a>
      <div className="card__container">
        <div className="card__box">
          <p className='card__date'>{mainPage ? cardDate : card.date}</p>
          <h3 className="card__title">{card.title}</h3>
          <p className='card__text'>{mainPage ? card.description : card.text}</p>
        </div>
        <a href={mainPage ? card.url : card.link} rel="noreferrer" target='_blank' className='card__source'>
          {mainPage ? card.source.name : card.source}
        </a>
      </div>
      {
        savedNewsPage ? <>
          <span className='card__message card__message_keyword'>{card.keyword}</span>
          <span className={`card__message ${isHover ? 'card__message_delete' : ''}`}>
            Убрать из сохранённых
          </span>
        </> : ''
      }
      {
        (mainPage && !isLoggedIn)
          ? <span className={`card__message ${isHover ? 'card__message_save' : ''}`}>
            Войдите, чтобы сохранять статьи
            </span>
          : ''
      }
      <button
        onClick={(mainPage && isLoggedIn) ? onTogleSave : onChoice}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className={`card__icon
        ${mainPage ? (`card__icon_save-passive ${(isHover || isLoggedIn) ? 'card__icon_save-active' : ''}`) : ''}
        ${savedNewsPage ? (`card__icon_trash-passive ${isHover ? 'card__icon_trash-active' : ''}`) : ''}
        ${(isSave && mainPage && isLoggedIn) ? 'card__icon_save' : ''}
        `}
      />
    </li>
  );
};

export default NewsCard;
