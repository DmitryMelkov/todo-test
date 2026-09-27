import { PRIORITY_LABELS, type Priority, type Task } from '@/types/task'
import { Button } from '@/ui/Button'
import type { PriorityFilter } from '../type'
import styles from '../Tasks.module.css'

interface TaskListProps {
  tasks: Task[]
  priorityFilter: PriorityFilter
  onCreate: () => void
}

export const TaskList = ({ tasks, priorityFilter, onCreate }: TaskListProps) => {
  if (tasks.length === 0) {
    const isFiltered = priorityFilter !== 'all'

    return (
      <div className={styles.status} role="status">
        <p className={styles.statusTitle}>{isFiltered ? 'Ничего не найдено' : 'Список пуст'}</p>
        <p className={styles.statusText}>
          {isFiltered
            ? `Нет задач с приоритетом «${PRIORITY_LABELS[priorityFilter as Priority]}». Смените фильтр или создайте задачу.`
            : 'Создайте первую задачу — она появится в списке.'}
        </p>
        <Button type="button" variant="secondary" onClick={onCreate}>
          Создать задачу
        </Button>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id} className={styles.item}>
          <div className={styles.itemMain}>
            <span className={styles.itemTitle}>{task.title}</span>
            <span className={`${styles.badge} ${styles[`badge_${task.priority}`]}`}>
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>
          <time className={styles.itemDate} dateTime={task.createdAt}>
            {new Date(task.createdAt).toLocaleString('ru-RU')}
          </time>
        </li>
      ))}
    </ul>
  )
}
