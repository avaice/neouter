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

  const result: Record<string, string | undefined> = {}

  patternParts.forEach((part, i) => {
    if (part.startsWith(':')) {
      const key = part.slice(1)
      result[key] = actualParts[i]
    }
  })

  return result as Record<Params, string>
}
