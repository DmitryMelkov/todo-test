import type { TasksAction, TasksState } from './type'
import { createInitialFormState } from './utils'

export const initialTasksState: TasksState = {
  tasks: [],
  priorityFilter: 'all',
  isLoading: true,
  isTaskModalOpen: false,
  editingTaskId: null,
  pendingDeleteTask: null,
  isDeleting: false,
  isSubmitting: false,
  toast: null,
  form: createInitialFormState(),
  formError: '',
}

export const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
  switch (action.type) {
    case 'set-bootstrap':
      return {
        ...state,
        tasks: action.payload.tasks,
        isLoading: false,
      }
    case 'set-loading':
      return { ...state, isLoading: action.payload }
    case 'set-toast':
      return { ...state, toast: action.payload }
    case 'clear-toast':
      return { ...state, toast: null }
    case 'set-priority-filter':
      return { ...state, priorityFilter: action.payload }
    case 'open-create-modal':
      return {
        ...state,
        isTaskModalOpen: true,
        editingTaskId: null,
        form: createInitialFormState(),
        formError: '',
      }
    case 'open-edit-modal':
      return {
        ...state,
        isTaskModalOpen: true,
        editingTaskId: action.payload.id,
        form: {
          title: action.payload.title,
          priority: action.payload.priority,
        },
        formError: '',
      }
    case 'close-task-modal':
      return {
        ...state,
        isTaskModalOpen: false,
        editingTaskId: null,
        form: createInitialFormState(),
        formError: '',
      }
    case 'open-delete-confirm':
      return {
        ...state,
        pendingDeleteTask: action.payload,
      }
    case 'close-delete-confirm':
      return {
        ...state,
        pendingDeleteTask: null,
        isDeleting: false,
      }
    case 'set-submitting':
      return { ...state, isSubmitting: action.payload }
    case 'set-deleting':
      return { ...state, isDeleting: action.payload }
    case 'set-form-title':
      return {
        ...state,
        form: { ...state.form, title: action.payload },
        formError: '',
      }
    case 'set-form-priority':
      return {
        ...state,
        form: { ...state.form, priority: action.payload },
        formError: '',
      }
    case 'set-form-error':
      return { ...state, formError: action.payload }
    case 'reset-form':
      return {
        ...state,
        form: createInitialFormState(),
        formError: '',
      }
    case 'add-task':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        isTaskModalOpen: false,
        editingTaskId: null,
        isSubmitting: false,
        form: createInitialFormState(),
        formError: '',
      }
    case 'update-task':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
        isTaskModalOpen: false,
        editingTaskId: null,
        isSubmitting: false,
        form: createInitialFormState(),
        formError: '',
      }
    case 'remove-task':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        pendingDeleteTask: null,
        isDeleting: false,
      }
    default:
      return state
  }
}
