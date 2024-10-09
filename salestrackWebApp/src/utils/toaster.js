import { toast } from "react-toastify";
import Swal from "sweetalert2"
import { updateCompany ,deleteCompanyById} from "../Services/CompanyService";
import { confirmDialog } from 'primereact/confirmdialog'; 
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';
import "./toaster.css"
import { updateLead } from "../Services/LeadService";
class Toaster{


    showSuccessToast=(message)=>{
        toast.success(message)
    }
    showErrorToast=(message)=>{
        toast.error(message)
    }
    //  editLeadSwal = async (lead = {},userAssignTo,leadSources, fetchLeads) => {
    //   Swal.fire({
    //     title: "Edit Lead",
    //     html: `
    //          <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
    //         <label for="swal-input1" style="text-align:left">Lead Name</label>
    //         <input id="swal-input1" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Lead Name" value="${lead.name}" />
            
    //         <label for="swal-input2" style="text-align:left">Email</label>
    //         <input id="swal-input2" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Email" value="${lead.email}" />
            
    //         <label for="swal-input3" style="text-align:left">Phone Number</label>
    //         <input id="swal-input3" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Phone Number" value="${lead.phoneNumber}" />
            
    //         <label for="swal-input4" style="text-align:left">Comment</label>
    //         <input id="swal-input4" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Comment" value="${lead.comment}" />
            
    //         <label for="swal-input5" style="text-align:left">Assign To</label>
    //         <select id="swal-input5" class="swal2-input" style="width: 80%; margin-left:10px">
    //           ${lead.assignTo ? `<option value="${lead.assignTo.id}">${lead.assignTo.name}</option>` : ""}
    //           ${userAssignTo.map(user => `<option value="${user.id}">${user.name}</option>`).join("")}
    //         </select>
            
    //         <label for="swal-input6" style="text-align:left">Lead Source</label>
    //         <select id="swal-input6" class="swal2-input" style="width: 80%; margin-left:10px">
    //           ${lead.leadSourceId ? `<option value="${lead.leadSourceId}">${lead.leadSourceName}</option>` : ""}
    //           ${leadSources.map(source => `<option value="${source.id}">${source.leadSourceName}</option>`).join("")}
    //         </select>
            
    //         <label for="swal-input7" style="text-align:left">Final Status</label>
    //         <select id="swal-input7" class="swal2-input" style="width: 80%; margin-left:10px">
    //           <option value="1" ${lead.finalStatus === 1 ? "selected" : ""}>Open</option>
    //           <option value="2" ${lead.finalStatus === 2 ? "selected" : ""}>Close</option>
    //           <option value="3" ${lead.finalStatus === 3 ? "selected" : ""}>Success</option>
    //         </select>
    //       </div>
    //     `,
    //     focusConfirm: false,
    //     preConfirm: () => {
    //       const name = document.getElementById("swal-input1").value;
    //       const email = document.getElementById("swal-input2").value;
    //       const phoneNumber = document.getElementById("swal-input3").value;
    //       const comment = document.getElementById("swal-input4").value;
    //       const assignToId = document.getElementById("swal-input5").value;
    //       const leadSourceId = document.getElementById("swal-input6").value;
    //       const finalStatus = document.getElementById("swal-input7").value;
    
    //       if (!name || !email || !phoneNumber || !assignToId || !leadSourceId || !finalStatus) {
    //         Swal.showValidationMessage(`Please enter all fields`);
    //         return null;
    //       }
    
