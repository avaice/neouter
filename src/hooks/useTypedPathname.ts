import { getMatchedPath, usePathname, useRouter } from 'packages/neouter/src'
import { routes } from 'src/routes'

export const useTypedPathname: <T extends keyof typeof routes>(
  path: T
) => ReturnType<typeof usePathname<T>> = (path) => {
  const pathName = usePathname()
  const [location] = useRouter()
  if (getMatchedPath(routes, location) !== path) {
    throw new Error('Path does not match')
  }
  return pathName
}
