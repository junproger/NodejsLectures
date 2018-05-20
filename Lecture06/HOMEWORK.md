### ДЗ:
1. Создать mongoose модель юзера и заменить ей текущую модель. Не забыть заменить места использования find и create методов.
2. Создать mongoose модель для статьи(post). У статьи должны быть такие поля: title(String), text(String), author(Object со полями id, name), comments(Array), likes(Array), date(Date).
3. Создать страницу posts, на которой будут размещаться статьи пользователей. Добавить на страницу форму создания статьи и список последних статей.
4. Добавить новые пути(route): ```/posts``` (POST для обработки формы создания статьи), ```/posts```(GET для получения списка статей).

### Дополнительно:
- Добавить валидацию для формы создания статьи. 
- Добавить шифрование пароля при помощи библиотеки bcrypt [[статья](https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt)]. Вынести метод шифрования и сравнения паролей в отдельный модуль password.js, который разместить в папке helpers.

### Статьи:
- mongoose CRUD(create read update delete) https://metanit.com/web/nodejs/6.8.php
