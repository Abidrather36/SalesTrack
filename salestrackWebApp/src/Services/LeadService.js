import { ApiUrl } from "./Shared";
import axiosObject from "../utils/InterceptorService";

export const addLead = async (leadRequestModel)=>{
   let res=await axiosObject.post(`${ApiUrl}Leads/register`,leadRequestModel).then(res=>res.data);
   return res;
}

export const getAllLeads =async()=>{
    let res=await axiosObject.get(`${ApiUrl}Leads/GetAllLeads-ByCompany`).then(res=>res.data)
    return res
}
export const deleteLead=async (leadId)=>{
    let res=await axiosObject.delete(`${ApiUrl}Leads/Delete-Lead/${leadId}`).then(res=>res.data)
    return res;
}
export const updateLead=async (lead)=>{
    const res=await axiosObject.put(`${ApiUrl}Leads/Update-Lead`,lead).then(res=>res.data)
    return res;
}
export const addLeadProcessStep=async (leadProcessStep)=>{
    const res=await axiosObject.post(`${ApiUrl}Leads/addLeadProcessStep`,leadProcessStep).then(res=>res.data)
    return res;
}
export const addFollowUpdate=async (followUpdate)=>{
     const res=await axiosObject.post(`${ApiUrl}Leads/addLeadFollowUpdate`,followUpdate).then(res=>res.data)
        return res;
}