import React from "react";
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';

const HomePage = () => {
  return (
    <div>
      <main
        className="main"
        style={{
          backgroundColor: "#f0f0f0", // Light background color
        }}
      >
        <section
          id="hero"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "60px 20px",
            backgroundColor: "#ffffff", // White background for the hero section
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",
              color: "#333", // Dark text color
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
              }}
            >
              Efficiently manage and track your sales leads, follow-ups, and client interactions with our comprehensive sales tracking system.
            </p>
            <div style={{ display: "flex", gap: "10px", marginLeft: "50px" }}>
              <a
                href="#about"
                className="btn-get-started"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff", // Button background color
                  color: "#ffffff", // Button text color
                  textDecoration: "none",
                  borderRadius: "10px", // Border radius for the button
                  marginRight: "20px", // Add margin on the right side
                }}
              >
                Get Started
              </a>
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox btn-watch-video d-flex align-items-center"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745", // Button background color
                  color: "#ffffff", // Button text color
                  textDecoration: "none",
                  borderRadius: "10px", // Border radius for the button
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
              src="/assets/img/hero-img.png"
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
  );
};

export default HomePage;
