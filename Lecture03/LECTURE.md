### Событийная модель Node.js
![](https://cdn-images-1.medium.com/max/1600/1*lj3_-x3yh-114QzWpFq8Ug.png)

#### Event loop
Цикл событий (Event Loop) — это то, что позволяет Node.js выполнять неблокирующие операции ввода/вывода (несмотря на то, что JavaScript является однопоточным) путем выгрузки операций в ядро системы, когда это возможно.  
Поскольку большинство современных ядер являются многопоточными, они могут обрабатывать несколько операций, выполняемых в фоновом режиме. Когда одна из этих операций завершается, ядро сообщает Node.js, что соответствующая этой операции функция обратного вызова (далее для простоты будет использован термин «коллбэк») может быть добавлена в очередь опроса, чтобы в конечном итоге быть выполненной. Мы объясним это более подробно позже в этом разделе. 

[Loupe](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

[Timers and nextTick](https://medium.com/devschacht/event-loop-timers-and-nexttick-18579cd122e0)

#### Callback hell
![alt text](http://techbrunch.gousto.co.uk/2016/04/22/callback-hell/callbacks.png)

```
fs.readFile(path.resolve(__dirname, "fileA"), "utf-8", (err1, data1) => {
    if (err1) return handleError(err1);
    fs.readFile(path.resolve(__dirname, "fileB"), "utf-8", (err2, data2) => {
        if (err2) return handleError(err2);
        fs.writeFile(path.resolve(__dirname, "fileA_fileB"), data1 + data2, "utf-8", (err3) => {
            if (err3) return handleError(err3);
            console.log("Created fileA_fileB");
        });
    });
});
```
Проблемы
1. Плохо с обработкой исключений.
2. Ужасно большая вложеность, что делает код нечитабельным.
3. Сложно разпараллеливать асинхронные операции.

Что с этим делать? 
Ответ: promise, async/await, generators

#### Promise

```Promise``` позволяет обрабатывать результаты асинхронных операций так, как если бы они были синхронными: вместо конечного результата асинхронного метода возвращается обещание получить результат в некоторый момент в будущем.

```
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

Promise.all([
    readFileAsync(path.resolve(__dirname, "fileA")),
    readFileAsync(path.resolve(__dirname, "fileB"))
])
.then(dataArr => {
    //dataArr[0] - содержимое файла fileA
    //dataArr[1] - содержимое файла fileB
    return writeFileAsync(path.resolve(__dirname, "fileA_fileB_PromiseAll"), dataArr[0] + dataArr[1]);
})
.then(() => {
    console.log("Created fileA_fileB_PromiseAll");
})
.catch(err => {
    handleError(err);
});
```

https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise

#### async/await

Объявление async function определяет асинхронную функцию, которая возвращает объект AsyncFunction.
```
async function name([param[, param[, ... param]]]) {
   statements
}
```
После вызова функция ```async``` возвращает ```Promise```. Когда результат был получен, Promise завершается, возвращая полученное значение.  Когда функция ```async``` выбрасывает исключение, ```Promise``` ответит отказом с выброшенным (```throws```) значением.

Функция ```async``` может содержать выражение ```await```, которое приостанавливает выполнение функции ```async``` и ожидает ответа от переданного ```Promise```, затем возобновляя выполнение функции ```async``` и возвращая полученное значение.

Ключевое слово ```await``` допустимо только в асинхронных функциях. В другом контексте вы получите ошибку ```SyntaxError```.

Цель функций ```async/await``` упросить использование ```Promises``` синхронно и воспроизвести некоторое действие над группой  ```Promises```. Точно так же как ```Promises``` подобны структурированным callback-ам, async/await подобна комбинации генераторов и promises.

```
readFileAsync(path.resolve(__dirname, "fileA"))
    .then(async (data1) => {
        let data2 = await readFileAsync(path.resolve(__dirname, "fileB"))
        await writeFileAsync(path.resolve(__dirname, "fileA_fileB_Async"), data1 + data2);
        console.log("Created fileA_fileB_Async");
    })
    .catch(err => {
        console.log("Catching error");
        handleError(err);
    });
```
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function

#### generators
 Простыми словами ```generator``` это функция, которую можно остановить на паузу и после возобновить её работу.

 ```
function *getNumbers() {
    yield 1;
    yield 2;
    return 3;
}
 
const myGetNumbers = getNumbers();
console.log(myGetNumbers.next()); // => {value: "1", done: false}
console.log(myGetNumbers.next()); // => {value: "2", done: false}
console.log(myGetNumbers.next()); // => {value: "3", done: true}
console.log(myGetNumbers.next()); // => {value: undefined, done: true}
 ```




