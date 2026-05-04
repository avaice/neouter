import { useLayoutEffect } from 'react'
import type { Path } from '..'

const Redirect = ({ path }: { path: Path }) => {
  useLayoutEffect(() => {
    window.history.replaceState({}, '', path)
  }, [path])
  return null
}

export const redirect = <T extends Path>(path: T) => {
  return () => <Redirect path={path} />
}
