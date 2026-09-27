import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MOCK_TASKS } from './mockData'
import { resetTasksStore, tasksService } from './index'

describe('tasksService', () => {
  beforeEach(() => {
    resetTasksStore()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('getTasks возвращает копию моковых задач', async () => {
    const promise = tasksService.getTasks()
    await vi.advanceTimersByTimeAsync(350)
    const tasks = await promise

    expect(tasks).toEqual(MOCK_TASKS)
    expect(tasks).not.toBe(MOCK_TASKS)
  })

  it('createTask добавляет задачу с trim title', async () => {
    const promise = tasksService.createTask({
      title: '  Купить молоко  ',
      priority: 'low',
    })
    await vi.advanceTimersByTimeAsync(350)
    const created = await promise

    expect(created.title).toBe('Купить молоко')
    expect(created.priority).toBe('low')
    expect(created.id).toBeTruthy()

    const listPromise = tasksService.getTasks()
    await vi.advanceTimersByTimeAsync(350)
    const list = await listPromise

    expect(list[0]).toEqual(created)
    expect(list).toHaveLength(MOCK_TASKS.length + 1)
  })

  it('createTask падает на пустом title', async () => {
    const promise = tasksService.createTask({ title: '   ', priority: 'medium' })
    const expectation = expect(promise).rejects.toThrow('Название задачи обязательно')
    await vi.advanceTimersByTimeAsync(350)
    await expectation
  })

  it('updateTask обновляет существующую задачу', async () => {
    const id = MOCK_TASKS[0].id
    const promise = tasksService.updateTask(id, {
      title: '  Обновлённый заголовок  ',
      priority: 'low',
    })
    await vi.advanceTimersByTimeAsync(350)
    const updated = await promise

    expect(updated.id).toBe(id)
    expect(updated.title).toBe('Обновлённый заголовок')
    expect(updated.priority).toBe('low')
  })

  it('updateTask падает если задачи нет', async () => {
    const promise = tasksService.updateTask('missing', {
      title: 'Нет такой',
      priority: 'medium',
    })
    const expectation = expect(promise).rejects.toThrow('Задача не найдена')
    await vi.advanceTimersByTimeAsync(350)
    await expectation
  })

  it('deleteTask удаляет задачу из стора', async () => {
    const id = MOCK_TASKS[0].id
    const deletePromise = tasksService.deleteTask(id)
    await vi.advanceTimersByTimeAsync(350)
    await deletePromise

    const listPromise = tasksService.getTasks()
    await vi.advanceTimersByTimeAsync(350)
    const list = await listPromise

    expect(list.find((task) => task.id === id)).toBeUndefined()
    expect(list).toHaveLength(MOCK_TASKS.length - 1)
  })
})
