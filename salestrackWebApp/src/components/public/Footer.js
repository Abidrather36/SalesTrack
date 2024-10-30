
import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg"

function Footer() {
  return (
    <div style={{marginTop:"50px"}}>
           <footer style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-3 col-md-6" style={{marginTop:"-12px"}}>
            <h4 style={{ color: "#0077b6", fontWeight: "bold" }}>
              <img 
                src={logo} style={{maxHeight:"76px"}} 
                alt="SkillTest Logo" 
                // style={{ height: "30px", marginRight: "10px" }} 
              />
            </h4>
            <p style={{ fontSize: "18px", color: "#6c757d",marginTop:"25px" }}>
              Salestern: Efficiently manage and track your sales leads, follow-ups, and client interactions with our comprehensive sales tracking system.
            </p>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" ,marginTop:"10px"}}>
              <i className="fas fa-envelope" style={{ color: "#0077b6", marginRight: "10px" }}></i>
              <a href="mailto:info@myskilltest.com" style={{ color: "#0077b6", textDecoration: "none" }}>
                info@myskilltest.com
              </a>
            </div>
           
          </div>

          {/* Menu Section */}
          <div className="col-lg-2 col-md-6">
            <h5 style={{ color: "black", fontWeight: "bold", marginBottom: "20px" }}>
              Menu
              <span style={{ display: "block", height: "2px", width: "40px", backgroundColor: "#0077b6", marginTop: "5px" }}></span>
            </h5>
            <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: "2.5" }}>
              <li><Link to="/" style={{ color: "#6c757d", textDecoration: "none" }}>Home</Link></li>
              <li><Link to="/enquiry" style={{ color: "#6c757d", textDecoration: "none" }}>Enquiry</Link></li>
              <li><Link to="/contact" style={{ color: "#6c757d", textDecoration: "none" }}>Contact Us</Link></li>
              <li><Link to="/about" style={{ color: "#6c757d", textDecoration: "none" }}>About Us</Link></li>
              <li><Link to="/privacy-policy" style={{ color: "#6c757d", textDecoration: "none" }}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Quick Links Section */}
      

          {/* Newsletter Section */}
          <div className="col-lg-4 col-md-6">
            <h5 style={{ color: "black", fontWeight: "bold", marginBottom: "20px" }}>
              Timings
              <span style={{ display: "block", height: "2px", width: "40px", backgroundColor: "#0077b6", marginTop: "5px" }}></span>
            </h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="fas fa-clock" style={{ color: "#0077b6", marginRight: "10px" ,marginTop:"-18px"}}></i>
              <p style={{ fontSize: "14px", color: "#6c757d", margin: 0 }}>
                Mon – Sat: 8 Am – 5 Pm, <br /> Sunday: <span style={{ color: "#0077b6" }}>CLOSED</span>
              </p>
            </div>
           
          
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-lg-12 text-center">
            <p style={{ fontSize: "14px", color: "#6c757d" }}>
              &copy; Antern Technologies Pvt Ltd | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
    </div>
 
  );
}

export default Footer;



