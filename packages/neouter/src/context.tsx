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
    const handlePopState = () => {
      setLocation(window.location.pathname + window.location.search)
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <RouterContext.Provider value={{ location, routes }}>
      {children}
    </RouterContext.Provider>
  )
}
