// import React from "react";
// import "./Demo.css"; // Separate CSS file for styling
// import image from "../../utils/forgot-password-concept-illustration_114360-1123.avif"
// const Homepage = () => {
//   return (
//     <div className="homepage">
//       <header className="header">
//         <div className="logo">Spark Engine</div>
//         <nav className="nav">
//           <a href="#">Training Programs</a>
//           <a href="#">Case Studies</a>
//           <a href="#">Become a Trainer</a>
//           <a href="#">About</a>
//         </nav>
//         <button className="register-btn">Register</button>
//       </header>
//       <main className="main-content">
//         <div className="hero-section">
//           <div className="left-section">
//             <h1 className="title">
//               Product Management <br /> Training + Certification
//             </h1>
//             <p className="subtitle">Transform your mindset to lead your team to disruptive innovation</p>
//             <p className="description">
//               Spark Engine helps product management professionals advance their
//               careers with hands-on training in product innovation, human-centered
//               design, and agile product development.
//             </p>
//             <button className="learn-more-btn">Learn more</button>
//           </div>
//           <div className="right-section">
//             <div className="image-grid">
//               <div className="image-item">
//                 <img src="https://via.placeholder.com/150" alt="Image 1" />
//               </div>
//               <div className="image-item">
//                 <img src="https://via.placeholder.com/150" alt="Image 2" />
//               </div>
//               <div className="image-item">
//                 <img src="https://via.placeholder.com/150" alt="Image 3" />
//               </div>
//               <div className="image-item">
//                 <img src="https://via.placeholder.com/150" alt="Image 4" />
//               </div>
//               <div className="image-item">
//                 <img src="https://via.placeholder.com/150" alt="Image 5" />
//               </div>
//               <div className="image-item">
//                 <img src="https://via.placeholder.com/150" alt="Image 6" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <section className="features-section">
//           <h2 className="features-title">Why Choose Us?</h2>
//           <div className="features-grid">
//             <div className="feature-item">
//               <img src="https://via.placeholder.com/100" alt="Feature 1" />
//               <h3>Innovative Training</h3>
//               <p>Learn cutting-edge techniques to stay ahead in the industry.</p>
//             </div>
//             <div className="feature-item">
//               <img src="https://via.placeholder.com/100" alt="Feature 2" />
//               <h3>Expert Instructors</h3>
//               <p>Our trainers are industry leaders with years of experience.</p>
//             </div>
//             <div className="feature-item">
//               <img src="https://via.placeholder.com/100" alt="Feature 3" />
//               <h3>Certification</h3>
//               <p>Gain a prestigious certificate to boost your career.</p>
//             </div>
//           </div>
//         </section>
//         <section className="cta-section">
//           <h2>Ready to Transform Your Career?</h2>
//           <p>Join our training programs and become a leader in product management.</p>
//           <button className="register-now-btn">Register Now</button>
//         </section>
//       </main>
//       <footer className="footer">
//         <p>&copy; 2024 Spark Engine. All Rights Reserved.</p>
//         <nav className="footer-nav">
//           <a href="#">Privacy Policy</a>
//           <a href="#">Terms of Service</a>
//           <a href="#">Contact Us</a>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default Homepage;



// import React from 'react';

// const Navbar = () => (
//     <header className="bg-white shadow-md">
//         <div className="container mx-auto flex justify-between items-center py-4 px-6">
//             <div className="text-xl font-bold">SALESTRACK</div>
//             <nav className="space-x-6 text-gray-700">
//                 <a href="#" className="hover:text-black">Home</a>
//                 <a href="#" className="hover:text-black">About</a>
//                 <a href="#" className="hover:text-black">Services</a>
//                 <a href="#" className="hover:text-black">Team</a>
//                 <a href="#" className="hover:text-black">Pricing</a>
//                 <a href="#" className="hover:text-black font-semibold">How It Works</a>
//                 <a href="#" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">CONTACT</a>
//             </nav>
//         </div>
//     </header>
// );

// const HeroSection = () => (
//     <section className="relative bg-cover bg-center h-[400px] flex items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1500x400')" }}>
//         <div className="text-center text-white">
//             <h1 className="text-4xl font-bold mb-4">Streamline your sales</h1>
//             <p className="text-lg">Manage leads effortlessly and effectively</p>
//         </div>
//     </section>
// );

