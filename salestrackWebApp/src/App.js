import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Public/Components/Home';
import Footer from './Public/Components/Footer';
import Login from './Public/Components/Auth/Login';
import './App.css'; // Import global styles if needed
import Navbar from './Public/Components/Navbar';
import RegisterEnquiry from './Public/Components/Auth/RegisterEnquiry';
const App = () => {
    return (
       <>
       <div style={{marginBottom:"100px"}}>
       <Navbar/>
       </div>
      
          <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/signin" element={<Login />} />
             <Route path="/enquiry" element ={<RegisterEnquiry/>}/>
          </Routes>
          <div style={{marginTop:"30px"}}>
          <Footer/>
          </div>
         
       </>
    );
 };
  
 export default App;
