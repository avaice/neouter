import { Title } from 'neouter'

export const Home = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Title>Home</Title>
      <img
        src="https://cataas.com/cat?width=300&height=300"
        alt="cat"
        width={300}
        height={300}
        className="shrink-0 bg-gray-200"
        loading="lazy"
      />
      <div>
        <p>The cat said:</p>
        <p className="rounded border p-1">
          neouter is a routing library for people who are obsessed with
          simplicity😄
        </p>
      </div>
    </div>
  )
}
