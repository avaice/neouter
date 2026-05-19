import { Loader2 } from 'lucide-react'

export const FullHeightLoading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="size-[48px] animate-spin text-gray-600" />
    </div>
  )
}
