// import { useEffect } from "react";
// import storage from "./storages";
// import { useNavigate } from "react-router-dom";

// const SessionTimeout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const token = storage.getItem("salesTrack");

//       if (!token) {
//         clearInterval(interval);
//         alert("Session expired. Please log in again.");
//         navigate("/login"); // Redirect to login page
//       }
//     }, 1000 * 60); // Check every minute

//     return () => clearInterval(interval);
//   }, [navigate]);
// };

// export default SessionTimeout;
