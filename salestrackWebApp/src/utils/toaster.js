import { toast } from "react-toastify";
import Swal from "sweetalert2"
import { updateCompany } from "../Services/CompanyService";
class Toaster{

    showSuccessToast=(message)=>{
        toast.success(message)
    }
    showErrorToast=(message)=>{
        toast.error(message)
    }
   
      FireInputSwal =async (data={},navigate) => {
        Swal.fire({
          title: "Edit Company",
          html: `
            admin Name :<input id="swal-input1" class="swal2-input" placeholder="Admin Name" value="${data.adminName}" />
           company Name : <input id="swal-input2" class="swal2-input" placeholder="Company Name" value="${data.companyName}" />
             email :<input id="swal-input3" class="swal2-input" placeholder="Email" value="${data.email}" />
           phone Number <input id="swal-input4" class="swal2-input" placeholder="Phone Number" value="${data.phoneNumber}" />
          `,
          
          focusConfirm: false,
          preConfirm: () => {
            const name = document.getElementById('swal-input1').value;
            const companyName = document.getElementById('swal-input2').value;
            const email = document.getElementById('swal-input3').value;
            const phoneNumber = document.getElementById('swal-input4').value;
      
            if (!name || !companyName || !email || !phoneNumber) {
              Swal.showValidationMessage(`Please enter all fields`);
              return null;
            }
      
            return {
             name,
              companyName,
              email,
              phoneNumber,
            };
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "update",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const updatedCompany = result.value;
            updatedCompany.id=data.id;
            console.log("Updated company details:", updatedCompany)  ;
             if(updateCompany !== null || []){
               const res=  await updateCompany(updatedCompany);
               if(res.isSuccess){
                myToaster.showSuccessToast("company updated successfully");
                return;
               }
               else{
                myToaster.showErrorToast(res.message)
                return;
               }

             }
          }
        });
      };
      
  
}
const myToaster=new Toaster();
export default myToaster;