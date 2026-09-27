import type { TasksAction, TasksState } from './type'
import { createInitialFormState } from './utils'

export const initialTasksState: TasksState = {
  tasks: [],
  priorityFilter: 'all',
  isLoading: true,
  isCreateModalOpen: false,
  isSubmitting: false,
  error: '',
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
        error: '',
      }
    case 'set-loading':
      return { ...state, isLoading: action.payload }
    case 'set-error':
      return { ...state, error: action.payload, isLoading: false }
    case 'set-priority-filter':
      return { ...state, priorityFilter: action.payload }
    case 'set-create-modal-open':
      return {
        ...state,
        isCreateModalOpen: action.payload,
        form: action.payload ? state.form : createInitialFormState(),
        formError: action.payload ? state.formError : '',
        error: action.payload ? '' : state.error,
      }
    case 'set-submitting':
      return { ...state, isSubmitting: action.payload }
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
        isCreateModalOpen: false,
        isSubmitting: false,
        form: createInitialFormState(),
        formError: '',
        error: '',
      }
    default:
      return state
  }
}
