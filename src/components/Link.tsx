import { type AssertPathType, BaseLink, type WithQueryAndHash } from 'neouter'
import type { ComponentProps } from 'react'
import type { routes } from 'src/routes'

export const Link = <T extends AssertPathType<keyof typeof routes>>(
  props: Omit<ComponentProps<typeof BaseLink>, 'href'> & {
    href: WithQueryAndHash<T>
  }
): ReturnType<typeof BaseLink> => BaseLink(props)
