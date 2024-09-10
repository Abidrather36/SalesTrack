import React from 'react';
import { ApiUrl } from './Shared';
import axios from 'axios';


export const loginUser=async (LoginRequestModel)=>{
return await axios.post(`${ApiUrl}Auth/login`,LoginRequestModel).then(res=>res.data)
}
export const signUpUser= async (userSignUpRequestModel)=>{
return await axios.post(`${ApiUrl}Enquiry/register`,userSignUpRequestModel).then(res=>res.data)
}

export const signUpAdmin=async (adminSignUpRequestModel) =>{
    return await axios.post(`${ApiUrl}Admin/register`,adminSignUpRequestModel).then(res=>res.data)
}
export const getAllEnquiries=async()=>{
    return await axios.get(`${ApiUrl}Enquiry/getAllEnquiries`).then(res=>res.data)
}