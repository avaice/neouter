import type { ExtractParams } from '../types'

export const extractParams = <
  Path extends string,
  Params extends string = ExtractParams<Path>,
>(
  pathPattern: Path,
  actualPath: string
): Record<Params, string> => {
  const patternParts = pathPattern.split('/')
  const actualParts = actualPath.split('/')

  const result: Record<string, string> = {}

  patternParts.forEach((part, i) => {
    if (part.startsWith(':')) {
      const key = part.slice(1)
      const value = actualParts[i]
      if (!value) {
        throw new Error('value is nullish')
      }
      result[key] = value
    }
  })

  return result as Record<Params, string>
}
