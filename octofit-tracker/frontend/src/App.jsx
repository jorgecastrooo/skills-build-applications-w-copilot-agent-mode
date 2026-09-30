import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Users', to: '/users' },
  { label: 'Teams', to: '/teams' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return (
    <div className="min-vh-100">
      <header className="bg-white border-bottom">
        <div className="container py-3 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <Link className="navbar-brand d-flex align-items-center gap-2 m-0" to="/users">
            <img src={octofitLogo} alt="" width="36" height="36" />
            <span>OctoFit Tracker</span>
          </Link>
          <nav aria-label="Main navigation" className="nav nav-pills flex-wrap gap-1">
            {navigation.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link py-2 ${isActive ? 'active' : 'text-body-secondary'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </div>
  )
}

export default App
