import { getOzonePoints } from "@/lib/data"
import OzoneManager from "@/components/admin/OzoneManager"

export default async function OzonePage() {
  const ozonePoints = await getOzonePoints()

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Ozone Benefits</h1>
        <p className='text-gray-600'>
          Manage the benefits of ozone sanitation for your customers
        </p>
      </div>

      <OzoneManager ozonePoints={ozonePoints} />
    </div>
  )
}

