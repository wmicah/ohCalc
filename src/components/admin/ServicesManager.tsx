"use client"

import { useState } from "react"
import { createService, updateService, deleteService } from "@/lib/actions"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Service {
  id: number
  title: string
  blurb: string
  order: number
}

interface ServicesManagerProps {
  services: Service[]
}

export default function ServicesManager({ services }: ServicesManagerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  async function handleCreate(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await createService(formData)
      if (result.success) {
        setMessage({ type: "success", text: "Service created successfully!" })
        setShowCreateForm(false)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to create service",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while creating service",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUpdate(id: number, formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await updateService(id, formData)
      if (result.success) {
        setMessage({ type: "success", text: "Service updated successfully!" })
        setEditingService(null)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update service",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while updating service",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this service?")) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await deleteService(id)
      if (result.success) {
        setMessage({ type: "success", text: "Service deleted successfully!" })
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to delete service",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while deleting service",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white shadow rounded-lg'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <h3 className='text-lg font-medium text-gray-900'>Services</h3>
          <button
            onClick={() => setShowCreateForm(true)}
            className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Service
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
              Create New Service
            </h4>
            <form
              action={handleCreate}
              className='space-y-4'
            >
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='blurb'
                  className='block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                <textarea
                  id='blurb'
                  name='blurb'
                  rows={3}
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
                  defaultValue={services.length}
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
                  {isSubmitting ? "Creating..." : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='divide-y divide-gray-200'>
          {services.map((service) => (
            <div
              key={service.id}
              className='p-6'
            >
              {editingService?.id === service.id ? (
                <form
                  action={(formData) => handleUpdate(service.id, formData)}
                  className='space-y-4'
                >
                  <div>
                    <label
                      htmlFor={`title-${service.id}`}
                      className='block text-sm font-medium text-gray-700'
                    >
                      Title
                    </label>
                    <input
                      type='text'
                      id={`title-${service.id}`}
                      name='title'
                      defaultValue={service.title}
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`blurb-${service.id}`}
                      className='block text-sm font-medium text-gray-700'
                    >
                      Description
                    </label>
                    <textarea
                      id={`blurb-${service.id}`}
                      name='blurb'
                      rows={3}
                      defaultValue={service.blurb}
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`order-${service.id}`}
                      className='block text-sm font-medium text-gray-700'
                    >
                      Order
                    </label>
                    <input
                      type='number'
                      id={`order-${service.id}`}
                      name='order'
                      defaultValue={service.order}
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>
                  <div className='flex justify-end space-x-3'>
                    <button
                      type='button'
                      onClick={() => setEditingService(null)}
                      className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50'
                    >
                      {isSubmitting ? "Updating..." : "Update Service"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='text-lg font-medium text-gray-900'>
                      {service.title}
                    </h4>
                    <p className='text-gray-600 mt-1'>{service.blurb}</p>
                    <p className='text-sm text-gray-500 mt-2'>
                      Order: {service.order}
                    </p>
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => setEditingService(service)}
                      className='p-2 text-gray-400 hover:text-gray-600'
                    >
                      <Edit className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
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

        {services.length === 0 && (
          <div className='p-6 text-center text-gray-500'>
            No services found. Create your first service to get started.
          </div>
        )}
      </div>
    </div>
  )
}