    //       return { name, email, phoneNumber, comment, assignToId, leadSourceId, finalStatus };
    //     },
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Update",
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       const updatedLead = { ...result.value, id: lead.id };
    //             updateLead.id=lead.id
    //       try {
    //         const res = await updateLead(updatedLead);
    //         if (res.isSuccess) {
    //           myToaster.showSuccessToast("Lead updated successfully");
    //           fetchLeads();
    //         } else {
    //           myToaster.showErrorToast(res.message);
    //         }
    //       } catch (error) {
    //         myToaster.showErrorToast("Failed to update lead");
    //       }
    //     }
    //   });
    // };
    editLeadSwal = async (lead = {}, userAssignTo, leadSources, fetchLeads) => {
      Swal.fire({
        title: "Edit Lead",
        html: `
          <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
            <label for="swal-input-name" style="text-align:left">Lead Name</label>
            <input id="swal-input-name" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Lead Name" value="${lead.name}" />
            
            <label for="swal-input-email" style="text-align:left">Email</label>
            <input id="swal-input-email" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Email" value="${lead.email}" />
            
            <label for="swal-input-phone" style="text-align:left">Phone Number</label>
            <input id="swal-input-phone" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Phone Number" value="${lead.phoneNumber}" />
            
            <label for="swal-input-comment" style="text-align:left">Comment</label>
            <input id="swal-input-comment" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Comment" value="${lead.comment}" />
            
            <label for="swal-input-assign" style="text-align:left">Assign To</label>
            <select id="swal-input-assign" class="swal2-input" style="width: 80%; margin-left:10px">
              ${lead.assignTo ? `<option value="${lead.assignTo.id}">${lead.assignTo.name}</option>` : ""}
              ${userAssignTo.map(user => `<option value="${user.id}">${user.name}</option>`).join("")}
            </select>
            
            <label for="swal-input-source" style="text-align:left">Lead Source</label>
            <select id="swal-input-source" class="swal2-input" style="width: 80%; margin-left:10px">
              ${lead.leadSourceId ? `<option value="${lead.leadSourceId}">${lead.leadSourceName}</option>` : ""}
              ${leadSources.map(source => `<option value="${source.id}">${source.leadSourceName}</option>`).join("")}
            </select>
            
            <label for="swal-input-status" style="text-align:left">Final Status</label>
            <select id="swal-input-status" class="swal2-input" style="width: 80%; margin-left:10px">
              <option value="1" ${lead.finalStatus === 1 ? "selected" : ""}>Open</option>
              <option value="2" ${lead.finalStatus === 2 ? "selected" : ""}>Close</option>
              <option value="3" ${lead.finalStatus === 3 ? "selected" : ""}>Success</option>
            </select>
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const name = document.getElementById("swal-input-name").value;
          const email = document.getElementById("swal-input-email").value;
          const phoneNumber = document.getElementById("swal-input-phone").value;
          const comment = document.getElementById("swal-input-comment").value;
          const assignTo = document.getElementById("swal-input-assign").value;
          const leadSourceId = document.getElementById("swal-input-source").value;
          const finalStatus = Number(document.getElementById("swal-input-status").value);
    
          // Check for empty fields
          if (!name || !email || !phoneNumber || !assignTo || !leadSourceId || !finalStatus) {
            Swal.showValidationMessage(`Please enter all fields`);
            return null;
          }
    
          // Return the lead data to be updated
          return { name, email, phoneNumber, comment, assignTo, leadSourceId, finalStatus };
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatedLead = { ...result.value, id: lead.id };
    
          try {
            const res = await updateLead(updatedLead);
            if (res.isSuccess) {
              myToaster.showSuccessToast("Lead updated successfully");
              fetchLeads(); // Fetch updated leads after success
            } else {
              myToaster.showErrorToast(res.message);
            }
          } catch (error) {
            myToaster.showErrorToast("Failed to update lead");
          }
        }
      });
    };
    
      
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
    primereactDeleteConfirmLead = (lead, deleteLeadHandler) => {
      confirmDialog({
          message: `Are you sure you want to delete the lead "${lead.name}"?`, 
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Yes',
          rejectLabel: 'No',
          acceptClassName: 'p-button-secondary',
          rejectClassName: 'p-button-danger',
          className: 'custom-dialog',
          accept: () => deleteLeadHandler(lead.id) 
      });
  };
  
      
      
}
const myToaster=new Toaster();
export default myToaster;