// const FeaturesSection = () => (
//     <section className="py-16 bg-gray-100">
//         <div className="container mx-auto text-center mb-12">
//             <h2 className="text-xl font-semibold text-green-700">STREAMLINE YOUR SALES</h2>
//             <h3 className="text-3xl font-bold">Effortlessly manage and track leads</h3>
//         </div>
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//             <FeatureCard 
//                 image="https://via.placeholder.com/400x200"
//                 title="Lead tracking"
//                 description="Capture and monitor every lead from start to finish with SalesTrack."
//                 link="#"
//             />
//             <FeatureCard 
//                 image="https://via.placeholder.com/400x200"
//                 title="Origin monitoring"
//                 description="Gain insights into lead origins to enhance your sales strategy and boost efficiency."
//                 link="#"
//             />
//         </div>
//     </section>
// );

// const FeatureCard = ({ image, title, description, link }) => (
//     <div className="bg-white shadow-md p-6 rounded">
//         <img src={image} alt={title} className="w-full mb-4 rounded" />
//         <h4 className="text-xl font-semibold">{title}</h4>
//         <p className="text-gray-600 mb-4">{description}</p>
//         <a href={link} className="text-green-600 hover:underline">Learn more</a>
//     </div>
// );

// const TeamEmpowermentSection = () => (
//     <section className="py-16 bg-gray-50">
//         <div className="container mx-auto text-center mb-12">
//             <h2 className="text-xl font-semibold text-green-700">EMPOWER YOUR SALES TEAM</h2>
//             <h3 className="text-3xl font-bold">Transform leads into customers effortlessly.</h3>
//         </div>
//         <div className="container mx-auto">
//             <img src="https://via.placeholder.com/1000x500" alt="Team working together" className="w-full rounded shadow-md" />
//         </div>
//     </section>
// );

// const CTASection = () => (
//     <section className="py-16 bg-green-900 text-white">
//         <div className="container mx-auto flex flex-col items-center text-center">
//             <h2 className="text-xl font-semibold mb-4">GET STARTED TODAY!</h2>
//             <h3 className="text-3xl font-bold mb-6">Unlock the potential of your sales team.</h3>
//             <a href="#" className="bg-white text-green-900 px-6 py-3 rounded hover:bg-gray-100">GET IN TOUCH</a>
//         </div>
//     </section>
// );

// const Footer = () => (
//     <footer className="py-6 bg-black text-white">
//         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//             <div className="text-sm space-y-2 md:space-y-0 md:space-x-4">
//                 <a href="#" className="hover:underline">Schedule Appointment</a>
//                 <a href="#" className="hover:underline">Complete Intake</a>
//                 <a href="#" className="hover:underline">Privacy Policy</a>
//             </div>
//             <p className="text-sm">Web design by B12</p>
//         </div>
//     </footer>
// );

// const App = () => (
//     <div className="font-sans">
//         <Navbar />
//         <HeroSection />
//         <FeaturesSection />
//         <TeamEmpowermentSection />
//         <CTASection />
//         <Footer />
//     </div>
// );

// export default App;


// import React from 'react';

// const styles = {
//     navbar: {
//         backgroundColor: 'white',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         padding: '1rem 1.5rem',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     navLinks: {
//         display: 'flex',
//         gap: '1rem',
//         color: 'gray',
//     },
//     navLink: {
//         textDecoration: 'none',
//         color: 'inherit',
//     },
//     hero: {
//         height: '400px',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: 'white',
//         textAlign: 'center',
//     },
//     featureCard: {
//         backgroundColor: 'white',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//         padding: '1.5rem',
//         borderRadius: '0.5rem',
//     },
//     ctaSection: {
//         backgroundColor: '#065f46',
//         color: 'white',
//         textAlign: 'center',
//         padding: '2rem',
//     },
//     footer: {
//         backgroundColor: 'black',
//         color: 'white',
//         textAlign: 'center',
//         padding: '1rem',
//     },
// };

// const Navbar = () => (
//     <header style={styles.navbar}>
//         <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>SALESTRACK</div>
//         <nav style={styles.navLinks}>
//             <a href="#" style={styles.navLink}>Home</a>
//             <a href="#" style={styles.navLink}>About</a>
//             <a href="#" style={styles.navLink}>Services</a>
//             <a href="#" style={styles.navLink}>Team</a>
//             <a href="#" style={styles.navLink}>Pricing</a>
//             <a href="#" style={{ ...styles.navLink, fontWeight: 'bold' }}>How It Works</a>
//             <a href="#" style={{ ...styles.navLink, backgroundColor: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}>CONTACT</a>
//         </nav>
//     </header>
// );

