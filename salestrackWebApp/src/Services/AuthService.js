import React from "react";
import { ApiUrl } from "./Shared";
import axios from "axios";
import storage from "../utils/storages";
import axiosObject from "../utils/InterceptorService";

export const loginUser = async (LoginRequestModel) => {
  let res=await axios.post(`${ApiUrl}Auth/login`,LoginRequestModel).then((res) => res.data);
  return res;
};
export const signUpUser = async (userSignUpRequestModel) => {
  return await axios
    .post(`${ApiUrl}Enquiry/register`, userSignUpRequestModel)
    .then((res) => res.data);
};

export const signUpAdmin = async (adminSignUpRequestModel) => {
  return await axios
    .post(`${ApiUrl}Admin/register`, adminSignUpRequestModel)
    .then((res) => res.data);
};
export const getAllEnquiries = async () => {
  return await axios
    .get(`${ApiUrl}Enquiry/getAll-enquiries`)
    .then((res) => res.data);
};
export const getAllUsers = async () => {
  return await axios
    .get(`${ApiUrl}Auth/GetAllUsers`)
    .then((res) => res.data);
};
export const changePassword = async (changePasswordModel, bearerToken) => {
  return await axios
    .post(`${ApiUrl}Auth/ChangePassword`, changePasswordModel, {
      headers: {
        Authorization: bearerToken,
      },
    })
    .then((res) => res.data);
};
export const forgetPassword=async (email)=>{
    let res= await axiosObject.post(`${ApiUrl}Auth/Forgetpassword/${email}`,).then(res=>res.data)
    return res;
}
export const resetPassword= async (resetPasswordModel)=>{
    let res=await axiosObject.post(`${ApiUrl}Auth/Reset-Password`,resetPasswordModel).then(res=>res.data)
    return res;
}

export const addUser = async (userSignUpModel) => {
  return await axios
    .post(`${ApiUrl}Auth/User-SignUp`, userSignUpModel)
    .then((res) => res.data);
};

export const registerEnquiry =async(enquiryModel) =>{
      let res= await axiosObject.post(`${ApiUrl}Enquiry/register`,enquiryModel).then(res=>res.data);
      return res;
}

export const changePass =async (changePasswordModel)=>{
    let res= await axiosObject.post(`${ApiUrl}Auth/ChangePassword`,changePasswordModel).then(res=>res.data);
    return res;
} 