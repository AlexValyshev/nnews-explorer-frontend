import React from 'react';
import './NewsCard.css';

const NewsCard = ({
  card, isLoggedIn, mainPage, savedNews, onSaveNews,
}) => {
  const [isSave, setIsSave] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  const handleDelete = () => {
    // Здесь будет логика удаления карточки
  };
  const handleSave = () => {
    setIsSave(!isSave);
  };
  const onSave = isLoggedIn ? handleSave : null;
  const onDelete = savedNews ? handleDelete : null;

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <li className="card">
      <img className="card__image" alt='фото темы карточки' src={card.image} />
      <div className="card__container">
        <div className="card__box">
          <p className='card__date'>{card.date}</p>
          <h3 className="card__title">{card.title}</h3>
          <p className='card__text'>{card.text}</p>
        </div>
        <a href={card.link} rel="noreferrer" target='_blank' className='card__source'>
          {card.source}
        </a>
      </div>
      {
        savedNews ? <>
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
        onClick={mainPage ? onSave : onDelete}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className={`card__icon
        ${mainPage ? (`card__icon_save-passive ${(isHover && !isLoggedIn) ? 'card__icon_save-active' : ''}`) : ''}
        ${savedNews ? (`card__icon_trash-passive ${isHover ? 'card__icon_trash-active' : ''}`) : ''}
        ${isSave ? 'card__icon_save' : ''}
        `}
      />
    </li>
  );
};

export default NewsCard;
