
import LandingPage from './components/Landing'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Explore from './pages/Explore'
import Eligible from './pages/Eligible'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/chat' element={<Chat />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/eligibility" element={<Eligible/>} />
        {/* Add more routes here as needed */}
      </Routes>
      
    </div>
  )
}

export default App
