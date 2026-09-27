import { useEffect, useId, useRef } from 'react'
import { PRIORITIES, PRIORITY_LABELS, type Priority } from '@/types/task'
import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'
import { Select } from '@/ui/Select'
import type { TaskFormState } from '../model'
import styles from '../Tasks.module.css'

interface TaskFormModalProps {
  isOpen: boolean
  isEditing: boolean
  isSubmitting: boolean
  form: TaskFormState
  formError: string
  onClose: () => void
  onTitleChange: (title: string) => void
  onPriorityChange: (priority: Priority) => void
  onSubmit: () => void
}

export const TaskFormModal = ({
  isOpen,
  isEditing,
  isSubmitting,
  form,
  formError,
  onClose,
  onTitleChange,
  onPriorityChange,
  onSubmit,
}: TaskFormModalProps) => {
  const titleId = useId()
  const titleErrorId = useId()
  const priorityId = useId()
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    titleInputRef.current?.focus()
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? 'Редактирование задачи' : 'Новая задача'}
      onClose={onClose}
      closeDisabled={isSubmitting}
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Отмена
          </Button>
          <Button type="button" disabled={isSubmitting} onClick={onSubmit}>
            {isSubmitting ? 'Сохранение…' : isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </>
      }
    >
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
            className={[styles.input, formError ? styles.inputError : null]
              .filter(Boolean)
              .join(' ')}
            type="text"
            value={form.title}
            onChange={(event) => onTitleChange(event.target.value)}
            disabled={isSubmitting}
            placeholder="Что нужно сделать"
            aria-invalid={formError ? true : undefined}
            aria-describedby={formError ? titleErrorId : undefined}
          />
          {formError ? (
            <p id={titleErrorId} className={styles.formError} role="alert">
              {formError}
            </p>
          ) : null}
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
      </form>
    </Modal>
  )
}
