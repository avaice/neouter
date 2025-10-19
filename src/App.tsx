import { lazyImport, useCreateRoutes } from 'packages/neouter/src'
import './global.css'
import { Suspense } from 'react'
import { Header } from './components/Header'
import { About } from './routes/About'
import { Home } from './routes/Home'
import { Post } from './routes/Post'
import { User } from './routes/User'

const { Lazy } = lazyImport(() => import('./routes/lazy'), 'Lazy')

const routes = {
  '/': {
    component: Home,
  },
  '/about': {
    component: About,
  },
  '/lazy': {
    component: Lazy,
  },
  '/users/:userId': {
    component: User,
  },
  '/users/:userId/posts/:postId': {
    component: Post,
  },
}

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
