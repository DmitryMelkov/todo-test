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
  isCreateModalOpen: true,
  form: { title: 'Черновик', priority: 'low' },
  formError: 'старая ошибка',
  error: 'ошибка списка',
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
    expect(next.error).toBe('')
  })

  it('set-priority-filter обновляет фильтр', () => {
    const next = tasksReducer(initialTasksState, {
      type: 'set-priority-filter',
      payload: 'high',
    })

    expect(next.priorityFilter).toBe('high')
  })

  it('закрытие модалки сбрасывает форму и formError', () => {
    const next = tasksReducer(withOpenModal(), {
      type: 'set-create-modal-open',
      payload: false,
    })

    expect(next.isCreateModalOpen).toBe(false)
    expect(next.form).toEqual({ title: '', priority: 'medium' })
    expect(next.formError).toBe('')
    expect(next.error).toBe('ошибка списка')
  })

  it('открытие модалки очищает error списка', () => {
    const next = tasksReducer(withOpenModal({ isCreateModalOpen: false }), {
      type: 'set-create-modal-open',
      payload: true,
    })

    expect(next.isCreateModalOpen).toBe(true)
    expect(next.error).toBe('')
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
    expect(next.isCreateModalOpen).toBe(false)
    expect(next.isSubmitting).toBe(false)
    expect(next.form).toEqual({ title: '', priority: 'medium' })
    expect(next.formError).toBe('')
  })

  it('set-error сохраняет сообщение и снимает loading', () => {
    const next = tasksReducer(
      { ...initialTasksState, isLoading: true },
      { type: 'set-error', payload: 'Сбой загрузки' },
    )

    expect(next.error).toBe('Сбой загрузки')
    expect(next.isLoading).toBe(false)
  })
})
