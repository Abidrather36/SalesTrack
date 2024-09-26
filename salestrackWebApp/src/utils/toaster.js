import { toast } from "react-toastify";
import Swal from "sweetalert2"
import { updateCompany ,deleteCompanyById} from "../Services/CompanyService";
import { confirmDialog } from 'primereact/confirmdialog'; 
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';
import "./toaster.css"
class Toaster{

    showSuccessToast=(message)=>{
        toast.success(message)
    }
    showErrorToast=(message)=>{
        toast.error(message)
    }
  
      
      FireInputSwal = async (data = {}, fetchCompanies) => {
        Swal.fire({
          title: "Edit Company",
          html: `
               <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
              <label for="swal-input1" style="text-align:left" >Admin Name</label>
              <input id="swal-input1" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Admin Name" value="${data.adminName}" />
              
              <label for="swal-input2"  style="text-align:left">Company Name</label>
              <input id="swal-input2" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Company Name" value="${data.companyName}" />
              
              <label for="swal-input3 "  style="text-align:left">Email</label>
              <input id="swal-input3" class="swal2-input" style="width: 80%;  margin-left:10px" placeholder="Email" value="${data.email}" />

              
              <label for="swal-input4 "  style="text-align:left">Phone Number</label>
              <input id="swal-input4" class="swal2-input" style="width: 80%;  margin-left:10px" placeholder="Phone Number" value="${data.phoneNumber}" />
           
           </div>
          `,
          focusConfirm: false,
          preConfirm: () => {
            const name = document.getElementById("swal-input1").value;
            const companyName = document.getElementById("swal-input2").value;
            const email = document.getElementById("swal-input3").value;
            const phoneNumber = document.getElementById("swal-input4").value;
      
            if (!name || !companyName || !email || !phoneNumber) {
              Swal.showValidationMessage(`Please enter all fields`);
              return null;
            }
      
            return { name, companyName, email, phoneNumber };
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Update",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const updatedCompany = result.value;
            updatedCompany.id = data.id;
      
            if (updateCompany !== null || []) {
              const res = await updateCompany(updatedCompany);
              if (res.isSuccess) {
                myToaster.showSuccessToast("Company updated successfully");
                fetchCompanies();
              } else {
                myToaster.showErrorToast(res.message);
              }
            }
          }
        });
      };
  
       primereactDeleteConfirm = (company,deleteSwalHandler) => {
        confirmDialog({
            message: `Are you sure you want to delete the company "${company.companyName}"?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            acceptClassName: 'p-button-secondary',
            rejectClassName: 'p-button-danger',
            className: 'custom-dialog',
            accept:()=>deleteSwalHandler(company.id)
           
        });
    };
      
      
}
const myToaster=new Toaster();
export default myToaster;