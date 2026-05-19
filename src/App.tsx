import './global.css'
import { useCreateRoutes } from 'neouter'
import { Suspense } from 'react'
import { FullHeightLoading } from './components/FullHeightLoading'
import { routes } from './routes'

export const App = () => {
  const { Router, RouterProvider } = useCreateRoutes({ routes })
  return (
    <RouterProvider>
      <Suspense fallback={<FullHeightLoading />}>
        <Router />
      </Suspense>
    </RouterProvider>
  )
}
