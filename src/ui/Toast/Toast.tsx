import { useEffect } from 'react'
import styles from './Toast.module.css'

export type ToastTone = 'error' | 'success' | 'info'

export interface ToastData {
  id: number
  message: string
  tone: ToastTone
}

interface ToastProps {
  toast: ToastData | null
  onClose: () => void
  durationMs?: number
}

export const Toast = ({ toast, onClose, durationMs = 4000 }: ToastProps) => {
  useEffect(() => {
    if (!toast) {
      return
    }

    const timer = window.setTimeout(() => {
      onClose()
    }, durationMs)

    return () => window.clearTimeout(timer)
  }, [toast, durationMs, onClose])

  if (!toast) {
    return null
  }

  return (
    <div className={styles.host} role="status" aria-live="polite">
      <div className={`${styles.toast} ${styles[toast.tone]}`}>
        <p className={styles.message}>{toast.message}</p>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
          ×
        </button>
      </div>
    </div>
  )
}
