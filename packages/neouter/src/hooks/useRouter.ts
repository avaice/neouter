import { useCallback, useContext } from 'react'
import { RouterContext } from '../context'
import type { Path } from '../types'

export const useRouter = () => {
  const { location } = useContext(RouterContext)

  const setLocation = useCallback((path: Path) => {
    window.history.pushState({}, '', path)
  }, [])

  return [location, setLocation] as const
}
