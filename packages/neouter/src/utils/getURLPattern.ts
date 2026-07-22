const patternCache = new Map<string, URLPattern>()

export const getURLPattern = (pathPattern: string): URLPattern => {
  let pattern = patternCache.get(pathPattern)
  if (!pattern) {
    pattern = new URLPattern({ pathname: pathPattern })
    patternCache.set(pathPattern, pattern)
  }
  return pattern
}
