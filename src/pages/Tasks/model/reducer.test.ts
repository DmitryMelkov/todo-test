import { describe, expect, it } from 'vitest'
import { initialTasksState, tasksReducer } from './reducer'
import type { TasksState } from './type'

const sampleTask = {
  id: 'task-1',
  title: 'Новая задача',
  priority: 'high' as const,
  createdAt: '2026-09-27T12:00:00.000Z',
}

const withOpenModal = (overrides: Partial<TasksState> = {}): TasksState => ({
  ...initialTasksState,
  isLoading: false,
  isTaskModalOpen: true,
  form: { title: 'Черновик', priority: 'low' },
  formError: 'старая ошибка',
  ...overrides,
})

describe('tasksReducer', () => {
  it('set-bootstrap кладёт задачи и снимает loading', () => {
    const next = tasksReducer(initialTasksState, {
      type: 'set-bootstrap',
      payload: { tasks: [sampleTask] },
    })

    expect(next.tasks).toEqual([sampleTask])
    expect(next.isLoading).toBe(false)
  })

  it('set-priority-filter обновляет фильтр', () => {
    const next = tasksReducer(initialTasksState, {
      type: 'set-priority-filter',
      payload: 'high',
    })

    expect(next.priorityFilter).toBe('high')
  })

  it('close-task-modal сбрасывает форму и editingTaskId', () => {
    const next = tasksReducer(withOpenModal({ editingTaskId: 'task-1' }), {
      type: 'close-task-modal',
    })

    expect(next.isTaskModalOpen).toBe(false)
    expect(next.editingTaskId).toBeNull()
    expect(next.form).toEqual({ title: '', priority: 'medium' })
    expect(next.formError).toBe('')
  })

  it('open-create-modal открывает пустую форму', () => {
    const next = tasksReducer(withOpenModal({ isTaskModalOpen: false }), {
      type: 'open-create-modal',
    })

    expect(next.isTaskModalOpen).toBe(true)
    expect(next.editingTaskId).toBeNull()
    expect(next.form).toEqual({ title: '', priority: 'medium' })
  })

  it('open-edit-modal заполняет форму данными задачи', () => {
    const next = tasksReducer(initialTasksState, {
      type: 'open-edit-modal',
      payload: sampleTask,
    })

    expect(next.isTaskModalOpen).toBe(true)
    expect(next.editingTaskId).toBe(sampleTask.id)
    expect(next.form).toEqual({ title: sampleTask.title, priority: sampleTask.priority })
  })

  it('set-form-title обновляет title и сбрасывает formError', () => {
    const next = tasksReducer(withOpenModal(), {
      type: 'set-form-title',
      payload: 'Обновлённый заголовок',
    })

    expect(next.form.title).toBe('Обновлённый заголовок')
    expect(next.formError).toBe('')
  })

  it('add-task добавляет задачу в начало и закрывает модалку', () => {
    const state = withOpenModal({
      tasks: [
        {
          id: 'old',
          title: 'Старая',
          priority: 'low',
          createdAt: '2026-09-01T00:00:00.000Z',
        },
      ],
      isSubmitting: true,
    })

    const next = tasksReducer(state, { type: 'add-task', payload: sampleTask })

    expect(next.tasks[0]).toEqual(sampleTask)
    expect(next.tasks).toHaveLength(2)
    expect(next.isTaskModalOpen).toBe(false)
    expect(next.isSubmitting).toBe(false)
    expect(next.form).toEqual({ title: '', priority: 'medium' })
  })

  it('update-task заменяет задачу и закрывает модалку', () => {
    const updated = { ...sampleTask, title: 'Обновлено', priority: 'low' as const }
    const next = tasksReducer(
      withOpenModal({
        tasks: [sampleTask],
        editingTaskId: sampleTask.id,
        isSubmitting: true,
      }),
      { type: 'update-task', payload: updated },
    )

    expect(next.tasks).toEqual([updated])
    expect(next.isTaskModalOpen).toBe(false)
    expect(next.editingTaskId).toBeNull()
    expect(next.isSubmitting).toBe(false)
  })

  it('remove-task удаляет задачу и закрывает confirm', () => {
    const next = tasksReducer(
      {
        ...initialTasksState,
        tasks: [sampleTask],
        pendingDeleteTask: sampleTask,
        isDeleting: true,
      },
      { type: 'remove-task', payload: sampleTask.id },
    )

    expect(next.tasks).toEqual([])
    expect(next.pendingDeleteTask).toBeNull()
    expect(next.isDeleting).toBe(false)
  })

  it('open-delete-confirm сохраняет задачу на удаление', () => {
    const next = tasksReducer(initialTasksState, {
      type: 'open-delete-confirm',
      payload: sampleTask,
    })

    expect(next.pendingDeleteTask).toEqual(sampleTask)
  })

  it('set-toast сохраняет сообщение', () => {
    const next = tasksReducer(initialTasksState, {
      type: 'set-toast',
      payload: { id: 1, message: 'Сбой загрузки', tone: 'error' },
    })

    expect(next.toast).toEqual({ id: 1, message: 'Сбой загрузки', tone: 'error' })
  })

  it('clear-toast очищает toast', () => {
    const next = tasksReducer(
      {
        ...initialTasksState,
        toast: { id: 1, message: 'Ошибка', tone: 'error' },
      },
      { type: 'clear-toast' },
    )

    expect(next.toast).toBeNull()
  })
})
