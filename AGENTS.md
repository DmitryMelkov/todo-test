# AI Context - todo-test

Тестовое задание: страница задач (фильтр, CRUD, тема, toast). React 19, Vite, TypeScript, CSS Modules. Без UI-kit и без Redux/Zustand.

## Команды

- `npm run dev` — Vite dev server.
- `npm run build` — production build; запускать после frontend-изменений.
- `npm test` / `npm run test:watch` — Vitest, если затронуты utils / reducer / service или добавлены тесты.
- `npm run lint` — oxlint.
- `npm run format` / `npm run format:check` — Prettier.

## Карта проекта

- `src/pages/Tasks` — единственная feature-страница: `index.tsx` (orchestration), `model/`, `hooks/`, `components/`.
- `src/services/tasks` — слой данных (мок вместо API); UI ходит только через него.
- `src/types` — доменные типы (`task.ts`).
- `src/theme` — light/dark (`data-theme`, `localStorage`, FOUC-скрипт в `index.html`).
- `src/ui` — shared UI: `Button`, `Select`, `Modal`, `ConfirmModal`, `ThemeToggle`, `Toast`, `PriorityChip`.
- `src/index.css` — CSS design tokens (`:root` / `[data-theme='dark']`).

## Project-Specific правила

- Архитектура feature-страницы: `model` → `hooks` → `components` → `ui`. `index.tsx` — только orchestration.
- Состояние страницы — `useReducer` + `tasksService`; не расползаться на россыпь `useState` для CRUD/модалок/toast.
- Фильтр и валидация — чистые функции в `model/utils`; не дублировать логику в JSX.
- UI не знает про моки: данные только через `tasksService`. Не добавлять ad hoc `fetch` в компонентах.
- Тема: менять через `useTheme` / `applyTheme`; не хардкодить dark-mode цвета в модулях.
- Подтверждение удаления — только `ConfirmModal` (не `window.confirm`).
- Не упоминать чужие коммерческие проекты/бренды в README, комментариях и UI.

## Frontend Baseline

- Сначала читать существующую страницу/компонент, `*.module.css`, `model/`, хуки и сервис. Новый стиль — только в духе локального паттерна.
- Компоненты держать небольшими. Экран раскладывать на `components/`, `model`, `hooks`; `index.tsx` оставлять orchestration-слоем.
- Для React — стрелочные функции. Для `if/else`, `for`, `while`, `switch`, `try/catch` всегда ставить фигурные скобки. Если в компоненте/хуке больше двух `useState` с связанной логикой — переходить на `useReducer`.
- Не использовать default export для новых или изменяемых модулей; предпочитать именованные `export`/`import`. Default export — только если это обязательный контракт фреймворка.
- Стили: CSS Modules + переменные из `src/index.css`. Hex/rgb в модулях недопустимы, если эффект выражается токеном. Для hover/selected accent добавлять токены (`--color-accent-soft` и т.п.), а не копировать hex.
- API/state: использовать `tasksService` и page model. Контракт фронта — `camelCase`.
- UI должен иметь loading / empty / error (toast или formError), не ломать mobile/desktop, не допускать наложения текста и controls.
- После изменения frontend-кода запускать `npm run build`; `npm run lint` — при изменениях структуры, imports, styling. `npm test` — если затронута логика model/service. Для заметных UI-изменений — smoke в браузере, когда dev server доступен.
