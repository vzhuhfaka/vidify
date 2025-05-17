# Vidify

Проект Vidify — веб-приложение для работы с видеоконтентом, включающее клиентскую часть на React и серверную часть на Django.

## Структура проекта

- `vidify_server/` — серверная часть на Django, реализующая API, бизнес-логику и хранение данных.
- `client/` — клиентская часть на React + TypeScript с использованием Vite, реализующая пользовательский интерфейс.

## Быстрая установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/vzhuhfaka/vidify.git
cd vidify
```

### 2. Серверная часть
```bash
cd vidify_server
python -m venv venv                # создать виртуальное окружение
source venv/bin/activate           # активировать venv (macOS/Linux)
# .\venv\Scripts\activate          # активировать venv (Windows)
pip install -r requirements.txt   # установить зависимости
python manage.py migrate           # применить миграции
python manage.py runserver         # запустить сервер
```

### 3. Клиентская часть
В новой консоли:

```bash
cd client
npm install                      # установить зависимости
npm run dev                      # запустить клиент в режиме разработки
```

### Требования
- Python 3.7+
- Node.js 16+ и npm
- Git


## Для подробной информации смотрите документацию в папках vidify_server/ и client/.
