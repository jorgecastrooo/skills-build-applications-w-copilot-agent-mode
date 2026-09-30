import CollectionView from './CollectionView.jsx'

function displayTeam(team) {
  if (team && typeof team === 'object') return team.name || 'Assigned team'
  return team || 'Unassigned'
}

const columns = [
  { label: 'Member', render: (user) => <span className="fw-semibold">{user.displayName || user.username}</span> },
  { label: 'Username', render: (user) => user.username || '—' },
  { label: 'Email', render: (user) => user.email || '—' },
  { label: 'Team', render: (user) => displayTeam(user.team) },
]

export default function Users() {
  return (
    <CollectionView
      title="Members"
      description="People taking part in the OctoFit community."
      resource="users"
      columns={columns}
    />
  )
}