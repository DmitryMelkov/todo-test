export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  priority: Priority
  createdAt: string
}

export interface CreateTaskPayload {
  title: string
  priority: Priority
}

export const PRIORITIES: Priority[] = ['low', 'medium', 'high']

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}
