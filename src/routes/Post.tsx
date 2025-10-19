import { usePathname } from 'packages/neouter/src'

export const Post = () => {
  const params = usePathname<'/users/:userId/posts/:postId'>()
  return (
    <div>
      <p>Post!</p>
      <p>User ID: {params?.userId}</p>
      <p>Post ID: {params?.postId}</p>
    </div>
  )
}
