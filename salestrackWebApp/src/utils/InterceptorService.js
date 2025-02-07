////Original ////
import axios from "axios";
import { ApiUrl } from "../Services/Shared"; 
import storage from "./storages"; 
import myToaster from "./toaster";

const axiosObject = axios.create({
    baseURL: ApiUrl, 
});

axiosObject.interceptors.request.use(
    (config) => {
        let token = storage.getItem("salesTrack");

        // Check if token is valid and strip quotes if necessary
        if (token !== null) {
            token = token.replace(/^"|"$/g, ""); 
        }

        const publicRoutes = ['/login', '/enquiry'];
        const isApiUrl = config.url?.startsWith(ApiUrl);
        const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));
        //publicRoutes: Defines routes that do not require authentication.
        //isApiUrl: Checks if the request is for the API.
        //isPublicRoute: Checks if the requested URL is in the list of public routes.//

        // Set Authorization header if token is valid, URL matches API URL, and route is not public
        if (token && isApiUrl && !isPublicRoute) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosObject.interceptors.response.use(
    (response) => {
        return response;  // If response is successful, just return it
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle 401 error globally here
            myToaster.showErrorToast("Unauthorized! or Session Timeout Redirecting to login...");

            // Optionally, remove the token and redirect to login
            storage.removeStorage("salesTrack"); // Remove token from storage
            window.location.href = "/login";   // Redirect to login page (or your preferred logout logic)

            // Optionally, you could add some kind of notification about being logged out:
            // myToaster.showErrorToast("Session expired. Please log in again.");
        }

        // You could also add other error handling logic based on error type (e.g., for 500 errors, etc.)

        return Promise.reject(error);  // Return the error to be handled further
    }
);

export default axiosObject;



// import axios from "axios";
// import { ApiUrl } from "../Services/Shared"; 
// import storage from "./storages"; 

// const axiosObject = axios.create({
//     baseURL: ApiUrl, 
// });

// // Request interceptor to add Authorization header
// axiosObject.interceptors.request.use(
//     (config) => {
//         let token = storage.getItem("salesTrack");

//         // Check if token is valid and strip quotes if necessary
//         if (token !== null) {
//             token = token.replace(/^"|"$/g, ""); 
//         }

//         const publicRoutes = ['/login', '/enquiry'];
//         const isApiUrl = config.url?.startsWith(ApiUrl);
//         const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));

//         // Set Authorization header if token is valid, URL matches API URL, and route is not public
//         if (token && isApiUrl && !isPublicRoute) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response interceptor for handling token expiration
// axiosObject.interceptors.response.use(
//     response => response, // Directly return successful responses.
//     async error => {
//         const originalRequest = error.config;

//         // Check for 401 Unauthorized error
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

//             try {
//                 const refreshToken = storage.getItem('refreshToken'); // Use your storage method
//                 // Make a request to your auth server to refresh the token.
//                 const response = await axios.post(`${ApiUrl}`, {
//                     refreshToken,
//                 });
                
//                 const { accessToken, refreshToken: newRefreshToken } = response.data;

//                 // Store the new access and refresh tokens.
//                 storage.setItem('salesTrack', accessToken); // Update your storage method accordingly
//                 storage.setItem('refreshToken', newRefreshToken);

//                 // Update the Authorization header with the new access token.
//                 axiosObject.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

//                 // Retry the original request with the new access token.
//                 return axiosObject(originalRequest);
//             } catch (refreshError) {
//                 // Handle refresh token errors
//                 console.error('Token refresh failed:', refreshError);
//                 storage.removeItem('salesTrack'); // Clear stored tokens
//                 storage.removeItem('refreshToken');
//                 window.location.href = '/login'; // Redirect to login
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error); // For all other errors, return the error as is.
//     }
// );

// export default axiosObject;




