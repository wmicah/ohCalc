import { getHomepageData } from "@/lib/data"
import AdminStats from "@/components/admin/AdminStats"

export default async function AdminDashboard() {
  const data = await getHomepageData()

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600'>
          Welcome to the Blue Wave Laundry admin panel
        </p>
      </div>

      <AdminStats data={data} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Quick Actions
          </h3>
          <div className='space-y-3'>
            <a
              href='/admin/settings'
              className='block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'
            >
              <div className='font-medium'>Update Site Settings</div>
              <div className='text-sm text-gray-500'>
                Business info, hours, contact details
              </div>
            </a>
            <a
              href='/admin/media'
              className='block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'
            >
              <div className='font-medium'>Upload Photos</div>
              <div className='text-sm text-gray-500'>
                Add new images to your gallery
              </div>
            </a>
            <a
              href='/admin/services'
              className='block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'
            >
              <div className='font-medium'>Manage Services</div>
              <div className='text-sm text-gray-500'>
                Add or edit your services
              </div>
            </a>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Recent Activity
          </h3>
          <div className='text-sm text-gray-500'>
            <p>No recent activity to display.</p>
            <p className='mt-2'>
              Start by updating your site settings or uploading photos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

