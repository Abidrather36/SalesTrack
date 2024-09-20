import React from "react";
import { ApiUrl } from "./Shared";
import axios from "axios";

export const registerUser=(registerUserModel)=>{
   let res= axios.post(`${ApiUrl}Auth/register`,registerUserModel).then(res=>res.data)
   return res;
}
export const UserList=()=>{
    let res= axios.get(`${ApiUrl}Auth/GetAllUsers`).then(res=>res.data)
    return res;
}
export const addCompany=(companyRequestModel,bearerToken)=>{
    let res= axios.post(`${ApiUrl}PortalAdmin/AddCompany`,companyRequestModel,{
        headers: {
            Authorization: bearerToken,
          },
    }).then(res=>res.data)
    return res;
}
export const getCompanies=(companyRequestModel,bearerToken)=>{
    let res= axios.post(`${ApiUrl}PortalAdmin/Get-All-Companies`,companyRequestModel,{
        headers: {
            Authorization: bearerToken,
          },
    }).then(res=>res.data)
    return res;
}