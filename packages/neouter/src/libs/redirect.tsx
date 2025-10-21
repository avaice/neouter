import { useLayoutEffect } from 'react'
import type { Path } from '../'
import { useRouter } from '../'

const Redirect = ({ path }: { path: Path }) => {
  const [, setLocation] = useRouter()
  useLayoutEffect(() => {
    setLocation(path)
  }, [path, setLocation])
  return null
}

export const redirect = <T extends Path>(path: T) => {
  return () => <Redirect path={path} />
}
