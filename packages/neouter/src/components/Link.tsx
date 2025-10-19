import { memo } from 'react'
import { useRouter } from '../hooks'

export const Link = memo(({ href, children }: { href: string; children: React.ReactNode }) => {
  const [, setLocation] = useRouter()
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        setLocation(href)
      }}
    >
      {children}
    </a>
  )
})
