import type { PropsWithChildren } from 'react'
import { cn } from '../lib/cn'

export function Card({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-subtle bg-[rgb(var(--card))] text-[rgb(var(--card-fg))]',
        'shadow-[var(--shadow)] shadow-black/5',
        className,
      )}
    >
      {children}
    </div>
  )
}

