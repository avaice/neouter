import type { Post } from './getUsersData'
import { getUsersData } from './getUsersData'

export const getPostData = async (
  postId: number
): Promise<Post | undefined> => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const users = await getUsersData()
  for (const user of users) {
    const post = user.posts.find((p) => p.id === postId)
    if (post) {
      return post
    }
  }
  return undefined
}