// const HeroSection = () => (
//     <section style={{ ...styles.hero, backgroundImage: "url('https://via.placeholder.com/1500x400')" }}>
//         <div>
//             <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Streamline your sales</h1>
//             <p>Manage leads effortlessly and effectively</p>
//         </div>
//     </section>
// );

// const FeaturesSection = () => (
//     <section style={{ padding: '2rem', backgroundColor: '#f7f7f7' }}>
//         <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
//             <h2 style={{ color: '#065f46', fontSize: '1.25rem', fontWeight: 'bold' }}>STREAMLINE YOUR SALES</h2>
//             <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Effortlessly manage and track leads</h3>
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
//             <FeatureCard 
//                 image="https://via.placeholder.com/400x200"
//                 title="Lead tracking"
//                 description="Capture and monitor every lead from start to finish with SalesTrack."
//                 link="#"
//             />
//             <FeatureCard 
//                 image="https://via.placeholder.com/400x200"
//                 title="Origin monitoring"
//                 description="Gain insights into lead origins to enhance your sales strategy and boost efficiency."
//                 link="#"
//             />
//         </div>
//     </section>
// );

// const FeatureCard = ({ image, title, description, link }) => (
//     <div style={styles.featureCard}>
//         <img src={image} alt={title} style={{ width: '100%', marginBottom: '1rem', borderRadius: '0.5rem' }} />
//         <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h4>
//         <p style={{ color: 'gray', marginBottom: '1rem' }}>{description}</p>
//         <a href={link} style={{ color: '#065f46', textDecoration: 'underline' }}>Learn more</a>
//     </div>
// );

// const TeamEmpowermentSection = () => (
//     <section style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
//         <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
//             <h2 style={{ color: '#065f46', fontSize: '1.25rem', fontWeight: 'bold' }}>EMPOWER YOUR SALES TEAM</h2>
//             <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Transform leads into customers effortlessly.</h3>
//         </div>
//         <div>
//             <img src="https://via.placeholder.com/1000x500" alt="Team working together" style={{ width: '100%', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
//         </div>
//     </section>
// );

// const CTASection = () => (
//     <section style={styles.ctaSection}>
//         <div>
//             <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>GET STARTED TODAY!</h2>
//             <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Unlock the potential of your sales team.</h3>
//             <a href="#" style={{ backgroundColor: 'white', color: '#065f46', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', textDecoration: 'none' }}>GET IN TOUCH</a>
//         </div>
//     </section>
// );

// const Footer = () => (
//     <footer style={styles.footer}>
//         <div>
//             <div style={{ marginBottom: '1rem' }}>
//                 <a href="#" style={{ color: 'white', textDecoration: 'underline', marginRight: '1rem' }}>Schedule Appointment</a>
//                 <a href="#" style={{ color: 'white', textDecoration: 'underline', marginRight: '1rem' }}>Complete Intake</a>
//                 <a href="#" style={{ color: 'white', textDecoration: 'underline' }}>Privacy Policy</a>
//             </div>
//             <p style={{ fontSize: '0.875rem' }}>Web design by B12</p>
//         </div>
//     </footer>
// );

// const App = () => (
//     <div style={{ fontFamily: 'Arial, sans-serif' }}>
//         <Navbar />
//         <HeroSection />
//         <FeaturesSection />
//         <TeamEmpowermentSection />
//         <CTASection />
//         <Footer />
//     </div>
// );

// export default App;


// import React from "react";
// import "./Demo.css"; // Ensure to create and import this CSS file

// const Homepage = () => {
//   return (
//     <div className="homepage">
//       <header className="header">
//         <div className="logo">SALESTRACK</div>
//         <nav className="nav">
//           <a href="#home">Home</a>
//           <a href="#about">About</a>
//           <a href="#services">Services</a>
//           <a href="#team">Team</a>
//           <a href="#pricing">Pricing</a>
//           <a href="#how-it-works">How It Works</a>
//         </nav>
//         <button className="contact-btn">Contact</button>
//       </header>
//       <main className="main-content" >
//         <div className="hero-section" >
//           <div className="hero-text">
//             <h1>Boost your sales</h1>
//             <p>Effortlessly track leads and conversions</p>
//             <button className="view-services-btn">VIEW SERVICES</button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Homepage;

