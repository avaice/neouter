import { useTypedPathname } from 'src/hooks/useTypedPathname'

export const About2 = () => {
  const params = useTypedPathname('/about-2/:id')
  return (
    <div>
      <p>About2</p>
      {params?.id}
    </div>
  )
}
