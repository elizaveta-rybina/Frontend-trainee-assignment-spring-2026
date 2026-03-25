# Frontend Trainee Assignment Spring 2026

**AI-ассистент для улучшения объявлений на Авито**

## Стек

- Frontend: React, TypeScript, Vite, MUI, TanStack Query, Zustand
- Backend: Fastify, TypeScript, Zod
- LLM (для AI-кнопок): Ollama

## Структура проекта

- `frontend/` - клиентское приложение
- `backend/` - API и валидация данных объявлений
- `docker-compose.yml` - запуск frontend + backend в контейнерах

## Требования

- Node.js 22+
- npm 10+
- Docker и Docker Compose (для контейнерного запуска)
- Ollama

## Быстрый запуск через Docker

Из корня репозитория:

```bash
docker compose up --build
```

После запуска:

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3000`

## Локальный запуск без Docker

### 1. Backend

```bash
cd backend
npm install
PORT=3000 npm run start
```

Backend будет доступен на `http://localhost:3000`.

### 2. Frontend

Создайте файл `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_OLLAMA_URL=http://localhost:11434/api/generate
VITE_OLLAMA_MODEL=llama3
```

Запуск:

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на `http://localhost:5173`

## Настройка LLM (Ollama)

AI-кнопки на странице редактирования объявления используют Ollama напрямую с фронтенда.

### Установка и запуск Ollama

1. Установите Ollama: `https://ollama.com/download`
2. Запустите Ollama
3. Подтяните модель:

```bash
ollama pull llama3
```

4. Убедитесь, что сервис доступен по адресу `http://localhost:11434`

### Переменные окружения для LLM

В `frontend/.env.local`:

```env
VITE_OLLAMA_URL=http://localhost:11434/api/generate
VITE_OLLAMA_MODEL=llama3
```

Если переменные не заданы, используются значения по умолчанию:

- `VITE_OLLAMA_URL`: `http://localhost:11434/api/generate`
- `VITE_OLLAMA_MODEL`: `llama3`

## Проверка сборки

```bash
cd frontend
npm run build
```

## Принятые самостоятельные решения

- Поле категории в форме редактирования сделано недоступным для изменения, так как бэкенд не поддерживает смену категории.
- Для черновика редактирования используется локальное хранение состояния через Zustand, чтобы не терять изменения до сохранения.
- После успешного `Сохранить` добавлено принудительное обновление кэша React Query (`invalidate` + `refetch`) для detail/list запросов, чтобы данные в карточке объявления сразу соответствовали бэкенду.
- Создана общая шапка приложения с переключателем темы для быстрого изменения светлой и темной темы интерфейса.

## Возможные проблемы

- Если `npm run build` падает с ошибкой Vite по версии Node, переключитесь на Node 22.
- Если AI-функции не работают, проверьте:
  - что Ollama запущен;
  - что модель скачана;
  - что `VITE_OLLAMA_URL` указывает на доступный endpoint.
