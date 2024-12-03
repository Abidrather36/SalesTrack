// import React from "react";
// import "primeicons/primeicons.css";
// import { PrimeIcons } from "primereact/api";
// import Contact from "./Contact";
// import About from "./About";
// import TestimonialsComponent from "./TestimonialsComponent "
// import "./Home.css"
// const HomePage = () => {
//   return (
//     <>
//       <div className="home">
//         <main
//           className="main"
//           style={{
//           }}
//         >
//           <section
//             id="hero"
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "70px 20px",
//               backgroundColor: "#9bd9f6",
//             }}
//           >
//             <div
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 padding: "20px",
//                 color: "#333", 
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "3rem",
//                   marginBottom: "20px",
//                 }}
//               >
//                 Streamline Your Sales Tracking
//               </h1>
//               <p
//                 style={{
//                   fontSize: "1.2rem",
//                   marginBottom: "30px",
//                   fontFamily: "'Montserrat', sans-serif",
//                   lineHeight: "1.6",
//                   fontWeight: "500",
//                   color: "#333",
//                   maxWidth: "800px",
//                   margin: "0 auto 20px",
//                 }}
//               >
//                 Efficiently manage and track your sales leads, follow-ups, and
//                 client interactions with our comprehensive sales tracking
//                 system.
//               </p>
//               <div style={{ display: "flex", gap: "10px", marginLeft: "50px" }}>
//                 <a
//                   href="#about"
//                   className="btn-get-started"
//                   style={{
//                     padding: "10px 20px",
//                     backgroundColor: "#007bff", 
//                     color: "#ffffff", 
//                     textDecoration: "none",
//                     borderRadius: "10px", 
//                     marginRight: "20px", 
//                   }}
//                 >
//                   Get Started
//                 </a>
//                 <a
//                   href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
//                   className="glightbox btn-watch-video d-flex align-items-center"
//                   style={{
//                     padding: "10px 20px",
//                     backgroundColor: "#28a745", 
//                     color: "#ffffff", 
//                     textDecoration: "none",
//                     borderRadius: "10px", 
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}
//                 >
//                   <i
//                     className="bi bi-play-circle"
//                     style={{ fontSize: "18px" }}
//                   ></i>
//                   <span>Watch Video</span>
//                 </a>
//               </div>
//             </div>
//             <div
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: "20px",
//               }}
//             >
//               <img
//                 src="https://i.ibb.co/D4KHwQm/hero-img.png"
//                 className="img-fluid animated"
//                 alt="Sales Tracking Illustration"
//                 style={{
//                   maxWidth: "100%",
//                   height: "auto",
//                 }}
//               />
//             </div>
//           </section>
//         </main>
//       </div>
//       <div style={{marginTop:"20px"}}>
//       <About />
//       </div>
//       <Contact />
//       <TestimonialsComponent/>
//     </>
//   );
// };

// export default HomePage;


import React from "react";
import { motion } from "framer-motion";
import Contact from "./Contact";
import About from "./About";
import TestimonialsComponent from "./TestimonialsComponent ";
import "./Home.css";

const HomePage = () => {
  return (
    <>
      <div className="home">
        <main className="main">
          <section
            id="hero"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "70px 20px",
              backgroundColor: "#9bd9f6",
            }}
          >
            {/* Hero Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px",
                color: "#333",
              }}
            >
              <motion.h1
                style={{
                  fontSize: "3rem",
                  marginBottom: "20px",
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Streamline Your Sales Tracking
              </motion.h1>
              <motion.p
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "30px",
                  fontFamily: "'Montserrat', sans-serif",
                  lineHeight: "1.6",
                  fontWeight: "500",
                  color: "#333",
                  maxWidth: "800px",
                  margin: "0 auto 20px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Efficiently manage and track your sales leads, follow-ups, and
                client interactions with our comprehensive sales tracking
                system.
              </motion.p>
              <motion.div
                style={{ display: "flex", gap: "10px", marginLeft: "50px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <a
                  href="#about"
                  className="btn-get-started"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#ffffff",
                    textDecoration: "none",
                    borderRadius: "10px",
                    marginRight: "20px",
                  }}
                >
                  Get Started
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#ffffff",
                    textDecoration: "none",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <i
                    className="bi bi-play-circle"
                    style={{ fontSize: "18px" }}
                  ></i>
                  <span>Watch Video</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Image Section */}
            <motion.div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <img
                src="https://i.ibb.co/D4KHwQm/hero-img.png"
                className="img-fluid animated"
                alt="Sales Tracking Illustration"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </motion.div>
          </section>
        </main>
      </div>

      {/* About, Contact, and Testimonials Section */}
      <motion.div
        style={{ marginTop: "20px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <About />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Contact />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <TestimonialsComponent />
      </motion.div>
    </>
  );
};

export default HomePage;
