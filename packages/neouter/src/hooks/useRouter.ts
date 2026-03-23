import { useCallback, useContext } from 'react'
import { RouterContext } from '../context'
import type { Path } from '../types'

export const useRouter = () => {
  const { location, setLocation: _setLocation } = useContext(RouterContext)

  const setLocation = useCallback(
    (path: Path) => {
      _setLocation(path)
      window.history.pushState({}, '', path)
    },
    [_setLocation]
  )

  return [location, setLocation] as const
}
