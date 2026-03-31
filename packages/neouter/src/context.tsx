import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import type { Path, Routes } from './types'

export const RouterContext = createContext<{
  location: Path
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
