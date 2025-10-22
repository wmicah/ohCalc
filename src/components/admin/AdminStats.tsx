interface AdminStatsProps {
  data: {
    settings: any
    services: any[]
    amenities: any[]
    ozonePoints: any[]
    media: any[]
  }
}

export default function AdminStats({ data }: AdminStatsProps) {
  const stats = [
    {
      name: "Services",
      value: data.services.length,
      href: "/admin/services",
    },
    {
      name: "Amenities",
      value: data.amenities.length,
      href: "/admin/amenities",
    },
    {
      name: "Ozone Points",
      value: data.ozonePoints.length,
      href: "/admin/ozone",
    },
    {
      name: "Media Files",
      value: data.media.length,
      href: "/admin/media",
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      {stats.map((stat) => (
        <a
          key={stat.name}
          href={stat.href}
          className='bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow'
        >
          <div className='text-2xl font-bold text-gray-900'>{stat.value}</div>
          <div className='text-sm text-gray-500'>{stat.name}</div>
        </a>
      ))}
    </div>
  )
}

