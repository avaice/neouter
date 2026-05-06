import { lazyImport, type RouteComponent, redirect } from 'neouter'
import { Top } from './routes/_top/'
import { About } from './routes/About'
import { Users } from './routes/Users'
import { User } from './routes/User'
import { Post } from './routes/Post'

type PathPatterns = '/' | '/index.html' | '/about' | '/heavy' | '/users' | `/users/:id` | `/users/:userId/posts/:postId`

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
  '/users': {
    component: Users,
  },
  '/users/:id': {
    component: User,
  },
  '/users/:userId/posts/:postId': {
    component: Post,
  },
} as const

declare module 'neouter' {
  interface Register {
    pathPatterns: PathPatterns
  }
}
