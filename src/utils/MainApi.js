// const { NODE_ENV, REACT_APP_API_URL } = process.env;
// export const apiUrl = NODE_ENV === 'production' ? REACT_APP_API_URL : 'http://localhost:3001';
const apiUrl = 'https://www.api.alev.news.students.nomoredomains.monster';

function resFetch(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

export function getArticles(token) { // Запрос на загрузку сохранённых карточек
  return fetch(`${apiUrl}/articles`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(resFetch);
}

export function addArticle({
  number, keyword, title, text, date, source, link, image,
}, token) { // Запрос на добавление новой карточки
  return fetch(`${apiUrl}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      number: `${number}`,
      keyword: `${keyword}`,
      title: `${title}`,
      text: `${text}`,
      date: `${date}`,
      source: `${source}`,
      link: `${link}`,
      image: `${image}`,
    }),
  })
    .then(resFetch);
}

export function deleteArticle(articleId, token) { // Запрос на удаление карточки
  return fetch(`${apiUrl}/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(resFetch);
}
