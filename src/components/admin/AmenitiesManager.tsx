"use client"

import { useState } from "react"
import { createAmenity, updateAmenity, deleteAmenity } from "@/lib/actions"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Amenity {
  id: number
  label: string
  order: number
}

interface AmenitiesManagerProps {
  amenities: Amenity[]
}

export default function AmenitiesManager({ amenities }: AmenitiesManagerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null)

  async function handleCreate(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await createAmenity(formData)
      if (result.success) {
        setMessage({ type: "success", text: "Amenity created successfully!" })
        setShowCreateForm(false)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to create amenity",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while creating amenity",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUpdate(id: number, formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await updateAmenity(id, formData)
      if (result.success) {
        setMessage({ type: "success", text: "Amenity updated successfully!" })
        setEditingAmenity(null)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update amenity",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while updating amenity",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this amenity?")) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await deleteAmenity(id)
      if (result.success) {
        setMessage({ type: "success", text: "Amenity deleted successfully!" })
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to delete amenity",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while deleting amenity",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white shadow rounded-lg'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <h3 className='text-lg font-medium text-gray-900'>Amenities</h3>
          <button
            onClick={() => setShowCreateForm(true)}
            className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Amenity
          </button>
        </div>

        {message && (
          <div
            className={`mx-6 mt-4 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {showCreateForm && (
          <div className='p-6 border-b border-gray-200'>
            <h4 className='text-md font-medium text-gray-900 mb-4'>
              Create New Amenity
            </h4>
            <form
              action={handleCreate}
              className='space-y-4'
            >
              <div>
                <label
                  htmlFor='label'
                  className='block text-sm font-medium text-gray-700'
                >
                  Label
                </label>
                <input
                  type='text'
                  id='label'
                  name='label'
                  placeholder='e.g., Free Wi-Fi, Plenty of Parking'
                  className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='order'
                  className='block text-sm font-medium text-gray-700'
                >
                  Order
                </label>
                <input
                  type='number'
                  id='order'
                  name='order'
                  defaultValue={amenities.length}
                  className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setShowCreateForm(false)}
                  className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50'
                >
                  {isSubmitting ? "Creating..." : "Create Amenity"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='divide-y divide-gray-200'>
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className='p-6'
            >
              {editingAmenity?.id === amenity.id ? (
                <form
                  action={(formData) => handleUpdate(amenity.id, formData)}
                  className='space-y-4'
                >
                  <div>
                    <label
                      htmlFor={`label-${amenity.id}`}
                      className='block text-sm font-medium text-gray-700'
                    >
                      Label
                    </label>
                    <input
                      type='text'
                      id={`label-${amenity.id}`}
                      name='label'
                      defaultValue={amenity.label}
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`order-${amenity.id}`}
                      className='block text-sm font-medium text-gray-700'
                    >
                      Order
                    </label>
                    <input
                      type='number'
                      id={`order-${amenity.id}`}
                      name='order'
                      defaultValue={amenity.order}
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>
                  <div className='flex justify-end space-x-3'>
                    <button
                      type='button'
                      onClick={() => setEditingAmenity(null)}
                      className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50'
                    >
                      {isSubmitting ? "Updating..." : "Update Amenity"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='text-lg font-medium text-gray-900'>
                      {amenity.label}
                    </h4>
                    <p className='text-sm text-gray-500 mt-1'>
                      Order: {amenity.order}
                    </p>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => setEditingAmenity(amenity)}
                      className='p-2 text-gray-400 hover:text-gray-600'
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(amenity.id)}
                      disabled={isSubmitting}
                      className='p-2 text-gray-400 hover:text-red-600 disabled:opacity-50'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {amenities.length === 0 && (
          <div className='p-6 text-center text-gray-500'>
            No amenities found. Create your first amenity to get started.
          </div>
        )}
      </div>
    </div>
  )
}

