import type { CreateTaskPayload, Task, UpdateTaskPayload } from '@/types/task'
import { MOCK_TASKS } from './mockData'

const MOCK_DELAY_MS = 350

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

let tasksStore: Task[] = [...MOCK_TASKS]

/** Сброс in-memory стора между тестами */
export const resetTasksStore = () => {
  tasksStore = [...MOCK_TASKS]
}

export const tasksService = {
  async getTasks(): Promise<Task[]> {
    await delay(MOCK_DELAY_MS)
    return tasksStore.map((task) => ({ ...task }))
  },

  async createTask(payload: CreateTaskPayload): Promise<Task> {
    await delay(MOCK_DELAY_MS)

    const title = payload.title.trim()
    if (!title) {
      throw new Error('Название задачи обязательно')
    }

    const task: Task = {
      id: crypto.randomUUID(),
      title,
      priority: payload.priority,
      createdAt: new Date().toISOString(),
    }

    tasksStore = [task, ...tasksStore]
    return { ...task }
  },

  async updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
    await delay(MOCK_DELAY_MS)

    const title = payload.title.trim()
    if (!title) {
      throw new Error('Название задачи обязательно')
    }

    const index = tasksStore.findIndex((task) => task.id === id)
    if (index === -1) {
      throw new Error('Задача не найдена')
    }

    const updated: Task = {
      ...tasksStore[index],
      title,
      priority: payload.priority,
    }

    tasksStore = tasksStore.map((task) => (task.id === id ? updated : task))
    return { ...updated }
  },

  async deleteTask(id: string): Promise<void> {
    await delay(MOCK_DELAY_MS)

    const exists = tasksStore.some((task) => task.id === id)
    if (!exists) {
      throw new Error('Задача не найдена')
    }

    tasksStore = tasksStore.filter((task) => task.id !== id)
  },
}
