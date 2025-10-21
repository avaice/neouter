import { Link } from './Link'

export const Header = () => {
  return (
    <header>
      <h1 className="font-bold text-2xl">neouter!!</h1>
      <nav className="mt-1 flex gap-4">
        <Link className="text-blue-500 hover:underline" href="/">
          Home
        </Link>
        <Link className="text-blue-500 hover:underline" href="/about">
          About
        </Link>
        <Link className="text-blue-500 hover:underline" href="/lazy">
          Lazy
        </Link>
        <Link className="text-blue-500 hover:underline" href="/users/123">
          User
        </Link>
        <Link
          className="text-blue-500 hover:underline"
          href="/users/123/posts/456"
        >
          Post
        </Link>
      </nav>
    </header>
  )
}
