### Установка MongoDB

#### Mac OS:
1. Открываем terminal. 
2. Проверяем установлен ли homebrew ```brew -v```.   
Если в результате видим ошибку или что-то типа “cannot find brew”, устанавливаем при помощи ```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
3. Далее выполняем команду ```brew update && brew install mongodb```
4. После ```mkdir -p /data/db```
5. И запускаем ```mongod```

#### Windows:

Следуем данной инструкции https://metanit.com/nosql/mongodb/1.2.php