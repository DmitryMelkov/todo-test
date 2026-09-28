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

Состояние страницы — в `useReducer`: переходы (loading → list, filter, modal, submit) явные и предсказуемые, без множества разрозненных `useState`. Данные идут через `tasksService`, UI не привязан к мокам — реальный API можно подключить без переписывания компонентов. Тестами покрыта чистая логика (`utils`, `reducer`, service): это быстрее и стабильнее, чем тестировать весь UI ради фильтра и валидации.

1. **UI не знает про моки** — страница работает через `tasksService`.
2. **`useReducer`** — единый state machine страницы.
3. **Чистые утилиты** — фильтр и валидация вне React.
4. **Оптимизация** — `useMemo` / `useCallback` только там, где есть измеримая польза.
5. **Тесты** — unit-покрытие логики без Testing Library.

Акцент на структуре и поддерживаемости, без лишней визуальной сложности.
