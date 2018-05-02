## I. Менеджеры пакетов

Менеджеры пакетов это инструменты для распространения различных библиотек/пакетов/модулей.
    
## II. NPM

NPM - это менеджер пакетов(модулей) для Node.js. www.npmjs.com содержит тысячи 
бесплатных для скачивания и использования модулей. NPM устанавливается вместе с Node.js по умолчанию.  
Под модулем подразумевается javascript библиотека, которую вы можете включать в свой проект.

### NPM Команды

#### Init

Создает новый файл ```package.json```  
```npm init```

Для того чтобы пропустить опросник используем флаг ```--yes``` или ```-y```  
```npm init -y```

#### Install
Пакеты устанавливаются в автоматически созданную папку ```node_modules```.

Чтобы установить пакет локально используем:  
```npm install [название пакета]```  

Для установки глобально используем флаг ```-g```  
```npm install -g [название пакета]```  

Для того чтобы информация об установленном пакете попала в ```package.json```  
используем флаг ```--save``` или ```-S```  
```npm install --save [название пакета]```  

Примеры:  
- Установка ```lodash``` локально -   
```npm install lodash```  
- Установка с сохранением в ```package.json``` -   
```npm install lodash --save```
- Установка глобально(не злоупотреблять):  
```npm install -g lodash```

- Установка определенной версии  
```npm install lodash@4.17.4```  
```npm install lodash@^4.0.0```

- Установка и сохранение определенной версии  
```npm install lodash --save --save-exact```

```
"* Prefix Configuration
The prefix config defaults to the location where node is installed. On most systems, this is /usr/local. On Windows, it's %AppData%\npm. On Unix systems, it's one level up, since node is typically installed at {prefix}/bin/node rather than {prefix}/node.exe.
When the global flag is set, npm installs things into this prefix. When it is not set, it uses the root of the current package, or the current working directory if not in a package already.

* Node Modules
Packages are dropped into the node_modules folder under the prefix. When installing locally, this means that you can require("packagename") to load its main module, or require("packagename/lib/path/to/sub/module") to load other modules."
```

Версионирование https://semver.org/lang/ru/
#### Uninstall  

Чтобы удалить пакет локально используем:  
```npm uninstall [название пакета]```  
Для удалить глобально используем флаг ```-g```  
```npm uninstall -g [название пакета]```  

Для того чтобы информация об установленном пакете пропала из ```package.json```  
используем флаг ```--save``` или ```-S```  
```npm uninstall --save [название пакета]```  

Пакет устанавливается в автоматически созданную папку ```node_modules```.

Примеры:  
- Удаление ```lodash``` локально -   
```npm uninstall lodash```  
- Удаление локально и из package.json ```package.json``` -   
```npm uninstall lodash --save```
- Удаление глобально:  
```npm uninstall -g lodash```

#### Update
Хорошей практикой является периодическое обновление модулей от которых зависит ваше приложение.  
Для этого используем команду(в той же директории, что и ```package.json```) ```npm update```.
Затем используем команду ```npm outdated``` для того чтобы проверить что обновление прошло успешно.

#### Cache

Команда, которая позволяет управлять кешированием модулей.

Чтобы очистить текущий кеш:  
```npm cache clean```

#### Run

Run используется для запуска скриптов указаных в секции ```"scripts"``` файла ```package.json```. 

Пример:
```$xslt
{
    ...
    "scripts": {
        "dev-app": "node main.js"
        ...
    }
    ...
}
```

```npm run dev-app```

### Package.json

#### Поля
- name - имя проекта
- private - флаг публичной доступности пакета
- version - версия пакета
- dependencies - зависимости проекта(установленные пакеты)
- devDependencies - установленные пакеты, которые используются только  
во время разработки и тестирования проекта(для установки такой зависимости  
 используем флаг ```--save-dev``` в команде ```install```)
- script - секция для описания команд  
...


dependencies:  
- ```version```  Должен соответствовать версии  
- ```>version``` Должен быть больше чем версия  
- ```>=version``` и т.д.  
- ```<version```  
- ```<=version```  
- ```~version``` "Приблизительно соответствовать версии"  
- ```^version``` "Быть совместимой с версией"  
- ```1.2.x``` ```1.2.0```, ```1.2.1```, и т.д., но не ```1.3.0```  
- ```http://...``` url  
- ```*``` Соответствие любой версии  
- ```""``` то же самое что и ```*```  
...

Пример:
```
{ 
    "dependencies" : { 
        "foo" : "1.0.0 - 2.9999.9999",
        "bar" : ">=1.0.2 <2.1.2",
        "baz" : ">1.0.2 <=2.3.4",
        "boo" : "2.0.1",
        "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
        "asd" : "http://asdf.com/asdf.tar.gz",
        "til" : "~1.2",
        "elf" : "~1.2.3",
        "two" : "2.x",
        "thr" : "3.3.x",
        "lat" : "latest",
        "dyl" : "file:../dyl"
    }
}
```

#### package-lock.json

```package-lock.json``` - это файл который генерируется автоматически при изменении дерева ```node_modules```, ```package.json```.  

```
"package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates."
```

#### Создание своего пакета
https://www.8host.com/blog/ispolzovanie-npm-dlya-sozdaniya-i-publikacii-paketov-node-js-na-servere-linux/
https://habr.com/post/262057/

P.S. Документация NPM https://docs.npmjs.com