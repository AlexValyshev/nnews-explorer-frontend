const { NODE_ENV, REACT_APP_API_URL } = process.env;
export const apiUrl = NODE_ENV === 'production' ? REACT_APP_API_URL : 'http://localhost:3001';
// const apiUrl = 'https://www.api.alev.news.students.nomoredomains.monster';

function resFetch(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
}

export function register(email, password, name) {
  return fetch(`${apiUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then(resFetch);
}

export function login(email, password) {
  return fetch(`${apiUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(resFetch);
}

export function tokenValid(token) {
  return fetch(`${apiUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(resFetch);
}
