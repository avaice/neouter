export const getAboutData = async (url: string) => {
  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch about data')
  }
  return res.text()
}
