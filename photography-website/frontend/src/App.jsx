import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import CategoryAlbumGrid from './components/gallery/CategoryAlbumGrid'
import AlbumGallery from './components/gallery/AlbumGallery'
import EshitaEllaPage from './pages/EshitaEllaPage'
import AditiRevaPage from './pages/AditiRevaPage'
import MeghaNeelanshPage from './pages/MeghaNeelanshPage'
import ScrollToTop from './ScrollToTop'


function App() {
  return (
    <>
      <Layout>
        <ScrollToTop />

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

      </Layout>
    </>
  )
}

export default App
