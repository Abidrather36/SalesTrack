import { ApiUrl } from "./Shared";
import axiosObject from "../utils/InterceptorService";

export const addLead = async (leadRequestModel)=>{
   let res=await axiosObject.get(`${ApiUrl}Leads/register`,leadRequestModel).then(res=>res.data);
   return res;
}

export const getAllLeads =async()=>{
    let res=await axiosObject.get(`${ApiUrl}Leads/GetAllLeads-ByCompany`).then(res=>res.data)
    return res
}
