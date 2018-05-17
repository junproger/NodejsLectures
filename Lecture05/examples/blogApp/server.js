const path = require("path");
const express = require("express");
const expressSession = require("express-session");
const registerRoutes = require("./router");
const bodyParser = require("body-parser");
const passport = require("./middleware/passport");
const PORT = 7080;

const app = express();

/*
    Подключаем bodyParser. Он нужен для того чтобы
    нам не приходилось вручную парсить данные отправленные при помощи 
    запросов на сервер с формы или в виде json.
*/
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/*
    Здесь важен порядок сначала подключаем статический контент(express.static),
    потом подключаем сеанс(expressSession), 
    после passport.initialize() 
    и последним passport.session().

    Сеанс(Session) нужен для того чтобы юзер после логина смог перемещаться по
    закрытым(доступные только пользователям) страницам сайта без необходимости каждый
    раз вводить логин/пароль.

    Модули passport/passport-local/epxress-session/ нужен для того чтобы нам не пришлось
    вручную реализовывать логику сеанса.
    После Логина объект пользователя доступен в обработчике, как "req.user".
    Также всегда доступен метод req.isAuthenticated(), который помогает понять пришел ли запрос
    от залогиненного пользователя.
*/
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(expressSession({ secret: "mySecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

/* 
    Подключаем шаблонизатор 
*/
app.set("view engine", "ejs");
/* 
    Регистрируем пути 
*/
registerRoutes(app);

app.listen(7080, () => {
    console.log(`blog started on port ${PORT}`);
});
