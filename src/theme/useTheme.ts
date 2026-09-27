import { useCallback, useEffect, useState } from 'react'
import { applyTheme, resolveInitialTheme, type Theme } from './theme'

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof document === 'undefined' ? 'light' : resolveInitialTheme(),
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  }
}
