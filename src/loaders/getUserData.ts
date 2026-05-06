import type { User } from './getUsersData'
import { getUsersData } from './getUsersData'

export const getUserData = async (
  userId: number
): Promise<User | undefined> => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const users = await getUsersData()
  return users.find((user) => user.id === userId)
}
