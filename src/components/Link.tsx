import {
  type AssertPathType,
  BaseLink,
  type WithQueryAndHash,
} from 'packages/neouter/src'
import type { ComponentProps } from 'react'
import type { routes } from 'src/routes'

export const Link = <T extends AssertPathType<keyof typeof routes>>(
  props: ComponentProps<typeof BaseLink> & {
    href: WithQueryAndHash<T>
  }
): ReturnType<typeof BaseLink> => BaseLink(props)
