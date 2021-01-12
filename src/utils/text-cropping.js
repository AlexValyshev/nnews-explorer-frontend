function titleSub(card) {
  if (card.title.length > 59) {
    return `${card.title.substring(0, 59)}...`;
  }
  return card.title;
}

function textSub(card) {
  if (card.text.length > 146) {
    return `${card.text.substring(0, 118)}...`;
  }
  return card.text;
}

export { titleSub, textSub };
