import { useContext, useMemo } from 'react'
import { getMatchedPath } from '../'
import { RouterContext, RouterProvider } from '../context'
import type { Routes } from '../types'

const RouteComponent = ({
  routes,
  notFoundComponent,
}: {
  routes: Routes
  notFoundComponent?: React.ReactNode
}) => {
  const { location } = useContext(RouterContext)
  const matchedPath = getMatchedPath(routes, location)
  const Component = matchedPath ? routes[matchedPath]?.component : null
  return Component ? <Component /> : notFoundComponent
}

export const useCreateRoutes = ({
  routes,
  notFoundComponent,
}: {
  routes: Routes
  notFoundComponent?: React.ComponentType
}) => {
  const NotFoundComponent = notFoundComponent || (() => <div>404</div>)

  const returnValue = useMemo(() => {
    return {
      paths: Object.keys(routes),
      RouterProvider: RouterProvider,
      Router: () => (
        <RouteComponent
          routes={routes}
          notFoundComponent={<NotFoundComponent />}
        />
      ),
    }
  }, [routes, NotFoundComponent])

  return returnValue
}
