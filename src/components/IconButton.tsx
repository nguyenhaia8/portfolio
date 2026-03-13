import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
}

export function IconButton({ className, icon, label, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={label}
      title={label}
      className={cn(
        'focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl',
        'border border-subtle bg-[rgb(var(--card))] text-[rgb(var(--card-fg))] transition',
        'hover:bg-[rgba(var(--fg),0.06)] active:translate-y-[1px]',
        className,
      )}
    >
      {icon}
    </button>
  )
}

