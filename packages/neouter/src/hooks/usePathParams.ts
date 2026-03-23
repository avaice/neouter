import { useContext } from 'react'
import { RouterContext } from '../context'
import { extractParams, getMatchedPath } from '../libs'
import type { ParamsObject } from '../types'

export const usePathParams = <Path extends string>(
  path: Path
): ParamsObject<Path> | null => {
  const { location, routes } = useContext(RouterContext)

  const matchedPath = getMatchedPath(routes, location)
  if (!matchedPath) return null

  if (getMatchedPath(routes, location) !== path) {
    return null
  }

  return extractParams(matchedPath, location.split('?')[0] ?? location)
}
