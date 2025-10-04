import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import BusinessModel from './pages/BusinessModel'
import STLExplanation from './pages/STLExplanation'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/business-model" element={<BusinessModel />} />
          <Route path="/technology" element={<STLExplanation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
