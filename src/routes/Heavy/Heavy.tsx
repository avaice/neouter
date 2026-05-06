import { Link } from 'neouter'
import { Layout } from '../../components/Layout'
import DogAsset from './dog.jpg'

export const Heavy = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-4xl">Animal World</h1>
        <p>An example of a heavy page(2MB)</p>
        <p>This component is heavy because it contains a large image.</p>
        <Link
          href="https://unsplash.com/photos/yellow-labrador-retriever-biting-yellow-tulip-flower-Sg3XwuEpybU"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={DogAsset}
            alt="yellow Labrador retriever biting yellow tulip flower"
            className="h-[500px]"
          />
        </Link>
      </div>
    </Layout>
  )
}
