import { PRIORITIES, PRIORITY_LABELS } from '@/types/task'
import type { PriorityFilter as PriorityFilterValue } from '../type'
import styles from '../Tasks.module.css'

interface PriorityFilterProps {
  value: PriorityFilterValue
  onChange: (value: PriorityFilterValue) => void
}

const FILTER_OPTIONS: { value: PriorityFilterValue; label: string }[] = [
  { value: 'all', label: 'Все' },
  ...PRIORITIES.map((priority) => ({
    value: priority,
    label: PRIORITY_LABELS[priority],
  })),
]

export const PriorityFilterSelect = ({ value, onChange }: PriorityFilterProps) => {
  return (
    <label className={styles.filter}>
      <span className={styles.filterLabel}>Приоритет</span>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as PriorityFilterValue)}
      >
        {FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
