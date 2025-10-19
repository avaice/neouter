import { type ComponentProps, memo } from 'react'
import { useRouter } from '../hooks'

export const Link = memo(
  ({ href, children, ...props }: ComponentProps<'a'> & { href: string }) => {
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
)
