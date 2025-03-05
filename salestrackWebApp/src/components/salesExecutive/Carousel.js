import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../../utils/paid-idea-concept-illustration_114360-8185.jpg"
import image2 from "../../utils/contextual-advertsing-online-service-platform-woman-with-magnet-attracts-coins_178888-663.jpg"

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      id: 1,
      src: "path-to-image1.jpg",
      alt: "Mountain valley landscape with small village",
      title: "Mountain Valley",
      description: "Beautiful valley surrounded by mountains with a small village"
    },
    {
      id: 2,
      src: "path-to-image2.jpg",
      alt: "Person working on laptop with profile windows",
      title: "Profile Management",
      description: "User interface showing profile management screens"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Image Carousel</h2>
      
      <div id="imageCarousel" className="carousel slide" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              data-bs-slide-to={index}
            ></button>
          ))}
        </div>
        
        {/* Carousel Items */}
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            >
              <img 
                src={image1}
                className="d-block w-100" 
                alt={item.alt}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Controls */}
        <button 
          className="carousel-control-prev" 
          type="button" 
          onClick={handlePrev}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          onClick={handleNext}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
