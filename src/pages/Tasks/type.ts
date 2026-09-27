import type { Priority, Task } from '@/types/task'

export type PriorityFilter = Priority | 'all'

export interface TaskFormState {
  title: string
  priority: Priority
}

export interface TasksState {
  tasks: Task[]
  priorityFilter: PriorityFilter
  isLoading: boolean
  isCreateModalOpen: boolean
  isSubmitting: boolean
  error: string
  form: TaskFormState
  formError: string
}

export type TasksAction =
  | { type: 'set-bootstrap'; payload: { tasks: Task[] } }
  | { type: 'set-loading'; payload: boolean }
  | { type: 'set-error'; payload: string }
  | { type: 'set-priority-filter'; payload: PriorityFilter }
  | { type: 'set-create-modal-open'; payload: boolean }
  | { type: 'set-submitting'; payload: boolean }
  | { type: 'set-form-title'; payload: string }
  | { type: 'set-form-priority'; payload: Priority }
  | { type: 'set-form-error'; payload: string }
  | { type: 'reset-form' }
  | { type: 'add-task'; payload: Task }
