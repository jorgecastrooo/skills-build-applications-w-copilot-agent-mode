import CollectionView from './CollectionView.jsx'

const columns = [
  { label: 'Workout', render: (workout) => <span className="fw-semibold">{workout.title}</span> },
  { label: 'Description', render: (workout) => workout.description || '—' },
  { label: 'Activity', render: (workout) => workout.activityType || 'Other' },
  { label: 'Duration', render: (workout) => `${workout.durationMinutes ?? 0} min` },
  { label: 'Intensity', render: (workout) => workout.intensity || '—' },
]

export default function Workouts() {
  return (
    <CollectionView
      title="Workouts"
      description="Ideas for the next session, at a range of effort levels."
      resource="workouts"
      columns={columns}
    />
  )
}