import { getMatchedPath, usePathParams, useRouter } from 'packages/neouter/src'
import { routes } from 'src/routes'

export const useTypedPathname: <T extends keyof typeof routes>(
  path: T
) => ReturnType<typeof usePathParams<T>> = (path) => {
  const pathName = usePathParams()
  const [location] = useRouter()
  if (getMatchedPath(routes, location) !== path) {
    throw new Error('Path does not match')
  }
  return pathName
}
