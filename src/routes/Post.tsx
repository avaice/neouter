import { Title } from 'packages/neouter/src/components/Title'
import { useTypedPathname } from 'src/hooks/useTypedPathname'

export const Post = () => {
  const params = useTypedPathname('/users/:userId/posts/:postId')
  return (
    <div>
      <Title>Post</Title>
      <p>Post!</p>
      <p>User ID: {params?.userId}</p>
      <p>Post ID: {params?.postId}</p>
    </div>
  )
}
