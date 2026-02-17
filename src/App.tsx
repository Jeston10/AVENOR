import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AppLoader from './components/AppLoader'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import { ToastProvider, useToast } from './context/ToastContext'
import { MusicProvider } from './context/MusicContext'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import CaseStudies from './pages/CaseStudies'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'

function AppContent() {
  const addToast = useToast()
  return (
    <ErrorBoundary onError={() => addToast('Something went wrong. Please refresh the page.', 'error')}>
      <ScrollToTop />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AppLoader>
    </ErrorBoundary>
  )
}

function App() {
  return (
    <ToastProvider>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </ToastProvider>
  )
}

export default App
