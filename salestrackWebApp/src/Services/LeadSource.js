import { ApiUrl } from "./Shared";
import axiosObject from "../utils/InterceptorService";

export const leadSources=async()=>{
    let res =await axiosObject.get(`${ApiUrl}LeadSources/GetAllLeadSources`).then(res=>res.data)
    return res;
}
