import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === value),
    ),
  )

  const selected = options.find((option) => option.value === value) ?? options[0]

  const openMenu = (index?: number) => {
    const selectedIndex = options.findIndex((option) => option.value === value)
    setActiveIndex(index ?? (selectedIndex >= 0 ? selectedIndex : 0))
    setIsOpen(true)
  }

  const selectIndex = (index: number) => {
    const option = options[index]
    if (!option) {
      return
    }

    onChange(option.value)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [isOpen])

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        openMenu()
        return
      }

      setActiveIndex((current) => {
        if (event.key === 'ArrowDown') {
          return (current + 1) % options.length
        }

        return (current - 1 + options.length) % options.length
      })
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!isOpen) {
        openMenu()
        return
      }

      selectIndex(activeIndex)
      return
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      event.stopPropagation()
      setIsOpen(false)
      return
    }

    if (event.key === 'Home' && isOpen) {
      event.preventDefault()
      setActiveIndex(0)
      return
    }

    if (event.key === 'End' && isOpen) {
      event.preventDefault()
      setActiveIndex(options.length - 1)
    }
  }

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
        aria-activedescendant={isOpen ? `${listboxId}-option-${activeIndex}` : undefined}
        disabled={disabled}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false)
            return
          }

          openMenu()
        }}
        onKeyDown={onTriggerKeyDown}
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
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isActive = index === activeIndex

            return (
              <li key={option.value} role="presentation">
                <button
                  id={`${listboxId}-option-${index}`}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={isSelected}
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''} ${isActive ? styles.optionActive : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectIndex(index)}
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
