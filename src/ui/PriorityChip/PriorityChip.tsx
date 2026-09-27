import { PRIORITY_LABELS, type Priority } from '@/types/task'
import styles from './PriorityChip.module.css'

interface PriorityChipProps {
  priority: Priority
}

export const PriorityChip = ({ priority }: PriorityChipProps) => (
  <span className={`${styles.chip} ${styles[priority]}`}>{PRIORITY_LABELS[priority]}</span>
)
