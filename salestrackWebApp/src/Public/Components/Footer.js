import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <footer id="footer" className="footer">
          
                <div className="container footer-top">
                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-6 footer-about">
                            <a href="index.html" className="d-flex align-items-center">
                                <span className="sitename">Sales Track</span>
                            </a>
                            <div className="footer-contact pt-3">
                                <p>2nd floor,100ft road</p>
                                <p>HRBR Layout,Kalyanagar,Bengaluru,karnataka</p>
                                <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                                <p><strong>Email:</strong> <span>antennsales@gmail.com</span></p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <Link to="/">Home</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="/about">About us</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="/Enquiry">Enquiry</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Services</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Privacy policy</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Terms of service</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Web Design</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Web Development</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Product Management</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Marketing</Link></li>
                                <li><i className="bi bi-chevron-right"></i> <Link to="#">Graphic Design</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 footer-links">
                            <h4>Follow Us</h4>
                            <div className="social-links d-flex mt-2">
                                <a href="https://www.twitter.com"  target='blank' className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="https://www.facebook.com/" target='blank' className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="https://www.instagram.com"  target='blank' className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="https://www.linkedin.com"  target='blank' className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="copyright">
                        &copy; <strong><span>Sales track</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <Link to="https://anterntech.com/" target='blank'>Antern Technologies</Link>
                    </div>
                </div>
            </footer>
    </div>
  )
}

export default Footer
