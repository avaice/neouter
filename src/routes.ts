import { lazyImport } from 'packages/neouter/src'
import { About } from './routes/About'
import { Home } from './routes/Home'
import { Post } from './routes/Post'
import { User } from './routes/User'

const { Lazy } = lazyImport(() => import('./routes/lazy'), 'Lazy')

export const routes = {
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
} as const
