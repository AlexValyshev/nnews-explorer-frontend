function description(numbers) {
  if (numbers === 'нет') {
    return 'сохранённых статей';
  } if (numbers > 0 && numbers < 21) {
    if (numbers === 1) {
      return 'сохранённая статья';
    } if (numbers === 2 || numbers === 3 || numbers === 4) {
      return 'сохранённые статьи';
    }
    return 'сохранённых статей';
  }
  return 'более 20 сохранённых статей';
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
