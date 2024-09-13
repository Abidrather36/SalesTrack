import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ChangePasswordModal from '../../Models/Common/ModelPopup'
import HomePage from './Home'
import Login from './Login'
import RegisterEnquiry from './RegisterEnquiry'
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
        <Route path="/changepassword" element={<ChangePasswordModal />} />
        {/* <Route path="/signup" element={<Signup/>}/> */}


    </Routes>
  )
}

export default PublicRoutes
