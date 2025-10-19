import { lazyImport, useCreateRoutes } from 'packages/neouter/src'
import './global.css'

const { Lazy } = lazyImport(() => import('./routes/lazy'), 'Lazy')

const routes = {
  '/': {
    component: () => <div>Home</div>,
  },
  '/about': {
    component: () => <div>About</div>,
  },
  '/lazy': {
    component: Lazy,
  },
}

export const App = () => {
  const { Router } = useCreateRoutes({ routes })
  return <Router />
}
