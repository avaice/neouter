import { Loader2 } from 'lucide-react'
import { Link, usePathParams } from 'neouter'
import { Suspense } from 'react'
import useSWR from 'swr'
import { Layout } from '../components/Layout'
import { getUserData } from '../loaders/getUserData'

const UserContent = ({ userId }: { userId: number }) => {
  const { data: user } = useSWR(`user-${userId}`, () => getUserData(userId), {
    suspense: true,
  })

  if (!user) {
    return <p className="text-red-500">User not found</p>
  }

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">{user.name}</h1>
      <div>
        <h2 className="mb-3 font-semibold text-xl">
          Posts ({user.posts.length})
        </h2>
        {user.posts.length === 0 ? (
          <p className="text-gray-500">No posts yet</p>
        ) : (
          <ul className="space-y-2">
            {user.posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/users/${userId}/posts/${post.id}`}
                  className="block rounded border border-gray-300 p-3 transition hover:bg-gray-50"
                >
                  <h3 className="font-semibold text-blue-600">{post.title}</h3>
                  <p className="line-clamp-2 text-gray-600 text-sm">
                    {post.content}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export const User = () => {
  const params = usePathParams('/users/:id')
  const userId = params ? Number(params.id) : undefined
  if (userId === undefined) {
    return (
      <Layout>
        <p className="text-red-500">Invalid user ID</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <title>User</title>
        <Suspense
          fallback={
            <div className="grid h-[300px] place-items-center">
              <Loader2 className="size-[48px] animate-spin text-gray-600" />
            </div>
          }
        >
          <UserContent userId={userId} />
          <div>
            <Link
              href="/users"
              className="inline-block text-blue-500 hover:underline"
            >
              ← Back to Users
            </Link>
            <Link
              href={`/users/${Math.floor(Math.random() * 30) + 1}`}
              className="ml-4 inline-block text-blue-500 hover:underline"
            >
              See other users →
            </Link>
          </div>
        </Suspense>
      </div>
    </Layout>
  )
}
