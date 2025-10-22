import { getServices } from "@/lib/data"
import ServicesManager from "@/components/admin/ServicesManager"

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Services</h1>
        <p className='text-gray-600'>
          Manage your laundry services and features
        </p>
      </div>

      <ServicesManager services={services} />
    </div>
  )
}

