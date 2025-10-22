import { getMedia } from "@/lib/data"
import MediaManager from "@/components/admin/MediaManager"

export default async function MediaPage() {
  const media = await getMedia()

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Media</h1>
        <p className='text-gray-600'>
          Upload and manage your photos and images
        </p>
      </div>

      <MediaManager media={media} />
    </div>
  )
}

