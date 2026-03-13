import type { PropsWithChildren } from 'react'
import { cn } from '../lib/cn'
import { Container } from '../components/Container'

export function Section({
  id,
  className,
  children,
}: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-20', className)}
    >
      <Container>{children}</Container>
    </section>
  )
}

