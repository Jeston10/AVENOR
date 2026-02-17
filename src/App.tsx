import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AppLoader from './components/AppLoader'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import CaseStudies from './pages/CaseStudies'
import FAQ from './pages/FAQ'

function App() {
  return (
    <AppLoader>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Layout>
    </AppLoader>
  )
}

export default App
