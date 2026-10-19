import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { RepairProvider } from './context/RepairContext'
import { AdminPage } from './pages/AdminPage'
import { HomePage } from './pages/HomePage'
import { TrackPage } from './pages/TrackPage'

export default function App() {
  return (
    <RepairProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="track" element={<TrackPage />} />
        </Route>
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </RepairProvider>
  )
}
