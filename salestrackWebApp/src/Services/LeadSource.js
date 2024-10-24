import { ApiUrl } from "./Shared";
import axiosObject from "../utils/InterceptorService";

export const leadSources=async()=>{
    let res =await axiosObject.get(`${ApiUrl}LeadSources/GetAllLeadSources`).then(res=>res.data)
    return res;
}
export const addLeadSource=async(leadRequest)=>{
    let res =await axiosObject.post(`${ApiUrl}LeadSources/addLeadSource`,leadRequest).then(res =>res.data) 
    return res;
}
