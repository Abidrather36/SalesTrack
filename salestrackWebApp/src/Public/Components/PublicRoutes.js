import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Home'
import Login from './Auth/Login'
import RegisterEnquiry from './Auth/RegisterEnquiry'
import Contact from './Contact'
import About from './About'

function PublicRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/enquiry" element={<RegisterEnquiry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default PublicRoutes
