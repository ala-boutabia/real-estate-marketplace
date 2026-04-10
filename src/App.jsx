import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home /> } />
      <Route path='/register' element={<Register /> } />
      <Route path='/login' element={<Login /> } />
      <Route path='/about' element={<About /> } />
      <Route path='/profile' element={<Profile /> } />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App