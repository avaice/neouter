import { useContext, useLayoutEffect } from 'react'
import type { Path } from '../'
import { RouterContext } from '../context'

const Redirect = ({ path }: { path: Path }) => {
  const { setLocation: _setLocation } = useContext(RouterContext)
  useLayoutEffect(() => {
    _setLocation(path)
    window.history.replaceState({}, '', path)
  }, [path, _setLocation])
  return null
}

export const redirect = <T extends Path>(path: T) => {
  return () => <Redirect path={path} />
}
