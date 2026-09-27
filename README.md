# todo-test

Тестовое задание: страница задач с фильтром по приоритету, созданием, редактированием и удалением.

Палитра и типографика через CSS variables (Inter), без UI-kit: стили — CSS Modules.  
Есть светлая/тёмная тема (`data-theme` + `localStorage`, без вспышки при загрузке).

## Стек

- React 19 + TypeScript
- Vite
- Без UI-библиотек и без стейт-менеджеров
- oxlint + Prettier
- Husky + lint-staged (pre-commit)
- Vitest (unit-тесты utils / reducer / service)

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`  
Линт: `npm run lint`  
Формат: `npm run format`  
Тесты: `npm test`

После `npm install` husky ставит git-hook: на commit запускаются oxlint и Prettier для staged-файлов.

## Архитектура

Подход feature-страницы: model → hooks → components → UI:

```
src/
  theme/                     # light/dark: apply + useTheme
  ui/                        # Button, Select, Modal, ConfirmModal, ThemeToggle, Toast, PriorityChip
  types/task.ts              # доменные типы
  services/tasks/            # слой данных (мок вместо API)
  pages/Tasks/
    model/                   # type, reducer, utils (+ тесты)
    hooks/                   # useTasksPage
    components/              # фильтр, список, модалка формы
    index.tsx                # страница
```

### Почему так

Состояние страницы держим в `useReducer`: все переходы (loading → list, filter, modal, submit) явные и предсказуемые, без россыпи `useState`. Данные ходят через `tasksService`, поэтому UI не привязан к мокам — завтра можно подставить реальный API без переписывания компонентов. Тестами покрываем чистую логику (`utils`, `reducer`, service): это быстрее и стабильнее, чем гонять весь UI ради фильтра и валидации.

1. **UI не знает про моки** — страница работает через `tasksService`.
2. **`useReducer`** — единый state machine страницы.
3. **Чистые утилиты** — фильтр и валидация вне React.
4. **Оптимизация** — `useMemo` / `useCallback` там, где это реально помогает.
5. **Тесты** — unit-покрытие логики без Testing Library.

Дизайн намеренно спокойный: важны структура и поддерживаемость.
