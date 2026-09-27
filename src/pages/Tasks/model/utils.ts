import type { Priority } from '@/types/task'
import type { PriorityFilter, TaskFormState } from './type'

export const createInitialFormState = (): TaskFormState => ({
  title: '',
  priority: 'medium',
})

export const filterTasksByPriority = <T extends { priority: Priority }>(
  tasks: T[],
  filter: PriorityFilter,
): T[] => {
  if (filter === 'all') {
    return tasks
  }

  return tasks.filter((task) => task.priority === filter)
}

export const validateTaskForm = (form: TaskFormState): string => {
  if (!form.title.trim()) {
    return 'Введите название задачи'
  }

  return ''
}
