import { useQueryParams } from 'packages/neouter/src'
import { useTypedPathname } from 'src/hooks/useTypedPathname'

export const About2 = () => {
  const params = useTypedPathname('/about-2/:id')
  const queryParams = useQueryParams({ id: 'number', name: 'string' })
  console.log(queryParams)
  return (
    <div>
      <p>About2</p>
      {params?.id}
      {queryParams?.name}
      {queryParams?.id}
    </div>
  )
}
