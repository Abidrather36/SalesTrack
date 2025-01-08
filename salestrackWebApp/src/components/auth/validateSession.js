import jwt_decode from "jwt-decode";
import myToaster from "../../utils/toaster";

const isTokenExpired = (token) => {
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
  } catch (err) {
    return true; // Treat invalid token as expired
  }
};

const validateSession = () => {
  const token = storage.getItem("salesTrack");
  if (!token || isTokenExpired(token)) {
    storage.removeItem("salesTrack");
    storage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page
  } else {
    const decoded = jwt_decode(token);
    const expirationTime = decoded.exp * 1000; // Expiration time in milliseconds

    // Show a warning 5 minutes before the session expires
    setTimeout(() => {
      myToaster.showWarningToast("Your session is about to expire. Please save your work.");
    }, expirationTime - 5 * 60 * 1000); // 5 minutes before expiration
  }
};

export default validateSession;
