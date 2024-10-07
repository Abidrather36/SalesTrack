import React from "react";
import "primeicons/primeicons.css";
import { PrimeIcons } from "primereact/api";
import Contact from "./Contact";
import About from "./About";

const HomePage = () => {
  return (
    <>
      <div>
        <main
          className="main"
          style={{
            backgroundColor: "#f0f0f0", 
          }}
        >
          <section
            id="hero"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "60px 20px",
              backgroundColor: "#ffffff",
              backgroundColor: "#9bd9f6",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "20px",
                color: "#333", 
              }}
            >
              <h1
                style={{
                  fontSize: "3rem",
                  marginBottom: "20px",
                }}
              >
                Streamline Your Sales Tracking
              </h1>
              <p
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
              >
                Efficiently manage and track your sales leads, follow-ups, and
                client interactions with our comprehensive sales tracking
                system.
              </p>
              <div style={{ display: "flex", gap: "10px", marginLeft: "50px" }}>
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
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
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
            </div>
          </section>
        </main>
      </div>
      <Contact />
      <About />
    </>
  );
};

export default HomePage;
