import { useContext } from 'react'
import { RouterContext } from '../context'
import { extractParams, getMatchedPath } from '../libs'
import type { ParamsObject } from '../types'

export const usePathname = <
  Path extends string,
>(): ParamsObject<Path> | null => {
  const { location, routes } = useContext(RouterContext)
  const matchedPath = getMatchedPath(routes, location)
  if (!matchedPath) return null
  return extractParams(matchedPath, location)
}
