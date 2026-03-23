import { lazyImport, redirect } from 'neouter'
import type { JSX } from 'react'
import { About } from './routes/About'
import { About2 } from './routes/About2'
import { Home } from './routes/Home'
import { Post } from './routes/Post'
import { User } from './routes/User'

const { Lazy } = lazyImport(() => import('./routes/lazy'), 'Lazy')

type PathPatterns =
  | '/'
  | '/index.html'
  | '/about'
  | '/about-2/:id'
  | '/lazy'
  | '/users/:userId'
  | '/users/:userId/posts/:postId'

export const routes: Record<PathPatterns, { component: () => JSX.Element }> = {
  '/': {
    component: Home,
  },
  '/index.html': {
    component: redirect('/'),
  },
  '/about': {
    component: About,
  },
  '/about-2/:id': {
    component: About2,
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
} as const

declare module 'neouter' {
  interface Register {
    pathPatterns: PathPatterns
  }
}
