import type { ExtractParams } from '../types'
import { getURLPattern } from './getURLPattern'
import { normalizePathname } from './normalizePathname'

export const extractParams = <
  Path extends string,
  Params extends string = ExtractParams<Path>,
>(
  pathPattern: Path,
  actualPath: string
): Record<Params, string> => {
  const pathName = normalizePathname(actualPath)
  const matched = pathName
    ? getURLPattern(pathPattern).exec({ pathname: pathName })
    : null
  if (!matched) {
    throw new Error('value is nullish')
  }

  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(matched.pathname.groups)) {
    if (!value) {
      throw new Error('value is nullish')
    }
    result[key] = value
  }

  return result
}
