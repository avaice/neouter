import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react'
import type { Routes } from './types'

export const RouterContext = createContext<{
  location: string
  setLocation: Dispatch<SetStateAction<string>>
  routes: Routes
}>({ location: '', setLocation: () => {}, routes: {} })

export const RouterProvider = ({
  routes,
  children,
}: {
  routes: Routes
  children: React.ReactNode
}) => {
  const [location, setLocation] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setLocation(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <RouterContext.Provider value={{ location, setLocation, routes }}>
      {children}
    </RouterContext.Provider>
  )
}
