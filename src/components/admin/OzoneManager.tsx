"use client"

import { useState } from "react"
import {
  createOzonePoint,
  updateOzonePoint,
  deleteOzonePoint,
} from "@/lib/actions"
import { Plus, Edit, Trash2 } from "lucide-react"

interface OzonePoint {
  id: number
  text: string
  order: number
}

interface OzoneManagerProps {
  ozonePoints: OzonePoint[]
}

export default function OzoneManager({ ozonePoints }: OzoneManagerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPoint, setEditingPoint] = useState<OzonePoint | null>(null)

  async function handleCreate(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await createOzonePoint(formData)
      if (result.success) {
        setMessage({
          type: "success",
          text: "Ozone benefit created successfully!",
        })
        setShowCreateForm(false)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to create ozone benefit",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while creating ozone benefit",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUpdate(id: number, formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await updateOzonePoint(id, formData)
      if (result.success) {
        setMessage({
          type: "success",
          text: "Ozone benefit updated successfully!",
        })
        setEditingPoint(null)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update ozone benefit",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while updating ozone benefit",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this ozone benefit?")) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await deleteOzonePoint(id)
      if (result.success) {
        setMessage({
          type: "success",
          text: "Ozone benefit deleted successfully!",
        })
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to delete ozone benefit",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while deleting ozone benefit",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white shadow rounded-lg'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <h3 className='text-lg font-medium text-gray-900'>Ozone Benefits</h3>
          <button
            onClick={() => setShowCreateForm(true)}
            className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Benefit
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
              Create New Ozone Benefit
            </h4>
            <form
              action={handleCreate}
              className='space-y-4'
            >
              <div>
                <label
                  htmlFor='text'
                  className='block text-sm font-medium text-gray-700'
                >
                  Benefit Description
                </label>
                <input
                  type='text'
                  id='text'
                  name='text'
                  placeholder='e.g., Softer, brighter linens'
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
                  defaultValue={ozonePoints.length}
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
                  {isSubmitting ? "Creating..." : "Create Benefit"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='divide-y divide-gray-200'>
          {ozonePoints.map((point) => (
            <div
              key={point.id}
              className='p-6'
            >
              {editingPoint?.id === point.id ? (
                <form
                  action={(formData) => handleUpdate(point.id, formData)}
                  className='space-y-4'
                >
                  <div>
                    <label
                      htmlFor={`text-${point.id}`}
                      className='block text-sm font-medium text-gray-700'
                    >
                      Benefit Description
                    </label>
                    <input
                      type='text'
                      id={`text-${point.id}`}
                      name='text'
                      defaultValue={point.text}
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`order-${point.id}`}
                      className='block text-sm font-medium text-gray-700'
                    >
                      Order
                    </label>
                    <input
                      type='number'
                      id={`order-${point.id}`}
                      name='order'
                      defaultValue={point.order}
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>
                  <div className='flex justify-end space-x-3'>
                    <button
                      type='button'
                      onClick={() => setEditingPoint(null)}
                      className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50'
                    >
                      {isSubmitting ? "Updating..." : "Update Benefit"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-lg text-gray-900'>{point.text}</p>
                    <p className='text-sm text-gray-500 mt-1'>
                      Order: {point.order}
                    </p>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => setEditingPoint(point)}
                      className='p-2 text-gray-400 hover:text-gray-600'
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(point.id)}
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

        {ozonePoints.length === 0 && (
          <div className='p-6 text-center text-gray-500'>
            No ozone benefits found. Create your first benefit to get started.
          </div>
        )}
      </div>
    </div>
  )
}

