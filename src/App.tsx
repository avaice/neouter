import './global.css'
import { useCreateRoutes } from 'neouter'
import { Suspense } from 'react'
import { routes } from './routes'

export const App = () => {
  const { Router, RouterProvider } = useCreateRoutes({ routes })
  return (
    <RouterProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <Router />
      </Suspense>
    </RouterProvider>
  )
}
