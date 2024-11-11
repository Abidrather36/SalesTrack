import { ApiUrl } from "./Shared";
import axiosObject from "../utils/InterceptorService";

export const updateEnquiryById=async (enquiryUpdateModel)=>{
    let res= await axiosObject.post(`${ApiUrl}Enquiry/UpdateEnquiry`,enquiryUpdateModel).then(res=>res.data)
    return res;
} 
export const deleteEnquiryById = async (enquiryId) => {
        const res = await axiosObject.delete(`${ApiUrl}Enquiry/${enquiryId}`).then(res=>res.data); 
        return res;
};
