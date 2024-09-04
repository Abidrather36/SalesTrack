import React from 'react';
import { ApiUrl } from './Shared';
import axios from 'axios';

export const loginUser=async (LoginRequestModel)=>{
return await axios.post(`${ApiUrl}Auth/login`,LoginRequestModel).then(res=>res.data)
}
export const signUpUser= async (SignUpRequestModel)=>{
return await axios.post(`${ApiUrl}Enquiry/register`,SignUpRequestModel).then(res=>res.data)
}
