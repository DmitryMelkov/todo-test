import { useEffect, useId, useRef, useState } from 'react'
import styles from './Select.module.css'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  id?: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  disabled?: boolean
  'aria-labelledby'?: string
  fullWidth?: boolean
}

export const Select = <T extends string>({
  id,
  value,
  options,
  onChange,
  disabled = false,
  'aria-labelledby': ariaLabelledBy,
  fullWidth = false,
}: SelectProps<T>) => {
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const listboxId = `${triggerId}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const selected = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [isOpen])

  return (
    <div className={`${styles.root} ${fullWidth ? styles.rootFull : ''}`} ref={rootRef}>
      <button
        id={triggerId}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected?.label}</span>
        <svg
          className={styles.chevron}
          viewBox="0 0 20 20"
          width="16"
          height="16"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M5.2 7.5a.75.75 0 0 1 1.06 0L10 11.24l3.74-3.74a.75.75 0 1 1 1.06 1.06l-4.27 4.27a.75.75 0 0 1-1.06 0L5.2 8.56a.75.75 0 0 1 0-1.06Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen ? (
        <ul id={listboxId} className={styles.menu} role="listbox" aria-labelledby={triggerId}>
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
