import React from "react";
import { ApiUrl } from "./Shared";
import axios from "axios";
import axiosObject from "../utils/InterceptorService";

export const addCompany=(companyRequestModel,bearerToken)=>{
    let res= axiosObject.post("PortalAdmin/AddCompany",companyRequestModel).then(res=>res.data)
    return res;
}

export const getCompanies=(companyRequestModel,bearerToken)=>{
    let res= axios.get(`${ApiUrl}PortalAdmin/Get-All-Companies`,companyRequestModel,{
        headers: {
            Authorization: bearerToken,
          },
    }).then(res=>res.data)
    return res;
}
export const updateCompany=async (companyRequestModel)=>{
    let res= await axiosObject.put(`PortalAdmin/Update-Company`,companyRequestModel).then(res=>res.data)
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