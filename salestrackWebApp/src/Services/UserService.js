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
export const UpdateUserByCompany=async()=>{
    let res =await axiosObject.put(`${ApiUrl}CompanyAdmin/UpdateUserByCompany`).then(res =>res.data)
    return res;
}

export const addprocessStep=async (processStep)=>{
    let res=await axiosObject.post(`${ApiUrl}CompanyAdmin/add-process-steps`,processStep).then(res=>res.data)
    return res;
}
export const getAllProcessSteps=async()=>{
    let res=await axiosObject.get(`${ApiUrl}CompanyAdmin/getAll-process-steps`).then(res=>res.data)
    return res;
    
}
export const updateUser=async(updateUser)=>{
    let res=await axiosObject.post(`${ApiUrl}CompanyAdmin/Update-User`,updateUser).then(res=>res.data)
    return res;
}
export const deleteUserById=async (id)=>{
    let res=await axiosObject.delete(`${ApiUrl}CompanyAdmin/delete-User/${id}`).then(res=>res.data)
    return res;
}