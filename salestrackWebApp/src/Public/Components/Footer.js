import React from 'react'

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
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">About us</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Services</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Web Design</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Web Development</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Product Management</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Marketing</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Graphic Design</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-4 footer-links">
                            <h4>Follow Us</h4>
                            <div className="social-links d-flex mt-2">
                                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="copyright">
                        &copy; <strong><span>Arsha</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
            </footer>
    </div>
  )
}

export default Footer
