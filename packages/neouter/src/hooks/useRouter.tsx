import { useCallback, useContext } from 'react'
import { RouterContext } from '../context'

export const useRouter = () => {
  const { location, setLocation: _setLocation } = useContext(RouterContext)

  const setLocation = useCallback(
    (path: string) => {
      _setLocation(path)
      window.history.pushState({}, '', path)
    },
    [_setLocation]
  )

  return [location, setLocation] as const
}
