import type { Task } from '@/types/task'

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Подготовить отчёт по спринту',
    priority: 'high',
    createdAt: '2026-09-20T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Обновить README проекта',
    priority: 'medium',
    createdAt: '2026-09-21T12:30:00.000Z',
  },
  {
    id: '3',
    title: 'Проверить типы в API-клиенте',
    priority: 'high',
    createdAt: '2026-09-22T09:15:00.000Z',
  },
  {
    id: '4',
    title: 'Почистить неиспользуемые импорты',
    priority: 'low',
    createdAt: '2026-09-23T16:45:00.000Z',
  },
  {
    id: '5',
    title: 'Согласовать макеты с дизайнером',
    priority: 'medium',
    createdAt: '2026-09-24T11:00:00.000Z',
  },
]
