import { useMemo } from 'react'
import type { Routes } from '../types'

export const useCreateRoutes = ({
  routes,
  notFoundComponent,
}: {
  routes: Routes
  notFoundComponent?: React.ComponentType
}) => {
  const path = '/lazy'

  const returnValue = useMemo(() => {
    return {
      paths: Object.keys(routes),
      Router: routes[path]?.component || notFoundComponent || (() => <>404</>),
    }
  }, [routes[path], notFoundComponent])

  return returnValue
}
