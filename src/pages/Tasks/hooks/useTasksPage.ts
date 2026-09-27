import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { tasksService } from '@/services/tasks'
import type { Priority, Task } from '@/types/task'
import type { ToastTone } from '@/ui/Toast'
import {
  filterTasksByPriority,
  initialTasksState,
  tasksReducer,
  validateTaskForm,
  type PriorityFilter,
} from '../model'

export const useTasksPage = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState)

  const showToast = useCallback((message: string, tone: ToastTone = 'info') => {
    dispatch({
      type: 'set-toast',
      payload: { id: Date.now(), message, tone },
    })
  }, [])

  const clearToast = useCallback(() => {
    dispatch({ type: 'clear-toast' })
  }, [])

  const loadTasks = useCallback(async () => {
    dispatch({ type: 'set-loading', payload: true })

    try {
      const tasks = await tasksService.getTasks()
      dispatch({ type: 'set-bootstrap', payload: { tasks } })
    } catch (error) {
      dispatch({ type: 'set-loading', payload: false })
      showToast(error instanceof Error ? error.message : 'Не удалось загрузить задачи', 'error')
    }
  }, [showToast])

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
    dispatch({ type: 'open-create-modal' })
  }, [])

  const openEditModal = useCallback((task: Task) => {
    dispatch({ type: 'open-edit-modal', payload: task })
  }, [])

  const closeTaskModal = useCallback(() => {
    if (state.isSubmitting) {
      return
    }

    dispatch({ type: 'close-task-modal' })
  }, [state.isSubmitting])

  const openDeleteConfirm = useCallback((task: Task) => {
    dispatch({ type: 'open-delete-confirm', payload: task })
  }, [])

  const closeDeleteConfirm = useCallback(() => {
    if (state.isDeleting) {
      return
    }

    dispatch({ type: 'close-delete-confirm' })
  }, [state.isDeleting])

  const setFormTitle = useCallback((title: string) => {
    dispatch({ type: 'set-form-title', payload: title })
  }, [])

  const setFormPriority = useCallback((priority: Priority) => {
    dispatch({ type: 'set-form-priority', payload: priority })
  }, [])

  const saveTask = useCallback(async () => {
    const formError = validateTaskForm(state.form)
    if (formError) {
      dispatch({ type: 'set-form-error', payload: formError })
      return
    }

    dispatch({ type: 'set-submitting', payload: true })

    try {
      if (state.editingTaskId) {
        const task = await tasksService.updateTask(state.editingTaskId, {
          title: state.form.title,
          priority: state.form.priority,
        })
        dispatch({ type: 'update-task', payload: task })
        showToast('Задача сохранена', 'success')
        return
      }

      const task = await tasksService.createTask({
        title: state.form.title,
        priority: state.form.priority,
      })
      dispatch({ type: 'add-task', payload: task })
      showToast('Задача создана', 'success')
    } catch (error) {
      dispatch({ type: 'set-submitting', payload: false })
      dispatch({
        type: 'set-form-error',
        payload:
          error instanceof Error
            ? error.message
            : state.editingTaskId
              ? 'Не удалось сохранить задачу'
              : 'Не удалось создать задачу',
      })
    }
  }, [state.form, state.editingTaskId, showToast])

  const confirmDeleteTask = useCallback(async () => {
    if (!state.pendingDeleteTask) {
      return
    }

    const taskId = state.pendingDeleteTask.id
    dispatch({ type: 'set-deleting', payload: true })

    try {
      await tasksService.deleteTask(taskId)
      dispatch({ type: 'remove-task', payload: taskId })
      showToast('Задача удалена', 'success')
    } catch (error) {
      dispatch({ type: 'set-deleting', payload: false })
      showToast(error instanceof Error ? error.message : 'Не удалось удалить задачу', 'error')
    }
  }, [state.pendingDeleteTask, showToast])

  return {
    ...state,
    filteredTasks,
    isEditing: state.editingTaskId !== null,
    setPriorityFilter,
    openCreateModal,
    openEditModal,
    closeTaskModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    setFormTitle,
    setFormPriority,
    saveTask,
    confirmDeleteTask,
    clearToast,
  }
}
