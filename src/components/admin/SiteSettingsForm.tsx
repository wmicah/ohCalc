"use client"

import { useState } from "react"
import { updateSiteSettings } from "@/lib/actions"

interface SiteSettingsFormProps {
  settings: any
}

export default function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await updateSiteSettings(formData)
      if (result.success) {
        setMessage({ type: "success", text: "Settings updated successfully!" })
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update settings",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while updating settings",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-white shadow rounded-lg'>
      <div className='px-6 py-4 border-b border-gray-200'>
        <h3 className='text-lg font-medium text-gray-900'>
          Business Information
        </h3>
      </div>

      <form
        action={handleSubmit}
        className='p-6 space-y-6'
      >
        {message && (
          <div
            className={`p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Business Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              defaultValue={settings?.name || ""}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              required
            />
          </div>

          <div>
            <label
              htmlFor='tagline'
              className='block text-sm font-medium text-gray-700'
            >
              Tagline
            </label>
            <input
              type='text'
              id='tagline'
              name='tagline'
              defaultValue={settings?.tagline || ""}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
          </div>

          <div>
            <label
              htmlFor='hours'
              className='block text-sm font-medium text-gray-700'
            >
              Hours
            </label>
            <input
              type='text'
              id='hours'
              name='hours'
              defaultValue={settings?.hours || ""}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              required
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              defaultValue={settings?.email || ""}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              required
            />
          </div>

          <div>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700'
            >
              Phone (optional)
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              defaultValue={settings?.phone || ""}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
          </div>

          <div>
            <label
              htmlFor='zip'
              className='block text-sm font-medium text-gray-700'
            >
              ZIP Code (optional)
            </label>
            <input
              type='text'
              id='zip'
              name='zip'
              defaultValue={settings?.zip || ""}
              className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700'
          >
            Address
          </label>
          <input
            type='text'
            id='address'
            name='address'
            defaultValue={settings?.address || ""}
            className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            required
          />
        </div>

        <div className='flex items-center'>
          <input
            type='checkbox'
            id='ebt'
            name='ebt'
            defaultChecked={settings?.ebt || false}
            className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
          />
          <label
            htmlFor='ebt'
            className='ml-2 block text-sm text-gray-700'
          >
            EBT payments accepted
          </label>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  )
}

