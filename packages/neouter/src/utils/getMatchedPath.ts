import type { Path, Routes } from '..'
import { getURLPattern } from './getURLPattern'
import { normalizePathname } from './normalizePathname'

/**
 * Encodes each segment as a digit (static: 2, param: 1, wildcard: 0), so that
 * patterns can be compared as plain strings: the leftmost differing segment
 * decides, and a longer pattern wins when every shared segment ties.
 * e.g. '/user/:section' -> '221', '/:group/settings' -> '212'
 */
const specificity = (routePath: string): string =>
  routePath
    .split('/')
    .map((segment) =>
      segment.includes('*') ? '0' : segment.includes(':') ? '1' : '2'
    )
    .join('')

/** Sorts the more specific pattern first, keeping declaration order on ties. */
const bySpecificity = (a: string, b: string): number => {
  const rankA = specificity(a)
  const rankB = specificity(b)
  return rankA === rankB ? 0 : rankA < rankB ? 1 : -1
}

export const getMatchedPath = (routes: Routes, path: string): Path | null => {
  const pathName = normalizePathname(path)
  if (!pathName) return null

  return (
    Object.keys(routes)
      .filter((routePath) =>
        getURLPattern(routePath).test({ pathname: pathName })
      )
      .sort(bySpecificity)[0] ?? null
  )
}
