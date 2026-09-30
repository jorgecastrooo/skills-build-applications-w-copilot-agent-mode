import CollectionView from './CollectionView.jsx'

const columns = [
  { label: 'Team', render: (team) => <span className="fw-semibold">{team.name}</span> },
  { label: 'About', render: (team) => team.description || '—' },
  { label: 'Members', render: (team) => Array.isArray(team.members) ? team.members.length : 0 },
  { label: 'Points', render: (team) => team.points ?? 0 },
]

export default function Teams() {
  return (
    <CollectionView
      title="Teams"
      description="The groups bringing consistency and a little friendly competition."
      endpoint="/api/teams/"
      columns={columns}
    />
  )
}