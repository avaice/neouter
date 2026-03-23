import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import type { Routes } from './types'

export const RouterContext = createContext<{
  location: string
  setLocation: Dispatch<SetStateAction<string>>
  routes: Routes
  initialTitle: string
}>({ location: '', setLocation: () => {}, routes: {}, initialTitle: '' })

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
  const [initialTitle, setInitialTitle] = useState('')

  useLayoutEffect(() => {
    if (document.title) {
      setInitialTitle(document.title)
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      console.log(
        'set',
        window.location.pathname,
        'search',
        window.location.search
      )
      setLocation(window.location.pathname + window.location.search)
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <RouterContext.Provider
      value={{ location, setLocation, routes, initialTitle }}
    >
      {children}
    </RouterContext.Provider>
  )
}
