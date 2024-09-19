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