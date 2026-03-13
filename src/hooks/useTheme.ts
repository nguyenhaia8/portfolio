import { useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type ThemeMode = 'light' | 'dark' | 'system'

function getSystemTheme(): Exclude<ThemeMode, 'system'> {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [mode, setMode] = useLocalStorage<ThemeMode>('theme', 'system')

  const resolved = useMemo(() => {
    return mode === 'system' ? getSystemTheme() : mode
  }, [mode])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolved === 'dark')
  }, [resolved])

  useEffect(() => {
    if (mode !== 'system') return
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mql) return

    const onChange = () => {
      const root = document.documentElement
      root.classList.toggle('dark', getSystemTheme() === 'dark')
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [mode])

  return { mode, setMode, resolved }
}

