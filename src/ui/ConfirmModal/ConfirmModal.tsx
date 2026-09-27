import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'
import styles from './ConfirmModal.module.css'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  isConfirming?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
      closeDisabled={isConfirming}
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <Button type="button" onClick={onConfirm} disabled={isConfirming}>
            {isConfirming ? 'Подождите…' : confirmLabel}
          </Button>
        </>
      }
    >
      <p className={styles.description}>{description}</p>
    </Modal>
  )
}
