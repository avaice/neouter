import { useContext, useLayoutEffect } from 'react'
import { RouterContext } from 'src/context'
import type { Path } from '..'

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
