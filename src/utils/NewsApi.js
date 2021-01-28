import * as myDate from './myDate';
import { MAIN_API_KEY, PAGE_SIZE } from './constant';

const { NODE_ENV, REACT_APP_NEWSAPI_URL } = process.env;
export const apiUrl = NODE_ENV === 'production' ? REACT_APP_NEWSAPI_URL : 'https://newsapi.org';
export const mainApiKey = MAIN_API_KEY;
export const mainPageSize = PAGE_SIZE;

class NewsApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getNews(word) {
    return fetch(`${this._baseUrl}&q=${word}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }
}

export const newsApi = new NewsApi({
  baseUrl: `${apiUrl}/v2/everything?`
    + `from=${myDate.getLastWeek()}&`
    + `to=${myDate.getToday()}&`
    + 'sortBy=popularity&'
    + `pageSize=${PAGE_SIZE}&`
    + `apiKey=${mainApiKey}`,
});
