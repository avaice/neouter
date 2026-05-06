import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react'
import type { Path, Routes } from './types'
import { getMatchedPath, normalizePathname } from './utils'

export const RouterContext = createContext<{
  location: Path
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
  const [, startTransition] = useTransition()
  const [location, setLocation] = useState(
    window.location.pathname + window.location.search
  )

  useEffect(() => {
    if ('navigation' in window) {
      const handleNavigate = (e: NavigateEvent) => {
        if (
          !e.canIntercept ||
          e.hashChange ||
          e.downloadRequest !== null ||
          e.formData
        ) {
          return
        }

        const destination = new URL(e.destination.url)
        const nextPath = destination.pathname + destination.search
        e.intercept({
          async handler() {
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

            if (e.signal.aborted) return

            const isSamePath =
              normalizePathname(nextPath) === normalizePathname(location)

            if (
              isSamePath // Do not mark changes that are only query parameters as a transition
            ) {
              setLocation(nextPath)
            } else {
              startTransition(() => {
                setLocation(nextPath)
              })
            }
          },
        })
      }
      navigation.addEventListener('navigate', handleNavigate)
      return () => {
        navigation.removeEventListener('navigate', handleNavigate)
      }
    } else {
      // Older browsers will perform a full navigation to the new URL
    }
  }, [routes, location])

  return (
    <RouterContext.Provider value={{ location, setLocation, routes }}>
      {children}
    </RouterContext.Provider>
  )
}
