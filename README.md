# acti
[![Python](https://img.shields.io/badge/-Python-464646?style=flat-square&logo=Python)](https://www.python.org/)
[![Nginx](https://img.shields.io/badge/-NGINX-464646?style=flat-square&logo=NGINX)](https://nginx.org/ru/)
[![docker](https://img.shields.io/badge/-Docker-464646?style=flat-square&logo=docker)](https://www.docker.com/)

## Описание
Проект позволяет работать с записями хранящимися в формате JSON
Реализован функционал удаления и добавления записи
Записи отображаются в табличном виде с возможностью постраничного вывода, фильтрации и сортировки
При клике на строку открывается модальное окно с "data" в виде json

## Backend

Для запуска бэкенда перейдите в директорию  backend
Установите виртуальное окружение 
```bash
python3 -m venv venv
```

Установите зависимости 
```bash
pip3 install -r requirements.txt
```

Добавьте переменную окружения
```bash
export FLASK_APP=acti.py
```

Запустите бэк 
```bash
flask run
```

## Frontend

Для запуска фронта перейдите в директорию frontend
Установите зависимости 
```bash
npm install
```

Запустите фронт 
```bash
npm start
```

### Pytest
В проекте есть тесты основного функционала и эндпоинтов которые можно запустить командой
```bash
pytest
```

Для запуска проекта в контейнерах используйте команду в корневой директории проекта:

```bash
sudo docker-compose up --build
```
