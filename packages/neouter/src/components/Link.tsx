import type { ComponentProps } from 'react'
import type { Path } from '../types'

export const Link = ({
  children,
  ...props
}: ComponentProps<'a'> & { href: Path }) => {
  return <a {...props}>{children}</a>
}
