export const normalizePathname = (path: string): string | null => {
  let pathName = path.split('?')[0]
  if (!pathName) return null
  if (pathName.length > 1 && pathName.endsWith('/')) {
    pathName = pathName.slice(0, -1)
  }
  return pathName
}
