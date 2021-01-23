function changeDate(date, dateRender) {
  const newChangeDate = new Date(date);
  const year = newChangeDate.getUTCFullYear();
  const month = newChangeDate.getUTCMonth() + 1;

  const day = newChangeDate.getUTCDate();
  return dateRender(year, month, day);
}

function dateWithApi(year, month, day) {
  return `${year}-${(month < 10) ? `0${month}` : month}-${(day < 10) ? `0${day}` : day}`;
}

function dateWithArticle(year, month, day) {
  const newMonth = changeMonth(month);
  return `${day} ${newMonth}, ${year}`;
}

function changeMonth(numberMonth) {
  if (numberMonth === 1) {
    return 'января';
  } if (numberMonth === 2) {
    return 'февраля';
  } if (numberMonth === 3) {
    return 'марта';
  } if (numberMonth === 4) {
    return 'апреля';
  } if (numberMonth === 5) {
    return 'мая';
  } if (numberMonth === 6) {
    return 'июня';
  } if (numberMonth === 7) {
    return 'июля';
  } if (numberMonth === 8) {
    return 'августа';
  } if (numberMonth === 9) {
    return 'сентября';
  } if (numberMonth === 10) {
    return 'октября';
  } if (numberMonth === 11) {
    return 'ноября';
  }
  return 'декабря';
}

export function getToday() {
  const today = new Date();
  return changeDate(today, dateWithApi);
}

export function getLastWeek() {
  const milliSeconds = Math.floor(Date.now());
  const newMilliSeconds = milliSeconds - (7 * 24 * 60 * 60 * 1000);
  return changeDate(newMilliSeconds, dateWithApi);
}

export function getArticle(data) {
  const milliSecondsDateArticle = +new Date(data);
  return changeDate(milliSecondsDateArticle, dateWithArticle);
}
