import axios from "axios";
import { ApiUrl } from "../Services/Shared"; 
import storage from "./storages"; 

const axiosObject = axios.create({
    baseURL: ApiUrl, 
});

axiosObject.interceptors.request.use(
    (config) => {
        const token = storage.getItem("salesTrack").replace(/^"|"$/g, "");
        const publicRoutes = ['/login', '/enquiry'];
        const isApiUrl = config.url.startsWith(ApiUrl);
        const isPublicRoute = publicRoutes.some(route => config.url.includes(route));
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
