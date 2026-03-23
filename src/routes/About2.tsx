import { Title, usePathParams, useQueryParams } from 'neouter'

export const About2 = () => {
  const params = usePathParams('/about-2/:id')
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
