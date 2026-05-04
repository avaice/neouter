import type { ComponentType } from 'react'
import { lazy } from 'react'
import type { PreloadableComponent } from '..'

export function lazyImport<
  U extends string,
  T extends { [P in U]: ComponentType },
>(
  factory: () => Promise<T>,
  name: U
): { [P in U]: PreloadableComponent<T[U]> } {
  const lazyComponent: PreloadableComponent<T[U]> = lazy(() =>
    factory().then((module) => ({ default: module[name] }))
  )
  lazyComponent.preload = factory

  return Object.create({ [name]: lazyComponent })
}
