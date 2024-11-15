    import { ApiUrl } from "./Shared";
    import axiosObject from "../utils/InterceptorService";

    export const addCompany=(companyRequestModel)=>{
        let res= axiosObject.post(`${ApiUrl}PortalAdmin/AddCompany`,companyRequestModel).then(res=>res.data)
        return res;
    }

    export const getCompanies=(companyRequestModel)=>{
        let res= axiosObject.get(`${ApiUrl}PortalAdmin/Get-All-Companies`,companyRequestModel).then(res=>res.data)
        return res;
    }
    export const updateCompany=async (companyRequestModel)=>{
        let res= await axiosObject.post(`${ApiUrl}PortalAdmin/Update-Company`,companyRequestModel).then(res=>res.data)
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
        export const getAdminProcessesByCompany=()=>{
            let res =axiosObject.get(`${ApiUrl}CompanyAdmin/getAll-Adminprocess-steps-ByCompany`).then(res =>res.data)
            return res;
        }

        export const addLeadCategory =async(model)=>{
        let res= await axiosObject.post(`${ApiUrl}CompanyAdmin/Add-LeadCategory`,model).then(res =>res.data)
        return res;
        }
        export const leadCategoryList =async()=>{
            let res= await axiosObject.get(`${ApiUrl}CompanyAdmin/getAll-LeadCategories`).then(res =>res.data)
            return res;
        }

        export const updateAdminProcessStep=async(updateModel)=>{
            let res =await axiosObject.post(`${ApiUrl}CompanyAdmin/update-process-step`,updateModel).then(res =>res.data)
            return res;
        }