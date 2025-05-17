# Документация по структуре проекта `vidify_server`

## Общая структура

Проект представляет собой серверную часть веб-приложения для работы с видеоконтентом. Реализован с использованием фреймворка Django. Структура включает модули API, сериализации, модели данных, конфигурационные файлы и тестовые ресурсы.

```
vidify_server/
├── core/
│   ├── api/
│   │   ├── CommentSerializer.py
│   │   ├── LikeSerializer.py
│   │   ├── UserSerializer.py
│   │   └── VideoSerializer.py
│   ├── test_preview.pg
│   ├── test_video.mpa
│   ├── admin.py
│   ├── apps.py
│   ├── logger_server_core.py
│   ├── models.py
│   ├── tests.py
│   ├── settings.py
│   └── urls.py
├── db.sqlite3
├── manage.py
├── .gitignore
├── README.md
├── requirements.txt
└── vidifymedia/
```

## Установка
Для запуска серверной части проекта `vidify_server` выполните следующие шаги:

1. Клонируйте репозиторий и перейдите в директорию сервера:

```bash
git clone https://github.com/vzhuhfaka/vidify.git
cd vidify/vidify_server
```

Создайте и активируйте виртуальное окружение Python:

На Windows:

```bash
python -m venv venv
.\venv\Scripts\activate
```

На macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

Установите зависимости из requirements.txt:
```bash
pip install -r requirements.txt
```

Выполните миграции базы данных:
```bash
python manage.py migrate
```

Запустите сервер разработки:
```bash
python manage.py runserver
```
По умолчанию сервер будет доступен по адресу ```http://127.0.0.1:8000/```

## Описание основных компонентов

### core/
Главный модуль серверной логики приложения.

#### core/api/
Модуль сериализации данных для REST API.

- `CommentSerializer.py` — сериализация комментариев к видео.
- `LikeSerializer.py` — сериализация данных о лайках.
- `UserSerializer.py` — сериализация пользовательских данных (профили, регистрация, авторизация и пр.).
- `VideoSerializer.py` — сериализация данных видео: метаданные, ссылки, параметры.

#### Прочие файлы
- `test_preview.pg`, `test_video.mpa` — тестовые медиафайлы, используемые для отладки или юнит-тестирования загрузки.
- `admin.py` — регистрация моделей в административной панели Django.
- `apps.py` — конфигурация приложения в рамках Django.
- `logger_server_core.py` — реализация кастомной логики логирования событий на сервере.
- `models.py` — описание моделей ORM: пользователи, видео, комментарии, лайки.
- `tests.py` — модуль тестов для проверки работы ключевых компонентов.
- `settings.py` — конфигурация проекта Django (базы данных, middleware, разрешения, установленные приложения).
- `urls.py` — маршруты API и внутренних страниц приложения.

### Корень проекта

- `db.sqlite3` — файл базы данных SQLite (используется по умолчанию для разработки).
- `manage.py` — управляющий скрипт Django.
- `.gitignore` — список исключений для системы контроля версий Git.
- `README.md` — описание проекта, инструкций по запуску и установки.
- `requirements.txt` — зависимости проекта (Python-библиотеки).
- `vidifymedia/` — директория, вероятно, используется для хранения медиафайлов (загружаемых пользователями видео и т.д.).