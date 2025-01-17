import { ApiUrl } from "./Shared";
import axiosObject from "../utils/InterceptorService";

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("File", file); 
        let res = await axiosObject.post(`${ApiUrl}ProfilePicture/uploadProfilePicture`, formData).then(res=>res.data);
        return res;
};

export const getProfilePath=async ()=>{
    let res= await axiosObject.get(`${ApiUrl}ProfilePicture/getFilePath`).then(res=>res.data);
    return res;
}