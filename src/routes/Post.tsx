import { Title, usePathParams, useRouter } from 'neouter'

import { useCallback } from 'react'

export const Post = () => {
  const [, setLocation] = useRouter()
  const params = usePathParams('/users/:userId/posts/:postId')
  const handleClickGoHome = useCallback(() => {
    setLocation('/')
  }, [setLocation])
  return (
    <div>
      <Title>Post</Title>
      <p>Post!</p>
      <p>User ID: {params?.userId}</p>
      <p>Post ID: {params?.postId}</p>
      <button type="button" onClick={handleClickGoHome}>
        Go Home
      </button>
    </div>
  )
}
