import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ScrollToTop from './ScrollToTop'

// Home ships in the main bundle; every other page (and its sliders, galleries and photo data)
// downloads only when it is opened, so the first visit has less JavaScript to fetch.
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const CategoryAlbumGrid = lazy(() => import('./components/gallery/CategoryAlbumGrid'))
const AlbumGallery = lazy(() => import('./components/gallery/AlbumGallery'))
const EshitaEllaPage = lazy(() => import('./pages/EshitaEllaPage'))
const AditiRevaPage = lazy(() => import('./pages/AditiRevaPage'))
const MeghaNeelanshPage = lazy(() => import('./pages/MeghaNeelanshPage'))


function App() {
  return (
    <>
      <Layout>
        <ScrollToTop />

        <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:categorySlug/albums" element={<CategoryAlbumGrid />} />
            <Route path="/category/:categorySlug/album/:albumSlug" element={<AlbumGallery />} />
            <Route path="/stories/styled-with-soul" element={<EshitaEllaPage />} />
            <Route path="/stories/love-woven-in-letters" element={<MeghaNeelanshPage />} />
            <Route path="/stories/quiet-joys" element={<AditiRevaPage />} />
          </Routes>
        </Suspense>

      </Layout>
    </>
  )
}

export default App
