# todo-test

Тестовое задание: страница задач с фильтром по приоритету и созданием задачи через модалку.

## Стек

- React 19 + TypeScript
- Vite
- Без UI-библиотек и без стейт-менеджеров
- oxlint + Prettier
- Husky + lint-staged (pre-commit)

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`  
Линт: `npm run lint`  
Формат: `npm run format`

После `npm install` husky ставит git-hook: на commit запускаются oxlint и Prettier для staged-файлов.

## Архитектура

Подход как у feature-страниц (type → reducer → hooks → UI):

```
src/
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

1. **UI не знает про моки** — страница работает через `tasksService`. Замена на реальный API не трогает компоненты.
2. **`useReducer`** — предсказуемые переходы состояния (loading, filter, modal, form, submit), без размазанного `useState`.
3. **Чистые утилиты** — фильтр и валидация вынесены из React и легко тестируются.
4. **Оптимизация** — `filteredTasks` через `useMemo`, колбэки стабилизированы через `useCallback` там, где передаются вниз.

Дизайн намеренно минимальный: важны структура и поддерживаемость, не внешний вид.
