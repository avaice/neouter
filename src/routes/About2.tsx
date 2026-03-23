import { useQueryParams } from 'packages/neouter/src'
import { Title } from 'packages/neouter/src/components/Title'
import { useTypedPathname } from 'src/hooks/useTypedPathname'

export const About2 = () => {
  const params = useTypedPathname('/about-2/:id')
  const queryParams = useQueryParams({ id: 'number', name: 'string' })
  return (
    <div>
      <Title>About2</Title>
      <p>About2</p>
      {params?.id}
      {queryParams?.name}
      {queryParams?.id}
    </div>
  )
}
