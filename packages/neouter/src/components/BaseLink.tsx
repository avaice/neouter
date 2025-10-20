import type { ComponentProps } from 'react'
import type { Path } from '../types'
import { useRouter } from '../hooks'

export const BaseLink = ({
  href,
  children,
  ...props
}: ComponentProps<'a'> & { href: Path }) => {
  const [, setLocation] = useRouter()
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        setLocation(href)
      }}
      {...props}
    >
      {children}
    </a>
  )
}
