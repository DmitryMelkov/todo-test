import type { Priority, Task } from '@/types/task'
import type { ToastTone } from '@/ui/Toast'

export type PriorityFilter = Priority | 'all'

export interface TaskFormState {
  title: string
  priority: Priority
}

export interface ToastState {
  id: number
  message: string
  tone: ToastTone
}

export interface TasksState {
  tasks: Task[]
  priorityFilter: PriorityFilter
  isLoading: boolean
  isTaskModalOpen: boolean
  editingTaskId: string | null
  pendingDeleteTask: Task | null
  isDeleting: boolean
  isSubmitting: boolean
  toast: ToastState | null
  form: TaskFormState
  formError: string
}

export type TasksAction =
  | { type: 'set-bootstrap'; payload: { tasks: Task[] } }
  | { type: 'set-loading'; payload: boolean }
  | { type: 'set-toast'; payload: ToastState }
  | { type: 'clear-toast' }
  | { type: 'set-priority-filter'; payload: PriorityFilter }
  | { type: 'open-create-modal' }
  | { type: 'open-edit-modal'; payload: Task }
  | { type: 'close-task-modal' }
  | { type: 'open-delete-confirm'; payload: Task }
  | { type: 'close-delete-confirm' }
  | { type: 'set-submitting'; payload: boolean }
  | { type: 'set-deleting'; payload: boolean }
  | { type: 'set-form-title'; payload: string }
  | { type: 'set-form-priority'; payload: Priority }
  | { type: 'set-form-error'; payload: string }
  | { type: 'reset-form' }
  | { type: 'add-task'; payload: Task }
  | { type: 'update-task'; payload: Task }
  | { type: 'remove-task'; payload: string }
