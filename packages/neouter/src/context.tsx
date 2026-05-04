import { createContext, useEffect, useState } from 'react'
import type { Path, Routes } from './types'

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
  const [location, setLocation] = useState(
    window.location.pathname + window.location.search
  )

  useEffect(() => {
    if ('navigation' in window) {
      const handleNavigate = (e: NavigateEvent) => {
        if (e.canIntercept) {
          e.intercept({
            async handler() {
              setLocation(window.location.pathname + window.location.search)
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
  }, [])

  return (
    <RouterContext.Provider value={{ location, routes }}>
      {children}
    </RouterContext.Provider>
  )
}
