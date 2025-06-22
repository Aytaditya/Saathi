
import LandingPage from './components/Landing'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        {/* Add more routes here as needed */}
      </Routes>
      
    </div>
  )
}

export default App
