import { Loader2 } from 'lucide-react'
import { useQueryParams } from 'neouter'
import { Suspense, useState } from 'react'
import useSWR from 'swr'
import { Layout } from '../../components/Layout'
import { getAboutData } from '../../loaders/getAboutData'

const Description = ({ lang }: { lang: string }) => {
  const { data } = useSWR(`/about-${lang}.txt`, getAboutData, {
    suspense: true,
  })
  if (lang !== 'en' && lang !== 'ja') {
    return <p className="text-red-500">Unsupported language</p>
  }
  return (
    <div>
      <p className="whitespace-pre">{data}</p>
    </div>
  )
}

export const About = () => {
  const { lang } = useQueryParams({ lang: 'string' })
  const [counter, setCounter] = useState(0)

  return (
    <Layout>
      <div className="space-y-6">
        <title>What is neouter?</title>
        <h1 className="text-4xl">What is neouter?</h1>
        <div className="flex gap-2">
          <button
            className={`inline-block rounded-[20px] border px-6 py-0.5 transition ${
              lang === 'en'
                ? 'border-gray-300 bg-gray-800 text-white hover:bg-black'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => history.replaceState(null, '', '?lang=en')}
            type="button"
          >
            English
          </button>
          <button
            className={`inline-block rounded-[20px] border px-6 py-0.5 transition ${
              lang === 'ja'
                ? 'border-gray-300 bg-gray-800 text-white hover:bg-black'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => history.replaceState(null, '', '?lang=ja')}
            type="button"
          >
            日本語
          </button>
        </div>
        <Suspense
          fallback={
            <div className="grid h-[300px] place-items-center">
              <Loader2 className="size-[48px] animate-spin text-gray-600" />
            </div>
          }
        >
          <Description lang={lang ?? 'en'} />
          <div>
            <button
              type="button"
              onClick={() => setCounter(counter + 1)}
              className="rounded border border-gray-300 px-4 py-1"
            >
              Understood ({counter})
            </button>
          </div>
        </Suspense>
      </div>
    </Layout>
  )
}
