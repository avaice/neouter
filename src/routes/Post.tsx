import { Loader2 } from 'lucide-react'
import { Link, usePathParams } from 'neouter'
import { Suspense } from 'react'
import useSWR from 'swr'
import { Layout } from '../components/Layout'
import { getPostData } from '../loaders/getPostData'
import { getUsersData } from '../loaders/getUsersData'

const PostContent = ({ postId }: { postId: number }) => {
  const { data: post } = useSWR(`post-${postId}`, () => getPostData(postId), {
    suspense: true,
  })
  const { data: users } = useSWR('users', getUsersData, {
    suspense: true,
  })

  if (!post || !users) {
    return <p className="text-red-500">Post not found</p>
  }

  const author = users.find((user) => user.posts.some((p) => p.id === postId))

  return (
    <div className="space-y-6">
      <article>
        <h1 className="mb-2 font-bold text-3xl">{post.title}</h1>
        {author && (
          <Link
            href={`/users/${author.id}`}
            className="text-blue-600 text-sm hover:underline"
          >
            by {author.name}
          </Link>
        )}
        <div className="mt-6 whitespace-pre-wrap text-gray-700">
          {post.content}
        </div>
      </article>
    </div>
  )
}

export const Post = () => {
  const params = usePathParams('/posts/:id')
  const postId = params ? Number(params.id) : undefined

  if (postId === undefined) {
    return (
      <Layout>
        <p className="text-red-500">Invalid post ID</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <title>Post</title>
        <Suspense
          fallback={
            <div className="grid h-[300px] place-items-center">
              <Loader2 className="size-[48px] animate-spin text-gray-600" />
            </div>
          }
        >
          <PostContent postId={postId} />
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-block text-blue-500 hover:underline"
          >
            ← Back
          </button>
        </Suspense>
      </div>
    </Layout>
  )
}
