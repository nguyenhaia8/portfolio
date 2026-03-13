import type { PropsWithChildren } from 'react'
import { cn } from '../lib/cn'

export function Badge({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-subtle px-2.5 py-1 text-xs font-medium',
        'bg-[rgba(var(--fg-rgb),0.03)] text-[var(--custom)]',
        className,
      )}
    >
      {children}
    </span>
  )
}

