import { Fragment, useContext, useEffect, useMemo } from 'react'
import { getMatchedPath, normalizePathname } from '../'
import { RouterContext, RouterProvider } from '../context'
import type { Routes } from '../types'

const ScrollIntoView = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    }
  }, [])
  return <>{children}</>
}

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
  const pathname = normalizePathname(location)

  return (
    <Fragment key={`neouter-${pathname}`}>
      <ScrollIntoView>
        {Component ? <Component /> : notFoundComponent}
      </ScrollIntoView>
    </Fragment>
  )
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
      RouterProvider: ({ children }: { children: React.ReactNode }) => (
        <RouterProvider routes={routes}>{children}</RouterProvider>
      ),
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
