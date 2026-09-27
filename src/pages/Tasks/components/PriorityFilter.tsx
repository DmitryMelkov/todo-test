import { PRIORITIES, PRIORITY_LABELS } from '@/types/task'
import { Select } from '@/ui/Select'
import type { PriorityFilter as PriorityFilterValue } from '../model'
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
  const labelId = 'priority-filter-label'

  return (
    <div className={styles.filter}>
      <span id={labelId} className={styles.filterLabel}>
        Приоритет
      </span>
      <Select
        value={value}
        options={FILTER_OPTIONS}
        onChange={onChange}
        aria-labelledby={labelId}
      />
    </div>
  )
}
