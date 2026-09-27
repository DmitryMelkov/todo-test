import { PRIORITY_LABELS, type Task } from '@/types/task'
import styles from '../Tasks.module.css'

interface TaskListProps {
  tasks: Task[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className={styles.empty}>Задач не найдено</p>
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
