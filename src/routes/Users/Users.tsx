import { Loader2 } from 'lucide-react'
import { Link } from 'neouter'
import { Suspense } from 'react'
import useSWR from 'swr'
import { Layout } from '../../components/Layout'
import { getUsersData } from '../../loaders/getUsersData'

const UsersList = () => {
  const { data: users } = useSWR('users', getUsersData, {
    suspense: true,
  })

  if (!users) {
    return <p className="text-red-500">Failed to load users</p>
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id}>
          <Link
            href={`/users/${user.id}`}
            className="block rounded border border-gray-300 p-3 transition hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-blue-600">{user.name}</h2>
              <span className="text-gray-500 text-sm">
                {user.posts.length} posts
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const Users = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <title>neouter friends</title>
        <h1 className="text-4xl">neouter friends</h1>
        <p>An example of path params routing</p>
        <Suspense
          fallback={
            <div className="grid h-[300px] place-items-center">
              <Loader2 className="size-[48px] animate-spin text-gray-600" />
            </div>
          }
        >
          <UsersList />
        </Suspense>
      </div>
    </Layout>
  )
}
