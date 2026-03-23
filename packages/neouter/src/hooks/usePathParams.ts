import { useContext } from 'react'
import { RouterContext } from '../context'
import { extractParams, getMatchedPath } from '../libs'
import type { ParamsObject, PathPattern } from '../types'

export const usePathParams = (
  path: PathPattern
): ParamsObject<PathPattern> | null => {
  const { location, routes } = useContext(RouterContext)

  const matchedPath = getMatchedPath(routes, location)
  if (!matchedPath) return null

  if (getMatchedPath(routes, location) !== path) {
    return null
  }

  return extractParams(matchedPath, location.split('?')[0] ?? location)
}
