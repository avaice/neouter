/** biome-ignore-all lint/correctness/useUniqueElementIds: hash routing */
import { Link } from 'neouter'
import { Layout } from '../../components/Layout'
import DogAsset from './dog.jpg'

export const Heavy = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-4xl">Animal World</h1>
        <p>An example of a heavy page(2MB) & hash property demo</p>
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

        <nav className="flex flex-col gap-1 pt-6">
          <h2 className="text-2xl">Contents</h2>
          <Link href="#s1" className="text-blue-500 underline">
            Go to Section 1
          </Link>
          <Link href="#s2" className="text-blue-500 underline">
            Go to Section 2
          </Link>
          <Link href="#s3" className="text-blue-500 underline">
            Go to Section 3
          </Link>
        </nav>

        <div className="space-y-4 pt-6">
          <section className="space-y-2" id="s1">
            <h2 className="text-2xl">Section 1</h2>
            <p>This is the first section of the about page.</p>
            <p>
              I'll talk a little about the weather today. Outside the window,
              the clouds are drifting slowly, and nothing unusual is happening.
              As I drink coffee and look at the clock, I feel time passing
              quietly. The people passing by on the street are as usual, with no
              special news and the everyday routine continuing. That kind of
              ordinary calmness is strangely comforting.
            </p>
          </section>

          <section className="space-y-2" id="s2">
            <h2 className="text-2xl">Section 2</h2>
            <p>This is the second section of the about page.</p>
            <p>
              Next is a story about food. I had toast for breakfast, but it
              wasn't particularly impressive. The saltiness of the butter and
              the sweetness of the jam were in their usual balance, with no
              surprises or discoveries. For lunch, I chose a regular set meal at
              a nearby diner and finished it quietly without anything memorable
              happening. Peaceful meals are part of life.
            </p>
          </section>

          <section className="space-y-2" id="s3">
            <h2 className="text-2xl">Section 3</h2>
            <p>This is the last section of the about page.</p>
            <p>
              Finally, I'll talk about getting around. Commutes and shopping
              trips weren't especially crowded, and the train arrived and
              departed on time. I sat down, looked at my smartphone for a bit,
              and arrived at my destination. The announcements on the train were
              calm and matter-of-fact, and nothing in the surrounding
              conversations stood out. Arriving at my destination without
              incident is satisfying enough.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
