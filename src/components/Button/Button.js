/* eslint-disable no-nested-ternary */
import React from 'react';
import './Button.css';

function Button({
  mainPage, savedNewsPage, isMenu, handleButtonIn, handleButtonOut, handleButtonClick,
  search, cardsList, isLoggedIn, popupForm, nameButton, hiddenButton, isDisabled,
}) {
  return (
    <button
      onClick={cardsList ? handleButtonClick
        : (isLoggedIn ? handleButtonOut : handleButtonIn)}
      type={search || popupForm ? 'submit' : 'button'}
      className={`button ${(isMenu || mainPage) ? 'button_theme_light' : ''}
          ${(!isDisabled && popupForm) ? 'button_disabled' : ''}
          ${search ? 'button_theme_search' : ''}
          ${cardsList ? 'button_theme_cards' : ''}
          ${savedNewsPage ? 'button_hidden' : ''}
          ${popupForm ? 'button_theme_form' : ''}
          ${(cardsList && hiddenButton) ? 'button_hidden' : ''}`}
      disabled={!!((popupForm && !isDisabled))}
    >
      <span className={`button__link ${(isMenu || mainPage) ? 'button__link_theme_light' : ''}
      ${cardsList ? 'button__link_theme_cards' : ''}
      ${popupForm ? 'button__link_theme_form' : ''}
      ${search ? 'button__link_theme_search' : ''}
      ${isLoggedIn ? 'button__link_theme_log' : ''}
      `} >
        {nameButton}
      </span>
      {nameButton
        ? <span className={`button__logout
        ${(isMenu || mainPage) ? 'button__logout_theme_light' : ''}
        ${(cardsList || !isLoggedIn) ? 'button__logout_hidden' : ''}`} />
        : ''}
    </button >
  );
}

export default Button;
