import { getAmenities } from "@/lib/data"
import AmenitiesManager from "@/components/admin/AmenitiesManager"

export default async function AmenitiesPage() {
  const amenities = await getAmenities()

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Amenities</h1>
        <p className='text-gray-600'>
          Manage your facility amenities and features
        </p>
      </div>

      <AmenitiesManager amenities={amenities} />
    </div>
  )
}

