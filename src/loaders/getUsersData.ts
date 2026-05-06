export interface Post {
  id: number
  title: string
  content: string
}

export interface User {
  id: number
  name: string
  posts: Post[]
}

export interface UsersData {
  users: User[]
}

export const getUsersData = async (): Promise<User[]> => {
  const res = await fetch('/users.json')
  if (!res.ok) {
    throw new Error('Failed to fetch users data')
  }
  const data: UsersData = await res.json()
  return data.users
}
