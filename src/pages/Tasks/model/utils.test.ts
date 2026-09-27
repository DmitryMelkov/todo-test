import { describe, expect, it } from 'vitest'
import { createInitialFormState, filterTasksByPriority, validateTaskForm } from './utils'

const tasks = [
  { id: '1', priority: 'low' as const },
  { id: '2', priority: 'medium' as const },
  { id: '3', priority: 'high' as const },
  { id: '4', priority: 'high' as const },
]

describe('filterTasksByPriority', () => {
  it('возвращает все задачи при фильтре all', () => {
    expect(filterTasksByPriority(tasks, 'all')).toEqual(tasks)
  })

  it('фильтрует по выбранному приоритету', () => {
    expect(filterTasksByPriority(tasks, 'high')).toEqual([
      { id: '3', priority: 'high' },
      { id: '4', priority: 'high' },
    ])
  })

  it('возвращает пустой массив, если совпадений нет', () => {
    expect(filterTasksByPriority([{ id: '1', priority: 'low' as const }], 'high')).toEqual([])
  })
})

describe('validateTaskForm', () => {
  it('требует непустой title', () => {
    expect(validateTaskForm({ title: '   ', priority: 'medium' })).toBe('Введите название задачи')
  })

  it('пропускает валидную форму', () => {
    expect(validateTaskForm({ title: 'Сделать ревью', priority: 'high' })).toBe('')
  })
})

describe('createInitialFormState', () => {
  it('задаёт пустой title и средний приоритет', () => {
    expect(createInitialFormState()).toEqual({ title: '', priority: 'medium' })
  })
})
