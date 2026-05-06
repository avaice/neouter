import { Suspense, use } from 'react'

const greet = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve('Hello, world!')
  }, 1000)
})

const Greeting = () => {
  const greeting = use(greet)
  return <p>{greeting}</p>
}

export const Lazy = () => {
  return (
    <div>
      <title>Lazy</title>
      Lazy
      <Suspense fallback={<p>Loading...</p>}>
        <Greeting />
      </Suspense>
    </div>
  )
}
