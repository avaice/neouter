import { Link } from 'neouter'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[600px] space-y-4 px-4 py-6">
      <header>
        <Link className="logo font-bold text-3xl" href="/index.html">
          NEOUTER
        </Link>
      </header>
      <main>{children}</main>
    </div>
  )
}
