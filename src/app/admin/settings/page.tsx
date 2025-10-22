import { getSiteSettings } from "@/lib/data"
import SiteSettingsForm from "@/components/admin/SiteSettingsForm"

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Site Settings</h1>
        <p className='text-gray-600'>
          Update your business information and contact details
        </p>
      </div>

      <SiteSettingsForm settings={settings} />
    </div>
  )
}

