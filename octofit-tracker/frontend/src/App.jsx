import { Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  return (
    <>
      <nav className="navbar border-bottom bg-white">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img src={octofitLogo} alt="" width="36" height="36" />
            <span>OctoFit Tracker</span>
          </a>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <main className="container py-5">
              <p className="text-uppercase small fw-semibold text-success mb-2">
                Team fitness
              </p>
              <h1 className="h2 fw-bold mb-2">Your activity dashboard</h1>
              <p className="text-secondary mb-0">
                OctoFit Tracker is ready to help your team move.
              </p>
            </main>
          }
        />
      </Routes>
    </>
  )
}

export default App
