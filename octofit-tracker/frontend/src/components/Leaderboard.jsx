import CollectionView from './CollectionView.jsx'

function displayUser(user) {
  if (user && typeof user === 'object') return user.displayName || user.username || 'Unknown user'
  return user || 'Unknown user'
}

const columns = [
  { label: 'Rank', render: (_entry, index) => <span className="fw-semibold">#{index + 1}</span> },
  { label: 'Member', render: (entry) => displayUser(entry.user) },
  { label: 'Points', render: (entry) => <span className="fw-semibold">{entry.points ?? 0}</span> },
]

export default function Leaderboard() {
  return (
    <CollectionView
      title="Leaderboard"
      description="See how members are progressing through activity points."
      endpoint="/api/leaderboard/"
      columns={columns}
    />
  )
}