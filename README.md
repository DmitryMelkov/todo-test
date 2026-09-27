# todo-test

Тестовое задание: страница задач с фильтром по приоритету и созданием задачи через модалку.

Палитра и типографика через CSS variables (Inter), без UI-kit: стили — CSS Modules.

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

Подход как у feature-страниц (type → reducer → hooks → UI):

```
src/
  ui/                        # переиспользуемые UI без доменной логики
    Button/
    Select/
  types/task.ts              # доменные типы
  services/tasks/            # слой данных (мок вместо API)
    mockData.ts
    index.ts                 # getTasks / createTask + delay
  pages/Tasks/
    type.ts                  # state + actions
    reducer.ts               # useReducer
    utils.ts                 # фильтр и валидация
    hooks.ts                 # useTasksPage: загрузка, create, UI-колбэки
    index.tsx                # страница
    components/              # фильтр, список, модалка
```

### Почему так

Состояние страницы держим в `useReducer`: все переходы (loading → list, filter, modal, submit) явные и предсказуемые, без россыпи `useState`. Данные ходят через `tasksService`, поэтому UI не привязан к мокам — завтра можно подставить реальный API без переписывания компонентов. Тестами покрываем чистую логику (`utils`, `reducer`, service): это быстрее и стабильнее, чем гонять весь UI ради фильтра и валидации.

1. **UI не знает про моки** — страница работает через `tasksService`.
2. **`useReducer`** — единый state machine страницы.
3. **Чистые утилиты** — фильтр и валидация вне React.
4. **Оптимизация** — `useMemo` / `useCallback` там, где это реально помогает.
5. **Тесты** — unit-покрытие логики без Testing Library.

Дизайн намеренно спокойный: важны структура и поддерживаемость.
