function description(numbers) {
  if (numbers === 1 || ((numbers - 1) % 10 === 0)) {
    return 'сохранённая статья';
  } if (numbers === 2 || numbers === 3 || numbers === 4 || ((numbers - 2) % 10 === 0)
    || ((numbers - 3) % 10 === 0) || ((numbers - 4) % 10 === 0)) {
    return 'сохранённые статьи';
  }
  return 'сохранённых статей';
}

function keywordsList(newKeywords) {
  if (newKeywords.length === 1) {
    return ` ${newKeywords[0]}`;
  } if (newKeywords.length === 2) {
    return ` ${newKeywords[0]}, ${newKeywords[1]}`;
  } if (newKeywords.length === 3) {
    return ` ${newKeywords[0]}, ${newKeywords[1]}, ${newKeywords[2]}`;
  }
  return ` ${newKeywords[0]}, ${newKeywords[1]} и ${newKeywords.length - 2}-м другим`;
}

export { description, keywordsList };
