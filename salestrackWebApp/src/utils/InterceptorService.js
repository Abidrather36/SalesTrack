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
