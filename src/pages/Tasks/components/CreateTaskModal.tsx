import { useEffect, useId, useRef } from 'react'
import { PRIORITIES, PRIORITY_LABELS, type Priority } from '@/types/task'
import { Button } from '@/ui/Button'
import { Select } from '@/ui/Select'
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
    <div className={styles.overlay} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
      >
        <div className={styles.modalHeader}>
          <h2 id="create-task-title" className={styles.modalTitle}>
            Новая задача
          </h2>
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Закрыть"
          >
            <svg
              className={styles.modalCloseIcon}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M6.4 6.4a1 1 0 0 1 1.4 0L12 10.6l4.2-4.2a1 1 0 1 1 1.4 1.4L13.4 12l4.2 4.2a1 1 0 0 1-1.4 1.4L12 13.4l-4.2 4.2a1 1 0 0 1-1.4-1.4L10.6 12 6.4 7.8a1 1 0 0 1 0-1.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

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

          <div className={styles.field}>
            <span id={priorityId}>Приоритет</span>
            <Select
              value={form.priority}
              options={PRIORITIES.map((priority) => ({
                value: priority,
                label: PRIORITY_LABELS[priority],
              }))}
              onChange={onPriorityChange}
              disabled={isSubmitting}
              aria-labelledby={priorityId}
              fullWidth
            />
          </div>

          {formError ? <p className={styles.formError}>{formError}</p> : null}

          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Создание…' : 'Создать'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
