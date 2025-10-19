import { useMemo } from 'react'
import type { Routes } from '../types'

export const useCreateRoutes = ({ routes }: { routes: Routes }) => {
  const path = '/lazdy'

  const returnValue = useMemo(() => {
    return {
      paths: Object.keys(routes),
      Router: routes[path]?.component || (() => <div>Not Found</div>),
    }
  }, [routes[path]])

  return returnValue
}
