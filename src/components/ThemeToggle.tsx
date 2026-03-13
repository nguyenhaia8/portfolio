import { IconButton } from './IconButton'
import { useTheme } from '../hooks/useTheme'
import { FiMoon, FiSun } from 'react-icons/fi'

export function ThemeToggle() {
  const { mode, setMode, resolved } = useTheme()

  const nextMode = resolved === 'dark' ? 'light' : 'dark'
  const label = mode === 'system' ? `Theme: System (${resolved})` : `Theme: ${mode}`

  return (
    <IconButton
      label={label}
      icon={resolved === 'dark' ? <FiSun /> : <FiMoon />}
      onClick={() => setMode(nextMode)}
    />
  )
}

