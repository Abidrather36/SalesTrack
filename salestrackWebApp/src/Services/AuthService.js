import React from 'react';
import { ApiUrl } from './Shared';
import axios from 'axios';
import LoginRequestModel from '../Models/Common/Login';

export const loginUser=async (LoginRequestModel)=>{
return await axios.post(`${ApiUrl}Auth/login`,LoginRequestModel);
}
