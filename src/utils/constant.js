const errorRequest = ({
  errorFind: 'Запрашиваемый ресурс не найден', // 404
  errorServer: 'Ошибка на стороне сервера', // 500
  // errorData: 'Переданы некорректные данные:', // 400
  // errorArticle: 'Статья не найдена', // 404
  // errorArticles: 'Статьи не найдены', // 404
  // errorIdArticle: 'Не корректный _id статьи', // 400
  // errorUser: 'Пользователь не найден', // 404
  errorRegister: 'Пароль или email введены некорректно!', // 400
  errorEmail: 'Такой пользователь уже есть', // 409
  errorAuthorization: 'Вы не зарегестрированы', // 401
  // errorIdUser: 'Не корректный _id пользователя', // 400
  errorDelArticle: 'Нельзя удалять чужие статьи', // 403
});

const TimeDelaySearch = 1500;
const TimeDelayPopup = 500;
const TimeDelaySubmit = 1000;
const TimeDelayError = 2000;
const TimeDelayReset = 500;
const NumbersCards = 3;
const MAIN_API_KEY = 'c5632213d558435ba2caca5b4109bc44';
const PAGE_SIZE = 100;

export {
  errorRequest, TimeDelaySearch, TimeDelayPopup, TimeDelaySubmit, TimeDelayError, TimeDelayReset,
  NumbersCards, MAIN_API_KEY, PAGE_SIZE,
};
