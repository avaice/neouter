import { createContext, type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export const RouterContext = createContext<{
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}>({ location: '', setLocation: () => {} })

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
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
    <RouterContext.Provider value={{ location, setLocation }}>{children}</RouterContext.Provider>
  )
}
