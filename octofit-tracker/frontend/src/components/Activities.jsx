import CollectionView from './CollectionView.jsx'

function displayUser(user) {
  if (user && typeof user === 'object') return user.displayName || user.username || 'Unknown user'
  return user || 'Unknown user'
}

function displayDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}

const columns = [
  { label: 'Member', render: (activity) => displayUser(activity.user) },
  { label: 'Activity', render: (activity) => activity.activityType || 'Other' },
  { label: 'Duration', render: (activity) => `${activity.durationMinutes ?? 0} min` },
  { label: 'Distance', render: (activity) => activity.distanceKm == null ? '—' : `${activity.distanceKm} km` },
  { label: 'Points', render: (activity) => activity.points ?? 0 },
  { label: 'Completed', render: (activity) => displayDate(activity.completedAt) },
]

export default function Activities() {
  return (
    <CollectionView
      title="Activities"
      description="Recent movement logged by your community."
      endpoint="/api/activities/"
      columns={columns}
    />
  )
}