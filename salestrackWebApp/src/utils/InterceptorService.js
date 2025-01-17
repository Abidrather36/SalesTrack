// import axios from "axios";
// import { ApiUrl } from "../Services/Shared"; 
// import storage from "./storages"; 

// const axiosObject = axios.create({
//     baseURL: ApiUrl, 
// });

// axiosObject.interceptors.request.use(
//     (config) => {
//         const token = storage.getItem("salesTrack");
//         if(token!==null){
//             token.replace(/^"|"$/g, ""); 
//         }
//         const publicRoutes = ['/login', '/enquiry'];
//         const isApiUrl = config.url.startsWith(ApiUrl);
//         const isPublicRoute = publicRoutes.some(route => config.url.includes(route));
//         if (token && isApiUrl && !isPublicRoute) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {

//         return Promise.reject(error);
//     }
// );

// export default axiosObject;

////Original ////
import axios from "axios";
import { ApiUrl } from "../Services/Shared"; 
import storage from "./storages"; 

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