// import React from "react";
// import "./Demo.css"; // Ensure to create and import this CSS file

// const Homepage = () => {
//   return (
//     <div className="homepage">
//       <header className="header">
//         <div className="logo">SALESTRACK</div>
//         <nav className="nav">
//           <a href="#home">Home</a>
//           <a href="#about">About</a>
//           <a href="#services">Services</a>
//           <a href="#team">Team</a>
//           <a href="#pricing">Pricing</a>
//           <a href="#how-it-works">How It Works</a>
//         </nav>
//         <button className="contact-btn">Contact</button>
//       </header>
//       <main className="main-content">
//         <div className="hero-section">
//           <div className="hero-text">
//             <h1 className="hero-title">Boost your sales</h1>
//             <p className="hero-subtitle">Effortlessly track leads and conversions</p>
//             <button className="view-services-btn">View Services</button>
//           </div>
//           <div className="hero-images">
//             <img src="/path/to/your/image1.jpg" alt="Professional Woman" className="hero-image" />
//             <img src="/path/to/your/image2.jpg" alt="Teamwork" className="hero-image" />
//             <img src="/path/to/your/image3.jpg" alt="Business Meeting" className="hero-image" />
//           </div>
//         </div>
//         <section className="features-section">
//           <h2>Why Choose Us?</h2>
//           <div className="features-grid">
//             <div className="feature-item">
//               <img src="/path/to/your/feature-image1.jpg" alt="Feature 1" />
//               <h3>Innovative Training</h3>
//               <p>Learn cutting-edge techniques to stay ahead in the industry.</p>
//             </div>
//             <div className="feature-item">
//               <img src="/path/to/your/feature-image2.jpg" alt="Feature 2" />
//               <h3>Expert Instructors</h3>
//               <p>Our trainers are industry leaders with years of experience.</p>
//             </div>
//             <div className="feature-item">
//               <img src="/path/to/your/feature-image3.jpg" alt="Feature 3" />
//               <h3>Certification</h3>
//               <p>Gain a prestigious certificate to boost your career.</p>
//             </div>
//           </div>
//         </section>
//         <section className="cta-section">
//           <h2>Ready to Transform Your Career?</h2>
//           <p>Join our training programs and become a leader in product management.</p>
//           <button className="register-now-btn">Register Now</button>
//         </section>
//       </main>
//       <footer className="footer">
//         <p>&copy; 2024 SALESTRACK. All Rights Reserved.</p>
//         <nav className="footer-nav">
//           <a href="#privacy-policy">Privacy Policy</a>
//           <a href="#terms-of-service">Terms of Service</a>
//           <a href="#contact-us">Contact Us</a>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default Homepage;

import React from "react";
import "./Demo.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">SALESTRACK</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#pricing">Pricing</a>
          <a href="#how-it-works">How It Works</a>
        </nav>
        <button className="contact-btn">Contact</button>
      </header>
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-text">
            <h1 className="hero-title">Streamline your sales</h1>
            <p className="hero-subtitle">Manage leads effortlessly and effectively</p>
          </div>
        </div>
        <section className="sales-section">
          <h2>Streamline Your Sales</h2>
          <div className="sales-content">
            <div className="sales-item">
              <img src="/path/to/your/image1.jpg" alt="Lead tracking" />
              <h3>Lead tracking</h3>
              <p>Capture and monitor every lead from start to finish with SalesTrack.</p>
              <a href="#">Learn more</a>
            </div>
            <div className="sales-item">
              <img src="/path/to/your/image2.jpg" alt="Origin monitoring" />
              <h3>Origin monitoring</h3>
              <p>Gain insights into lead origins to enhance your sales strategy and boost efficiency.</p>
              <a href="#">Learn more</a>
            </div>
          </div>
        </section>
        <section className="team-section">
          <h2>Empower Your Sales Team</h2>
          <img src="/path/to/your/team-image.jpg" alt="Teamwork" className="team-image" />
        </section>
      </main>
      <footer className="footer">
        <div className="cta">
          <h2>Unlock the potential of your sales team.</h2>
          <button className="get-in-touch-btn">GET IN TOUCH</button>
        </div>
        <nav className="footer-nav">
          <a href="#">Schedule Appointment</a>
          <a href="#">Complete Intake</a>
          <a href="#">Privacy Policy</a>
        </nav>
        <p>Web design by B12</p>
      </footer>
    </div>
  );
};

export default Homepage;


