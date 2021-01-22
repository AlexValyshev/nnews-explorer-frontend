const errorFormSubmit = ({
  errorFind: 'Запрашиваемый ресурс не найден', // 404
  errorServer: 'Ошибка на стороне сервера', // 500
  // errorData: 'Переданы некорректные данные:', // 400
  // errorArticle: 'Статья не найдена', // 404
  // errorArticles: 'Статьи не найдены', // 404
  // errorIdArticle: 'Не корректный _id статьи', // 400
  // errorUser: 'Пользователь не найден', // 404
  errorRegister: 'Почта или пароль введены некорректно', // 400
  errorEmail: 'Пользователь с такой почтой уже создан', // 409
  errorAuthorization: 'Необходима авторизация', // 401
  // errorIdUser: 'Не корректный _id пользователя', // 400
  // errorDelArticle: 'Нельзя удалять чужие статьи', // 403
});

export { errorFormSubmit as default };
