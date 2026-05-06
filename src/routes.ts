import { lazyImport, type RouteComponent, redirect } from 'neouter'
import { Top } from './routes/_top/'
import { About } from './routes/About'

type PathPatterns = '/' | '/index.html' | '/about' | '/heavy'

const { Heavy } = lazyImport(() => import('./routes/Heavy'), 'Heavy')

export const routes: Record<PathPatterns, { component: RouteComponent }> = {
  '/': {
    component: Top,
  },
  '/index.html': {
    component: redirect('/'),
  },
  '/about': {
    component: About,
  },
  '/heavy': {
    component: Heavy,
  },
} as const

declare module 'neouter' {
  interface Register {
    pathPatterns: PathPatterns
  }
}
