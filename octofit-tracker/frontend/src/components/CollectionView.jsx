import useCollection from '../useCollection.js'

export default function CollectionView({ title, description, resource, columns }) {
  const { items, loading, error } = useCollection(resource)

  return (
    <main className="container py-4 py-lg-5">
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
        <div>
          <p className="text-uppercase small fw-semibold text-success mb-2">OctoFit Tracker</p>
          <h1 className="h2 fw-bold mb-2">{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        {!loading && !error && <span className="badge text-bg-light border">{items.length} records</span>}
      </div>

      {loading && <p role="status" className="text-secondary">Loading {title.toLowerCase()}...</p>}
      {error && <div className="alert alert-danger" role="alert">Could not load {title.toLowerCase()}: {error}</div>}
      {!loading && !error && items.length === 0 && (
        <p className="text-secondary py-4 border-top">No {title.toLowerCase()} found.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive border-top">
          <table className="table table-hover align-middle mb-0">
            <caption className="visually-hidden">{title}</caption>
            <thead>
              <tr>
                {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? `${resource}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render(item, index)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}