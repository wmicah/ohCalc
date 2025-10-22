"use client"

import { useState, useRef } from "react"
import { createMedia, updateMedia, deleteMedia } from "@/lib/actions"
import { Plus, Edit, Trash2, Upload } from "lucide-react"

interface Media {
  id: number
  url: string
  alt?: string
  kind?: string
  order: number
}

interface MediaManagerProps {
  media: Media[]
}

export default function MediaManager({ media }: MediaManagerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingMedia, setEditingMedia] = useState<Media | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ type: "success", text: "File uploaded successfully!" })
        // Auto-fill the form with the uploaded URL
        if (fileInputRef.current) {
          fileInputRef.current.value = result.url
        }
      } else {
        setMessage({ type: "error", text: result.error || "Upload failed" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Upload failed" })
    } finally {
      setIsUploading(false)
    }
  }

  async function handleCreate(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await createMedia(formData)
      if (result.success) {
        setMessage({ type: "success", text: "Media created successfully!" })
        setShowCreateForm(false)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to create media",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while creating media",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleUpdate(id: number, formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await updateMedia(id, formData)
      if (result.success) {
        setMessage({ type: "success", text: "Media updated successfully!" })
        setEditingMedia(null)
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to update media",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while updating media",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this media item?")) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await deleteMedia(id)
      if (result.success) {
        setMessage({ type: "success", text: "Media deleted successfully!" })
        window.location.reload()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to delete media",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while deleting media",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white shadow rounded-lg'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <h3 className='text-lg font-medium text-gray-900'>Media Library</h3>
          <button
            onClick={() => setShowCreateForm(true)}
            className='bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Media
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
              Add New Media
            </h4>

            {/* File Upload */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Upload Image
              </label>
              <div className='flex items-center space-x-4'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90'
                />
                {isUploading && (
                  <div className='flex items-center text-sm text-gray-500'>
                    <Upload className='h-4 w-4 mr-1 animate-spin' />
                    Uploading...
                  </div>
                )}
              </div>
            </div>

            <form
              action={handleCreate}
              className='space-y-4'
            >
              <div>
                <label
                  htmlFor='url'
                  className='block text-sm font-medium text-gray-700'
                >
                  Image URL
                </label>
                <input
                  ref={fileInputRef}
                  type='url'
                  id='url'
                  name='url'
                  className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='alt'
                  className='block text-sm font-medium text-gray-700'
                >
                  Alt Text (for accessibility)
                </label>
                <input
                  type='text'
                  id='alt'
                  name='alt'
                  placeholder='Describe the image for screen readers'
                  className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>
              <div>
                <label
                  htmlFor='kind'
                  className='block text-sm font-medium text-gray-700'
                >
                  Category (optional)
                </label>
                <select
                  id='kind'
                  name='kind'
                  className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                >
                  <option value=''>Select category</option>
                  <option value='interior'>Interior</option>
                  <option value='machines'>Machines</option>
                  <option value='exterior'>Exterior</option>
                  <option value='amenities'>Amenities</option>
                </select>
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
                  defaultValue={media.length}
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
                  {isSubmitting ? "Creating..." : "Create Media"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
          {media.map((item) => (
            <div
              key={item.id}
              className='bg-gray-50 rounded-lg overflow-hidden'
            >
              <img
                src={item.url}
                alt={item.alt || ""}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                {editingMedia?.id === item.id ? (
                  <form
                    action={(formData) => handleUpdate(item.id, formData)}
                    className='space-y-3'
                  >
                    <div>
                      <label
                        htmlFor={`alt-${item.id}`}
                        className='block text-sm font-medium text-gray-700'
                      >
                        Alt Text
                      </label>
                      <input
                        type='text'
                        id={`alt-${item.id}`}
                        name='alt'
                        defaultValue={item.alt || ""}
                        className='mt-1 block w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`kind-${item.id}`}
                        className='block text-sm font-medium text-gray-700'
                      >
                        Category
                      </label>
                      <select
                        id={`kind-${item.id}`}
                        name='kind'
                        defaultValue={item.kind || ""}
                        className='mt-1 block w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                      >
                        <option value=''>Select category</option>
                        <option value='interior'>Interior</option>
                        <option value='machines'>Machines</option>
                        <option value='exterior'>Exterior</option>
                        <option value='amenities'>Amenities</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor={`order-${item.id}`}
                        className='block text-sm font-medium text-gray-700'
                      >
                        Order
                      </label>
                      <input
                        type='number'
                        id={`order-${item.id}`}
                        name='order'
                        defaultValue={item.order}
                        className='mt-1 block w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                      />
                    </div>
                    <div className='flex justify-end space-x-2'>
                      <button
                        type='button'
                        onClick={() => setEditingMedia(null)}
                        className='px-3 py-1 text-xs text-gray-700 bg-gray-100 rounded hover:bg-gray-200'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50'
                      >
                        {isSubmitting ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className='text-sm text-gray-600'>
                      <p className='font-medium'>{item.alt || "No alt text"}</p>
                      <p className='text-xs text-gray-500 mt-1'>
                        {item.kind && `Category: ${item.kind}`}
                        {item.kind && <br />}
                        Order: {item.order}
                      </p>
                    </div>
                    <div className='flex justify-end space-x-2 mt-3'>
                      <button
                        onClick={() => setEditingMedia(item)}
                        className='p-1 text-gray-400 hover:text-gray-600'
                      >
                        <Edit className='h-4 w-4' />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isSubmitting}
                        className='p-1 text-gray-400 hover:text-red-600 disabled:opacity-50'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {media.length === 0 && (
          <div className='p-6 text-center text-gray-500'>
            No media found. Upload your first image to get started.
          </div>
        )}
      </div>
    </div>
  )
}

