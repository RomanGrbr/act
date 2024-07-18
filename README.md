# acti

Для запуска бэкенда перейдите в директорию  backend
Установите виртуальное окружение 
```bash
python3 -m venv venv
```

Установите зависимости 
```bash
pip3 install -r requirements.txt
```

Запустите бэк 
```bash
flask run
```

Для запуска фронта перейдите в директорию frontend
Установите зависимости 
```bash
npm install
```

Запустите фронт 
```bash
npm start
```

Для запуска проекта в контейнерах используйте команду в корневой директории проекта:

```bash
sudo docker-compose up --build
```
