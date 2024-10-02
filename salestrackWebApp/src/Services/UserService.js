import { ApiUrl } from "./Shared";
import axiosObject from "../utils/InterceptorService";

export const registerUser=async (registerUserModel)=>{
    let res=await axiosObject.post(`${ApiUrl}CompanyAdmin/register-User`,registerUserModel).then(res=>res.data)
return res;
}
 
export const UserLists=async ()=>{
    let res=await axiosObject.get(`${ApiUrl}CompanyAdmin/GetAllUsersByCompany`).then(res=>res.data)
    return res;
}
export const UpdateUser=async()=>{
    let res =await axiosObject.put(`${ApiUrl}CompanyAdmin/UpdateUserByCompany`).then(res =>res.data)
    return res;
}

export const addprocessStep=async (processStep)=>{
    let res=await axiosObject.post(`${ApiUrl}CompanyAdmin/add-process-steps`,processStep).then(res=>res.data)
    return res;
}