
## ORM vs ODM

ORM (англ. Object-Relational Mapping, рус. объектно-реляционное отображение, или преобразование) — технология программирования, которая связывает базы данных с концепциями объектно-ориентированных языков программирования, создавая «виртуальную объектную базу данных». Существуют как проприетарные, так и свободные реализации этой технологии.

ODM (Object-Document Mapping) является ORM для нереляционных баз данных, ориентированных на документы. 


## MONGODB

MongoDB — документоориентированная система управления базами данных (СУБД) с открытым исходным кодом, не требующая описания схемы таблиц. Классифицирована как NoSQL, использует JSON-подобные документы и схему базы данных. 


### Data modeling

Реляционная система управления базами данных (RDBMS) 
RDBMS схема
![](https://www.tutorialspoint.com/mongodb/images/rdbms.png)

MongoDB схема
```javascript
{
   _id: POST_ID
   title: TITLE_OF_POST, 
   description: POST_DESCRIPTION,
   by: POST_BY,
   url: URL_OF_POST,
   tags: [TAG1, TAG2, TAG3],
   likes: TOTAL_LIKES, 
   comments: [	
      {
         user:'COMMENT_BY',
         message: TEXT,
         dateCreated: DATE_TIME,
         like: LIKES 
      },
      {
         user:'COMMENT_BY',
         message: TEXT,
         dateCreated: DATE_TIME,
         like: LIKES
      }
   ]
}
```

### Mongo shell
```cd <mongodb installation dir>```
```./bin/mongo```

### Работа с MongoDB

![](https://metanit.com/nosql/mongodb/pics/2.1.png)


#### Типы данных
- ```Integer```  
Используется для хранения целочисленных значений. В зависимости от сервера может быть как 32-битным, так и 64-битным.
- ```Double```  
Используется для хранения значений с плавающей точкой
- ```Boolean```  
Используется для хранения логических (true / false) значений.
- ```String```  
Используется для хранения символьных строк. В MongoDB используется кодировка UTF-8.
- ```Arrays```  
Данный тип данных используется для хранения массивов значений по одному ключу.
- ```Object```  
Используется для встроенных документов.
- ```Symbol```  
Используется также, как и String, но, обычно, резервируется для языков, которые используют специальные символы.
- ```Null```  
Используется для хранения значения Null.
- ```Timestamp```  
Используется для хранения даты и времени
- ```Min / Max```  
Используется для сравнения значений с наибольшим и наименьшим BSON (Binary JSON) элементом.
- Object ID
Используется для хранения ID документа.
- Regular Expression
Используется для хранения  регулярных выражений.
- Code
Используется для хранения JavaScript кода в документе.
- Binary data
Данный тип данных позволяет хранить бинарные данные.
- Date
Используется для хранения текущей даты или времени в UNIX формате.

```json
{
    "_id" : ObjectId("5af9f81b47c035a326725140"),
    "title" : "Lorem ipsum 0",
    "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "author" : {
        "id" : "5af9c24cd1e408a01f8ed7fd",
        "name" : "Foo"
    }
}
```

#### Создание БД
```
>use blog
switched to db mydb
```

#### Чтобы посмотреть текущую базу
```
>db
blog
```

#### Показать список всех баз
```
>show dbs
local     0.78125GB
test      0.23012GB
```
Нет blog?

#### Для того чтобы новая база появилось в списке в нее нужно что-то добавить!
```
>db.user.insert({"name":"John Doe", "email": "johndoe@example.com"})
>show dbs
local      0.78125GB
mydb       0.23012GB
test       0.23012GB
```

#### Удаление базы
```
>use mydb
switched to db mydb
>db.dropDatabase()
>{ "dropped" : "mydb", "ok" : 1 }
>
```

#### Создание коллекции
```
>db.createCollection("mycollection")
{ "ok" : 1 }
>
```

#### Удаление коллекции
```
>db.mycollection.drop()
true
>
```

#### Показать список коллекций
```
>show collections
user
post
```

#### Выборка из БД
```javascript
db.users.find().pretty()
```

```javascript
db.users.find({name: "Tom"})
```

```javascript
db.users.find({name: "Tom", age: 32})
```
```javascript
db.users.find({languages: "english"})
```


#### Проекция
Документ может иметь множество полей, но не все эти поля нам могут быть нужны и важны при запросе. И в этом случае мы можем включить в выборку только нужные поля, использовав проекцию. Например, выведем только порцию информации, например, значения полей "age" у все документов, в которых name=Tom:
```javascript
db.users.find({name: "Tom"}, {age: 1})
```

#### Запрос к вложенным объектам
```javascript
db.users.insert({"name": "Alex", "age": 28, company: {"name":"microsoft", "country":"USA"}})

db.users.find({"company.name": "microsoft"})
```

#### Получение числа элементов в коллекции
```javascript
db.users.count()
```

#### Операторы выборки

- ```$eq``` (равно)
- ```$ne``` (не равно)
- ```$gt``` (больше чем)
- ```$lt``` (меньше чем)
- ```$gte``` (больше или равно)
- ```$lte``` (меньше или равно)
- ```$in``` определяет массив значений, одно из которых должно иметь поле документа
- ```$nin``` определяет массив значений, которые не должно иметь поле документа

```javascript
db.users.find({age: {$lt : 30}})
db.users.find({age: {$gt : 30, $lt: 50}})
db.users.find({age: {$eq : 22}})
...
```

#### Логические операторы
- ```$or```: соединяет два условия, и документ должен соответствовать одному из этих условий
- ```$and```: соединяет два условия, и документ должен соответствовать обоим условиям
- ```$not```: документ должен НЕ соответствовать условию
- ```$nor```: соединяет два условия, и документ должен НЕ соответстовать обоим условиям

```javascript
db.users.find({$or : [{name: "Tom"}, {age: 22}]})
db.users.find({name: "Tom", $or : [{age: 22}, {languages: "german"}]})
db.users.find({$or : [{name: "Tom"}, {age: {$gte:30}}]})
... 
```

#### Поиск по массивам
- ```$all```: определяет набор значений, которые должны иметься в массиве
- ```$size```: определяет количество элементов, которые должны быть в массиве
- ```$elemMatch```: определяет условие, которым должны соответствовать элемены в массиве

```javascript
db.users.find ({languages: {$all : ["english", "french"]}})


db.grades.insertMany([{student: "Tom", courses:[{name: "Java", grade: 5}, {name: "MongoDB", grade: 4}]}, 
{student: "Alice", courses:[{name: "C++", grade: 3}, {name: "MongoDB", grade: 5}]}])

db.grades.find({courses: {$elemMatch: {name: "MongoDB", grade: {$gt: 3}}}})

db.users.find ({languages: {$size:2}})
/*
Такой запрос будет соответствовать, например, следующему документу:
*/
{"name": "Tom", "age": 32, languages: ["english", "german"]}
```

И еще несколько интересных операторов
```javascript
db.users.find ({company: {$exists:true}})
db.users.find ({age: {$type:"string"}})
db.users.find ({age: {$type:"number"}})
db.users.find ({name: {$regex:"b"}})
```


#### Вставка
insertOne(): добавляет один документ
insertMany(): добавляет несколько документов
insert(): может добавлять как один, так и несколько документов

```javascript
 db.users.insertOne({"name": "Tom", "age": 28, languages: ["english", "spanish"]})
 db.users.insertMany([{"name": "Bob", "age": 26, languages: ["english", "frensh"]}

 db.products.insert( { _id: 10, item: "box", qty: 20 } )
 db.products.insert(
   [
     { _id: 11, item: "pencil", qty: 50, type: "no.2" },
     { item: "pen", qty: 20 },
     { item: "eraser", qty: 25 }
   ]
)
{"name": "Alice", "age": 31, languages:["german", "english"]}])
```

#### Обновление
query: принимает запрос на выборку документа, который надо обновить
objNew: представляет документ с новой информацией, который заместит старый при обновлении
options: определяет дополнительные параметры при обновлении документов. Может принимать два аргумента: upsert и multi.

Если параметр upsert имеет значение true, что mongodb будет обновлять документ, если он найден, и создавать новый, если такого документа нет. Если же он имеет значение false, то mongodb не будет создавать новый документ, если запрос на выборку не найдет ни одного документа.

Параметр multi указывает, должен ли обновляться первый элемент в выборке (используется по умолчанию, если данный параметр не указан) или же должны обновляться все документы в выборке.

```javascript
db.users.update({name : "Tom"}, {name: "Tom", age : 25}, {upsert: true})

//Обновление отдельного поля
db.users.update({name : "Tom", age: 29}, {$set: {age : 30}})

//Обновление всех документов выборки
db.users.update({name : "Tom"}, {$set: {name: "Tom", age : 25}}, {multi:true})
```

https://metanit.com/nosql/mongodb/2.9.php

#### Удаление
```javascript
db.users.remove({name : "Tom"})
```


### Mongoose

```npm i mongoose```

Подкючение к БД
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');
```

#### Определение схемы

```javascript
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```

#### Разрешенные типы
```
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
```

#### Создание модели
```javascript
const Blog = mongoose.model('Blog', blogSchema);
``` 

### MongoDB Настройка запросов и сортировка
Чтобы ограничить выборку выборку двумя документами:

```javascript
db.users.find().limit(2)
//тоже самое
db.getCollection("users").find().limit(2)
```

Пропустить первые три записи
```javascript
db.users.find().skip(3)
```

Сортировать по возрастанию по полю name:
```javascript
db.users.find().sort({name: 1})
```

Можно совмещать все эти функции в одной цепочке:
```javascript
db.users.find().sort({name: 1}).skip(3).limit(3)
```

### MongoDB Indexes

Индексы поддерживают эффективное выполнение запросов в MongoDB.  
Без индексов MongoDB должен выполнить сканирование коллекции, то   
есть сканировать каждый документ в коллекции, чтобы выбрать те   
документы, которые соответствуют запросу. Если для запроса   
существует соответствующий индекс, MongoDB может использовать  
индекс для ограничения количества документов, которые нужно проверить.

Single Field(Одиночный индекс)
```javascript
db.collection.createIndex({ name: -1 })
```

Compound Index(Составной индекс)
```javascript
db.collection.createInde({ userid: 1, score: -1 })
```


https://docs.mongodb.com/manual/indexes/

### Mongoose Quering

http://mongoosejs.com/docs/api.html#Query



[MongoDB docs](https://docs.mongodb.com)
[Mongoose docs](http://mongoosejs.com/docs/guide.html)



