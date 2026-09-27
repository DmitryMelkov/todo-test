import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { tasksService } from '@/services/tasks'
import type { Priority } from '@/types/task'
import { initialTasksState, tasksReducer } from './reducer'
import type { PriorityFilter } from './type'
import { filterTasksByPriority, validateTaskForm } from './utils'

export const useTasksPage = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState)

  const loadTasks = useCallback(async () => {
    dispatch({ type: 'set-loading', payload: true })

    try {
      const tasks = await tasksService.getTasks()
      dispatch({ type: 'set-bootstrap', payload: { tasks } })
    } catch (error) {
      dispatch({
        type: 'set-error',
        payload: error instanceof Error ? error.message : 'Не удалось загрузить задачи',
      })
    }
  }, [])

  useEffect(() => {
    void loadTasks()
  }, [loadTasks])

  const filteredTasks = useMemo(
    () => filterTasksByPriority(state.tasks, state.priorityFilter),
    [state.tasks, state.priorityFilter],
  )

  const setPriorityFilter = useCallback((priorityFilter: PriorityFilter) => {
    dispatch({ type: 'set-priority-filter', payload: priorityFilter })
  }, [])

  const openCreateModal = useCallback(() => {
    dispatch({ type: 'set-create-modal-open', payload: true })
  }, [])

  const closeCreateModal = useCallback(() => {
    if (state.isSubmitting) {
      return
    }

    dispatch({ type: 'set-create-modal-open', payload: false })
  }, [state.isSubmitting])

  const setFormTitle = useCallback((title: string) => {
    dispatch({ type: 'set-form-title', payload: title })
  }, [])

  const setFormPriority = useCallback((priority: Priority) => {
    dispatch({ type: 'set-form-priority', payload: priority })
  }, [])

  const createTask = useCallback(async () => {
    const formError = validateTaskForm(state.form)
    if (formError) {
      dispatch({ type: 'set-form-error', payload: formError })
      return
    }

    dispatch({ type: 'set-submitting', payload: true })

    try {
      const task = await tasksService.createTask({
        title: state.form.title,
        priority: state.form.priority,
      })
      dispatch({ type: 'add-task', payload: task })
    } catch (error) {
      dispatch({ type: 'set-submitting', payload: false })
      dispatch({
        type: 'set-form-error',
        payload: error instanceof Error ? error.message : 'Не удалось создать задачу',
      })
    }
  }, [state.form])

  return {
    ...state,
    filteredTasks,
    setPriorityFilter,
    openCreateModal,
    closeCreateModal,
    setFormTitle,
    setFormPriority,
    createTask,
  }
}
