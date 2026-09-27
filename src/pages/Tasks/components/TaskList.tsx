import { PRIORITY_LABELS, type Priority, type Task } from '@/types/task'
import { Button } from '@/ui/Button'
import { PriorityChip } from '@/ui/PriorityChip'
import type { PriorityFilter } from '../model'
import styles from '../Tasks.module.css'

interface TaskListProps {
  tasks: Task[]
  priorityFilter: PriorityFilter
  onCreate: () => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export const TaskList = ({ tasks, priorityFilter, onCreate, onEdit, onDelete }: TaskListProps) => {
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
            <PriorityChip priority={task.priority} />
          </div>
          <div className={styles.itemFooter}>
            <time className={styles.itemDate} dateTime={task.createdAt}>
              {new Date(task.createdAt).toLocaleString('ru-RU')}
            </time>
            <div className={styles.itemActions}>
              <Button
                type="button"
                variant="secondary"
                className={styles.itemAction}
                onClick={() => onEdit(task)}
              >
                Изменить
              </Button>
              <Button
                type="button"
                variant="secondary"
                className={styles.itemAction}
                onClick={() => onDelete(task)}
              >
                Удалить
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
