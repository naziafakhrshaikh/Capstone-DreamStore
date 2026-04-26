import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Admin from './pages/Admin'
import Dreams from './pages/Dreams'
import SuggestDream from './pages/SuggestDream'
import Collection from './pages/Collections'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Collections from './pages/Collections'

 const App = () => {
  return (
    <section className='app'>
      <Navbar />

        {/* Create your new routes in your application and place them below this comment */}
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dreams" element={<Dreams />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/suggest-dream" element={<SuggestDream />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      {/* Create your new routes in your application and place them above this comment */}

    <Footer />
    </section>
  )
}

export default App