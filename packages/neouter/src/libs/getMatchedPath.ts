import type { Path, Routes } from '../'

const matchPath = (routes: Routes, path: string) => {
  const paths = Object.keys(routes)

  const regexes = paths.map(
    (path) => new RegExp(`^${path.replace(/:(\w+)/g, '(\\w+)')}$`)
  )

  const matchedPath = regexes.findIndex((regex) => regex.test(path))
  if (matchedPath === -1) return null

  return paths[matchedPath] ?? null
}

export const getMatchedPath = (routes: Routes, path: string): Path | null => {
  let pathName = path.split('?')[0]
  if (!pathName) return null
  if (pathName.length > 1 && pathName.endsWith('/')) {
    pathName = pathName.slice(0, -1)
  }
  return matchPath(routes, pathName)
}
