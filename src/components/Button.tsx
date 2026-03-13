import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200',
        'active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' ? 'h-9 px-3 text-sm' : 'h-11 px-4 text-sm',
        variant === 'primary' &&
          'bg-[rgb(var(--primary))] text-white shadow-[var(--shadow)] hover:bg-[rgb(var(--primary-2))]',
        variant === 'secondary' &&
          'border border-subtle bg-[rgb(var(--card))] text-[rgb(var(--card-fg))] hover:bg-[rgba(var(--fg),0.04)]',
        variant === 'ghost' &&
          'text-[rgb(var(--fg))] hover:bg-[rgba(var(--fg),0.06)]',
        className,
      )}
    />
  )
}

