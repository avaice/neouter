import type { ComponentProps } from 'react'
import type { Path } from '../types'
import { useRouter } from '../hooks'

export const BaseLink = ({
  href,
  children,
  ...props
}: ComponentProps<'a'> & { href: Path }) => {
  const [, setLocation] = useRouter()
  const { onClick, ...restProps } = props
  return (
    <a
      href={href}
      {...restProps}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) {
          e.preventDefault()
          setLocation(href)
        }
      }}
    >
      {children}
    </a>
  )
}
