
## I. Node.js

Node.js - это платформа основанная на движке V8, которая позволяет разрабатывать серверные приложения используя javascript.

Пример 1. Простой сервер на Node.js

```
const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
  console.log(request.url);
  response.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log('server is listening on ${port}');
});
```


## II. Модульная система CommonJS
JavaScript не имеет встроеную модульную систему. В Node.js это проблема решена при помощи модульного формата описанного CommonJS. В данном контексте модулем по сути является JavaScript код сгруппированный в отдельном файле, который можно подключать и переиспользовать в других модулях.

Пример 2. Простой Node.js модуль

```
//sum.js
module.exports.sum = (num1, num2) => {
    return num1 + num2;
}

//index.js
const { sum } = require('./sum.js');

console.log(sum(5, 7));
```
#### Окружение модуля(Скоуп модуля).
В каждом Node.js модуле доступны такие объекты/функции/переменные:      
```__dirname```,``` __filename```,```exports```,```module```,```require()```.

```__dirname``` - переменная значением которой является путь к директории в которой находиться данный модуль;       
```__filename``` - переменная значением которой является путь к файлу данного модуля;       
```module``` - ссылка на текущий модуль, свойство module.exports отвечает за то что будет доступно при подключении модуля;      
```exports``` - ссылка на module.exports;       
```require()``` - функция для подключения модулей;      

#### Global и другие глобальные объекты
- ```clearImmediate(immediateObject)```
- ```clearInterval(intervalObject)```
- ```clearTimeout(timeoutObject)```
- ```console```
- ```global```
- ```process```
- ```setImmediate(callback[, ...args])```
- ```setInterval(callback, delay[, ...args])```
- ```setTimeout(callback, delay[, ...args])```

#### Модуль ‘process’
- ```process.env```       
	https://js-node.ru/site/article?id=31#process_process_env       
- ```process.argv```        
	https://js-node.ru/site/article?id=31#process_process_argv 

#### Модуль ‘fs’
- ```fs.appendFile```   
https://js-node.ru/site/article?id=23#fs_fs_appendfile_file_data_options_callback 
- ```fs.readFile```     
https://js-node.ru/site/article?id=23#fs_fs_readfile_file_options_callback
- ```fs.writeFile```       
https://js-node.ru/site/article?id=23#fs_fs_writefile_file_data_options_callback        
```...```     
https://nodejs.org/dist/latest-v8.x/docs/api/fs.html 
https://js-node.ru/site/article?id=23#fs_fs_readfile_file_options_callback

#### Модуль ‘util’
- ```format```
- ```inspect```     
https://nodejs.org/dist/latest-v8.x/docs/api/util.html 

P.S. полный список можно найти тут https://nodejs.org/dist/latest-v8.x/docs/api/


