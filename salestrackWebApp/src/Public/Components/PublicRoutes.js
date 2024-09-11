import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Home'
import Login from './Auth/Login'
import RegisterEnquiry from './Auth/RegisterEnquiry'
import Contact from './Contact'
import About from './About'
import ChangePasswordModal from '../../Models/Common/ModelPopup'

function PublicRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/enquiry" element={<RegisterEnquiry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/changepassword" element={<ChangePasswordModal />} />

    </Routes>
  )
}

export default PublicRoutes
