import { useContext, useEffect } from 'react'
import { RouterContext } from '../context'

type Props = {
  children: string
}

export const Title = ({ children }: Props) => {
  const { initialTitle } = useContext(RouterContext)
  useEffect(() => {
    document.title = children
    return () => {
      document.title = initialTitle
    }
  }, [children, initialTitle])
  return null
}
