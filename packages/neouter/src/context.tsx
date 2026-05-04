import { createContext, useEffect, useState, useTransition } from 'react'
import type { Path, Routes } from './types'
import { getMatchedPath } from './utils'

export const RouterContext = createContext<{
  location: Path
  routes: Routes
}>({ location: '', routes: {} })

export const RouterProvider = ({
  routes,
  children,
}: {
  routes: Routes
  children: React.ReactNode
}) => {
  const [, startTransition] = useTransition()
  const [location, setLocation] = useState(
    window.location.pathname + window.location.search
  )

  useEffect(() => {
    if ('navigation' in window) {
      const handleNavigate = (e: NavigateEvent) => {
        if (e.canIntercept) {
          const destination = new URL(e.destination.url)
          const nextPath = destination.pathname + destination.search
          e.intercept({
            async handler() {
              startTransition(() => {
                setLocation(nextPath)
              })
              const matchedPath = getMatchedPath(routes, nextPath)
              const Component = matchedPath
                ? routes[matchedPath]?.component
                : null

              if (
                Component &&
                'preload' in Component &&
                typeof Component.preload === 'function'
              ) {
                await Component.preload()
              }
            },
          })
        }
      }
      navigation.addEventListener('navigate', handleNavigate)
      return () => {
        navigation.removeEventListener('navigate', handleNavigate)
      }
    } else {
      // Older browsers will perform a full navigation to the new URL
    }
  }, [routes])

  return (
    <RouterContext.Provider value={{ location, routes }}>
      {children}
    </RouterContext.Provider>
  )
}
