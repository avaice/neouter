import { useContext, useLayoutEffect } from 'react'
import type { Path } from '..'
import { RouterContext } from '../context'

const Redirect = ({ path }: { path: Path }) => {
  const { setLocation } = useContext(RouterContext)
  useLayoutEffect(() => {
    window.history.replaceState({}, '', path)
    if (!('navigation' in window)) {
      setLocation(path)
    }
  }, [path, setLocation])
  return null
}

export const redirect = <T extends Path>(path: T) => {
  return () => <Redirect path={path} />
}
