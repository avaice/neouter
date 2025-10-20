import type { ComponentProps } from 'react'
import { useRouter } from '../hooks'
import type { Path } from '../types'

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
        if (e.ctrlKey || e.metaKey) {
          return
        }
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
