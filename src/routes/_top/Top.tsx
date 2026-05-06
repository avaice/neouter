import { Link } from 'neouter'
import { AnimatedLogo } from './AnimatedLogo'

export const Top = () => {
  return (
    <div className="grid min-h-svh place-items-center">
      <div className="flex flex-col items-center gap-2">
        <AnimatedLogo />
        <p>A type-assisted & modern router for minimalists!!</p>
        <div className="flex gap-2 text-sm md:text-base">
          <Link
            href="/about?lang=en"
            className="mt-4 inline-block rounded-[20px] border border-gray-300 px-6 py-2 transition hover:bg-gray-50"
          >
            What is neouter?
          </Link>
          <Link
            href="https://github.com/avaice/neouter"
            className="mt-4 inline-flex rounded-[20px] border border-gray-300 bg-gray-800 px-6 py-2 text-white transition hover:bg-black"
            target="_blank"
          >
            <img
              src="/github.svg"
              alt="GitHub"
              className="mr-1 inline size-6"
            />
            GitHub
          </Link>
        </div>
        <Link href="/heavy" className="mt-4 text-blue-500 hover:underline">
          I love animals!
        </Link>
      </div>
    </div>
  )
}
