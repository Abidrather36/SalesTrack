import React from "react";
import { ApiUrl } from "./Shared";
import axios from "axios";


export const addCompany=(companyRequestModel,bearerToken)=>{
    let res= axios.post(`${ApiUrl}PortalAdmin/AddCompany`,companyRequestModel,{
        headers: {
            Authorization: bearerToken,
          },
    }).then(res=>res.data)
    return res;
}
export const getCompanies=(companyRequestModel,bearerToken)=>{
    let res= axios.get(`${ApiUrl}PortalAdmin/Get-All-Companies`,companyRequestModel,{
        headers: {
            Authorization: bearerToken,
          },
    }).then(res=>res.data)
    return res;
}
export const updateCompany=(companyRequestModel,bearerToken)=>{
    let res= axios.post(`${ApiUrl}PortalAdmin/AddCompany`,companyRequestModel,{
        headers: {
            Authorization: bearerToken,
          },
    }).then(res=>res.data)
    return res;
}
export const deleteCompany=(companyRequestModel,bearerToken)=>{
    let res= axios.post(`${ApiUrl}PortalAdmin/AddCompany`,companyRequestModel,{
        headers: {
            Authorization: bearerToken,
          },
    }).then(res=>res.data)
    return res;
}