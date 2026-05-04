import { useCallback, useContext } from 'react'
import { RouterContext } from '../context'
import type { Path } from '../types'

export const useRouter = () => {
  const { location, setLocation: _setLocation } = useContext(RouterContext)

  const setLocation = useCallback(
    (path: Path) => {
      window.history.pushState({}, '', path)
      if (!('navigation' in window)) {
        _setLocation(path)
      }
    },
    [_setLocation]
  )

  return [location, setLocation] as const
}
