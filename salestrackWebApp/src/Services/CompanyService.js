import React from "react";
import { ApiUrl } from "./Shared";
import axios from "axios";
import axiosObject from "../utils/InterceptorService";

export const addCompany=(companyRequestModel)=>{
    let res= axiosObject.post("PortalAdmin/AddCompany",companyRequestModel).then(res=>res.data)
    return res;
}

export const getCompanies=(companyRequestModel)=>{
    let res= axiosObject.get(`${ApiUrl}PortalAdmin/Get-All-Companies`,companyRequestModel).then(res=>res.data)
    return res;
}
export const updateCompany=async (companyRequestModel)=>{
    let res= await axiosObject.put(`PortalAdmin/Update-Company`,companyRequestModel).then(res=>res.data)
    return res;
}
export const deleteCompanyById=async (companyId)=>{
    let res=await axiosObject.delete(`${ApiUrl}PortalAdmin/Delete-Company/${companyId}`).then(res=>res.data)
    return res;
}
export const getAllUsersByCompany=async()=>{
    let res =await axiosObject.get(`${ApiUrl}CompanyAdmin/GetAllUsersByCompany`).then(res=>res.data);
    return res;
}
export const viewTimeSheetByCompany = async (startDate, endDate, userId) => {
    const url = new URL(`${ApiUrl}CompanyAdmin/viewTimeSheet`);
    
    url.searchParams.append("userId", userId);

    if (startDate) {
        url.searchParams.append("startDate", startDate);
    }
    if (endDate) {
        url.searchParams.append("endDate", endDate);
    }

    let res = await axiosObject.post(url.toString()).then(res => res.data);
    return res;
};


