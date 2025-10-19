import { useCreateRoutes } from 'packages/neouter/src'
import './global.css'
import { Suspense } from 'react'
import { Header } from './components/Header'
import { routes } from './routes'

export const App = () => {
  const { Router, RouterProvider } = useCreateRoutes({ routes })
  return (
    <RouterProvider>
      <div className="mx-auto max-w-[800px] p-4">
        <Header />
        <div className="mt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </div>
      </div>
    </RouterProvider>
  )
}
