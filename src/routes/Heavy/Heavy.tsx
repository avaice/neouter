import { Link } from 'neouter'
import { Layout } from '../../components/Layout'
import DogAsset from './dog.jpg'

export const Heavy = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-4xl">Heavy Component</h1>
        <p>This component is heavy because it contains a large image.</p>
        <Link
          href="https://unsplash.com/photos/yellow-labrador-retriever-biting-yellow-tulip-flower-Sg3XwuEpybU"
          target="_blank"
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
