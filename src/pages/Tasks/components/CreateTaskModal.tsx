import { useEffect, useId, useRef } from 'react'
import { PRIORITIES, PRIORITY_LABELS, type Priority } from '@/types/task'
import type { TaskFormState } from '../type'
import styles from '../Tasks.module.css'

interface CreateTaskModalProps {
  isOpen: boolean
  isSubmitting: boolean
  form: TaskFormState
  formError: string
  onClose: () => void
  onTitleChange: (title: string) => void
  onPriorityChange: (priority: Priority) => void
  onSubmit: () => void
}

export const CreateTaskModal = ({
  isOpen,
  isSubmitting,
  form,
  formError,
  onClose,
  onTitleChange,
  onPriorityChange,
  onSubmit,
}: CreateTaskModalProps) => {
  const titleId = useId()
  const priorityId = useId()
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    titleInputRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, isSubmitting, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="create-task-title" className={styles.modalTitle}>
          Новая задача
        </h2>

        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <label className={styles.field} htmlFor={titleId}>
            <span>Название</span>
            <input
              id={titleId}
              ref={titleInputRef}
              className={styles.input}
              type="text"
              value={form.title}
              onChange={(event) => onTitleChange(event.target.value)}
              disabled={isSubmitting}
              placeholder="Что нужно сделать"
            />
          </label>

          <label className={styles.field} htmlFor={priorityId}>
            <span>Приоритет</span>
            <select
              id={priorityId}
              className={styles.select}
              value={form.priority}
              onChange={(event) => onPriorityChange(event.target.value as Priority)}
              disabled={isSubmitting}
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {PRIORITY_LABELS[priority]}
                </option>
              ))}
            </select>
          </label>

          {formError ? <p className={styles.formError}>{formError}</p> : null}

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button type="submit" className={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Создание…' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
