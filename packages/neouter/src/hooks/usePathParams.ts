import { useContext } from 'react'
import { RouterContext } from '../context'
import type { ParamsObject, PathPattern } from '../types'
import { extractParams, getMatchedPath } from '../utils'

export const usePathParams = <T extends PathPattern>(
  path: T
): ParamsObject<T> | null => {
  const { location, routes } = useContext(RouterContext)

  const matchedPath = getMatchedPath(routes, location)
  if (!matchedPath) return null

  if (getMatchedPath(routes, location) !== path) {
    return null
  }

  return extractParams(matchedPath, location.split('?')[0] ?? location)
}
