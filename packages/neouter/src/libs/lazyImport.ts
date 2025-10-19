import type { ComponentType } from 'react'
import { lazy } from 'react'

export function lazyImport<U extends string, T extends { [P in U]: ComponentType }>(
  factory: () => Promise<T>,
  name: U
): T {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  })
}
