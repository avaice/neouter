import { useContext, useMemo } from 'react'
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
  const Component = routes[location]?.component
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
      Router: () => (
        <RouterProvider>
          <RouteComponent
            routes={routes}
            notFoundComponent={<NotFoundComponent />}
          />
        </RouterProvider>
      ),
    }
  }, [routes, NotFoundComponent])

  return returnValue
}
