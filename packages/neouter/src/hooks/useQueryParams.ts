import { useMemo } from 'react'
import { type QueryParamsValueType, useRouter } from '../'

type Options = {
  noThrowError?: boolean
}

export const useQueryParams = <T extends Record<string, QueryParamsValueType>>(
  expectedTypes: T,
  options?: Options
) => {
  const [location] = useRouter()
  const urlObject = useMemo(
    () => new URL(location, window.location.origin),
    [location]
  )

  const queryParams = useMemo<
    Partial<{ [K in keyof T]: T[K] extends 'number' ? number : string }>
  >(() => {
    const result = {} as Partial<{
      [K in keyof T]: T[K] extends 'number' ? number : string
    }>

    for (const [key, value] of urlObject.searchParams.entries()) {
      if (!(key in expectedTypes)) continue

      if (expectedTypes[key as keyof T] === 'number') {
        const parsed = Number(value)
        if (!options?.noThrowError && Number.isNaN(parsed)) {
          throw new Error(`Invalid number value for key ${key}`)
        }
        ;(result as Record<string, unknown>)[key] = parsed
      } else {
        ;(result as Record<string, unknown>)[key] = value
      }
    }

    return result
  }, [urlObject, expectedTypes, options?.noThrowError])

  return queryParams
}
