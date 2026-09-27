import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
}

export const Button = ({
  variant = 'primary',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = [styles.root, VARIANT_CLASS[variant], className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
