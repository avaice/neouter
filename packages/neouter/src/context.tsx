import { createContext, type Dispatch, type SetStateAction, useState } from 'react'

export const RouterContext = createContext<{
  path: string
  setPath: Dispatch<SetStateAction<string>>
}>({ path: '', setPath: () => {} })

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState(location.pathname)
  return <RouterContext.Provider value={{ path, setPath }}>{children}</RouterContext.Provider>
}
