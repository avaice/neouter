import type { Path, Routes } from '..'
import { getURLPattern } from './getURLPattern'
import { normalizePathname } from './normalizePathname'

export const getMatchedPath = (routes: Routes, path: string): Path | null => {
  const pathName = normalizePathname(path)
  if (!pathName) return null

  return (
    Object.keys(routes).find((routePath) =>
      getURLPattern(routePath).test({ pathname: pathName })
    ) ?? null
  )
}
