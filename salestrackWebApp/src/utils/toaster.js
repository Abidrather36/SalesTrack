import { toast } from "react-toastify";
import Swal from "sweetalert2"
import { updateCompany ,deleteCompanyById, updateAdminProcessStep} from "../Services/CompanyService";
import { confirmDialog } from 'primereact/confirmdialog'; 
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';
import "./toaster.css"
import { updateLead, updateLeadCompany, updateTimeSheet } from "../Services/LeadService";
import { updateUser } from "../Services/UserService";
import { updateEnquiryById } from "../Services/EnquiryService";
import {  updateLeadSourceById } from "../Services/LeadSource";
class Toaster{


    showSuccessToast=(message)=>{
        toast.success(message)
    }
    showErrorToast=(message)=>{
        toast.error(message)
    }
   
    // editLeadSwal = async (lead = {}, userAssignTo, leadSources, fetchLeads) => {
    //   Swal.fire({
    //     title: "Edit Lead",
    //     html: `
    //       <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
    //         <label for="swal-input-name" style="text-align:left">Lead Name</label>
    //         <input id="swal-input-name" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Lead Company Name" value="${lead.leadCompanyName || ''}" />
            
    //         <label for="swal-input-email" style="text-align:left">Email</label>
    //         <input id="swal-input-email" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Email" value="${lead.email || ''}" />
            
    //         <label for="swal-input-phone" style="text-align:left">Phone Number</label>
    //         <input id="swal-input-phone" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Phone Number" value="${lead.phoneNumber || ''}" />
            
    //         <label for="swal-input-contact-person" style="text-align:left">Contact Person</label>
    //         <input id="swal-input-contact-person" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Contact Person" value="${lead.name || ''}" />
            
    //         <label for="swal-input-comment" style="text-align:left">Comment</label>
    //         <input id="swal-input-comment" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Comment" value="${lead.comment || ''}" />
            
    //         <label for="swal-input-assign" style="text-align:left">Assign To</label>
    //         <select id="swal-input-assign" class="swal2-input" style="width: 80%; margin-left:10px">
    //           ${lead.assignTo ? `<option value="${lead.assignTo.id}">${lead.assignTo.name}</option>` : ""}
    //           ${userAssignTo.map(user => `<option value="${user.id}">${user.name}</option>`).join("")}
    //         </select>
            
    //         <label for="swal-input-source" style="text-align:left">Lead Source</label>
    //         <select id="swal-input-source" class="swal2-input" style="width: 80%; margin-left:10px">
    //           ${lead.leadSourceId ? `<option value="${lead.leadSourceId}">${lead.leadSourceName}</option>` : ""}
    //           ${leadSources.map(source => `<option value="${source.id}">${source.leadSourceName}</option>`).join("")}
    //         </select>
            
    //         <label for="swal-input-status" style="text-align:left">Final Status</label>
    //         <select id="swal-input-status" class="swal2-input" style="width: 80%; margin-left:10px">
    //           <option value="1" ${lead.finalStatus === 1 ? "selected" : ""}>Open</option>
    //           <option value="2" ${lead.finalStatus === 2 ? "selected" : ""}>Close</option>
    //           <option value="3" ${lead.finalStatus === 3 ? "selected" : ""}>Success</option>
    //         </select>
    //       </div>
    //     `,
    //     focusConfirm: false,
    //     preConfirm: () => {
    //       const name = document.getElementById("swal-input-name").value;
    //       const email = document.getElementById("swal-input-email").value;
    //       const phoneNumber = document.getElementById("swal-input-phone").value;
    //       const contactPerson = document.getElementById("swal-input-contact-person").value;
    //       const comment = document.getElementById("swal-input-comment").value;
    //       const assignTo = document.getElementById("swal-input-assign").value;
    //       const leadSourceId = document.getElementById("swal-input-source").value;
    //       const finalStatus = Number(document.getElementById("swal-input-status").value);
    
        
    
    //       return { name, email, phoneNumber, contactPerson, comment, assignTo, leadSourceId, finalStatus };
    //     },
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Update",
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       const updatedLead = { ...result.value, id: lead.id };
    
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
      console.log("swal lead",lead)
      Swal.fire({
        title: "Edit Lead",
        html: `
          <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
            <label for="swal-input-leadName" style="text-align:left">Lead Name</label>
            <input id="swal-input-leadName" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Lead Name" value="${lead.leadName || ''}" />
    
            <label for="swal-input-email" style="text-align:left">Email</label>
            <input id="swal-input-email" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Email" value="${lead.email || ''}" />
    
            <label for="swal-input-phone" style="text-align:left">Phone Number</label>
            <input id="swal-input-phone" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Phone Number" value="${lead.phoneNumber || ''}" />
    
            <label for="swal-input-comment" style="text-align:left">Comment</label>
            <input id="swal-input-comment" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Comment" value="${lead.comment || ''}" />
    
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
          const leadName = document.getElementById("swal-input-leadName").value;
          const email = document.getElementById("swal-input-email").value;
          const phoneNumber = document.getElementById("swal-input-phone").value;
          const comment = document.getElementById("swal-input-comment").value;
          const assignTo = document.getElementById("swal-input-assign").value;
          const leadSourceId = document.getElementById("swal-input-source").value;
          const finalStatus = Number(document.getElementById("swal-input-status").value);
    
          return { leadName, email, phoneNumber, comment, assignTo, leadSourceId, finalStatus };
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
              myToaster.showSuccessToast(res.message);
              fetchLeads(); 
            } else {
              myToaster.showErrorToast(res.message);
            }
          } catch (error) {
            myToaster.showErrorToast("Failed to update lead");
          }
        }
      });
    };
    

    editTimeSheet = async (timeSheet = {}, fetchTimeSheetList) => {
      console.log(timeSheet)
      Swal.fire({
        title: "Edit Time Sheet",
        html: `
          <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
            <label for="swal-input-date" style="text-align:left">Date</label>
            <input id="swal-input-date" type="date" class="swal2-input" style="width: 80%; margin-left:10px" value="${timeSheet.date}" />
    
            <label for="swal-input-hours" style="text-align:left">Hours Spent</label>
            <input id="swal-input-hours" type="number" min="0" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Hours Spent" value="${timeSheet.hoursSpent || 0}" />
    
            <label for="swal-input-comment" style="text-align:left">Comment</label>
            <input id="swal-input-comment" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Comment" value="${timeSheet.comment || ''}" />
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const date = document.getElementById("swal-input-date").value;
          const hoursSpent = document.getElementById("swal-input-hours").value;
          const comment = document.getElementById("swal-input-comment").value;
    
          // // Check for empty fields
          // if (!date || hoursSpent === '' || !comment) {
          //   Swal.showValidationMessage(`Please enter all fields`);
          //   return null;
          // }
    
          // Return the timesheet data to be updated
          return { date, hoursSpent: Number(hoursSpent), comment };
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const updatedTimeSheet = { ...result.value, id: timeSheet.id };
    
            const res = await updateTimeSheet(updatedTimeSheet);  
            if (res.isSuccess) {
              myToaster.showSuccessToast(res.message);
              fetchTimeSheetList(); 
            } else {
              myToaster.showErrorToast(res.message);
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
            const name = document.getElementById("swal-input1").value|| null;;
            const companyName = document.getElementById("swal-input2").value|| null;
            const email = document.getElementById("swal-input3").value|| null;
            const phoneNumber = document.getElementById("swal-input4").value|| null;
      
      
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
      FireInputSwalUser = async (data = {}, fetchUsers) => {
        Swal.fire({
            title: "Edit User",
            html: `
                <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
                    <label for="swal-input1" style="text-align:left">Name</label>
                    <input id="swal-input1" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Name" value="${data.name}" />
                    
                    <label for="swal-input2" style="text-align:left">Email</label>
                    <input id="swal-input2" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Email" value="${data.email}" />
                    
                    <label for="swal-input3" style="text-align:left">Phone Number</label>
                    <input id="swal-input3" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Phone Number" value="${data.phoneNumber}" />
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById("swal-input1").value;
                const email = document.getElementById("swal-input2").value;
                const phoneNumber = document.getElementById("swal-input3").value;
    
                if (!name || !email || !phoneNumber) {
                    Swal.showValidationMessage(`Please enter all fields`);
                    return null;
                }
    
                return { name, email, phoneNumber };
            },
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedUser = result.value;
                updatedUser.id = data.id;
    
                if (updateUser !== null || []) {
                    const res = await updateUser(updatedUser);
                    if (res.isSuccess) {
                        myToaster.showSuccessToast("User updated successfully");
                        fetchUsers();
                    } else {
                        myToaster.showErrorToast(res.message);
                    }
                }
            }
        });
    };
    
    FireInputSwalEnquiry = async (data = {}, fetchEnquiries) => {
      console.log("enquiry data inside swal",data.name)
      Swal.fire({
          title: "Edit Enquiry",
          html: `
              <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
                  <label for="swal-input1" style="text-align:left">Enquiry Name</label>
                  <input id="swal-input1" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Name" value="${data.name}" />
                  
                  <label for="swal-input2" style="text-align:left">Email</label>
                  <input id="swal-input2" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Email" value="${data.email}" />
                  
                  <label for="swal-input3" style="text-align:left">Phone Number</label>
                  <input id="swal-input3" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Phone Number" value="${data.phoneNumber}" />
              </div>
          `,
          focusConfirm: false,
          preConfirm: () => {
              const enquiryName = document.getElementById("swal-input1").value;
              const email = document.getElementById("swal-input2").value;
              const phoneNumber = document.getElementById("swal-input3").value;
  
              if (!enquiryName || !email || !phoneNumber) {
                  Swal.showValidationMessage(`Please enter all fields`);
                  return null;
              }
  
              return { enquiryName, email, phoneNumber };
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Update",
      }).then(async (result) => {
          if (result.isConfirmed) {
              const updatedEnquiry = result.value;
              updatedEnquiry.id = data.id;  
              
              const res = await updateEnquiryById(updatedEnquiry);
              if (res.isSuccess) {
                  myToaster.showSuccessToast("Enquiry updated successfully");
                  fetchEnquiries();  
              } else {
                  myToaster.showErrorToast(res.message);
              }
          }
      });
  };
  FireInputSwalAdminProcessStep = async (data = {}, fetchProcessSteps) => {
    console.log("admin process step data inside swal", data.stepName);

    Swal.fire({
        title: "Edit Process Step",
        html: `
            <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
                <label for="swal-input1" style="text-align:left">Process Step Name</label>
                <input id="swal-input1" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Step Name" value="${data.stepName}" />
            </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
            const stepName = document.getElementById("swal-input1").value;

            if (!stepName) {
                Swal.showValidationMessage(`Please enter a valid step name`);
                return null;
            }

            return { stepName };
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const updatedProcessStep = result.value;
            updatedProcessStep.id = data.id; // Preserve the ID of the step

            const res = await updateAdminProcessStep(updatedProcessStep);
            if (res.isSuccess) {
                myToaster.showSuccessToast("Process step updated successfully");
                fetchProcessSteps(); // Refresh the list of process steps
            } else {
                myToaster.showErrorToast(res.message);
            }
        }
    });
};

  
   leadSourceEditSwal = async (data = {},fetchLeadSources ) => {
    Swal.fire({
        title: "Edit Lead Source",
        html: `
            <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
                <label for="swal-input1" style="text-align:left">Lead Source Name</label>
                <input id="swal-input1" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Lead Source Name" value="${data.leadSourceName}" />
                
                <label for="swal-input2" style="text-align:left">Description</label>
                <input id="swal-input2" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Description" value="${data.description}" />
            </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
            const leadSourceName = document.getElementById("swal-input1").value;
            const description = document.getElementById("swal-input2").value;

            // if (!leadSourceName || !description) {
            //     Swal.showValidationMessage(`Please enter all fields`);
            //     return null;
            // }

            return { leadSourceName, description };
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const updatedLeadSource = result.value;
            updatedLeadSource.id = data.id;  

            if (updatedLeadSource !== null && updatedLeadSource !== undefined) {
                const res = await updateLeadSourceById(updatedLeadSource);
                if (res.isSuccess) {
                    myToaster.showSuccessToast(res.message);
                    fetchLeadSources();  
                } else {
                    myToaster.showErrorToast(res.message);
                }
            }
        }
    });
};
 leadCompanyEditSwal = async (data = {}, fetchLeadCompanies) => {
  Swal.fire({
      title: "Edit Lead Company",
      html: `
          <div style="display: grid; grid-template-columns: 30% 1fr; gap: 10px; align-items: center; width: 100%;">
              <label for="swal-input1" style="text-align:left">Lead Company Name</label>
              <input id="swal-input1" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Lead Company Name" value="${data.leadCompanyName}" />
              
              <label for="swal-input2" style="text-align:left">Description</label>
              <input id="swal-input2" class="swal2-input" style="width: 80%; margin-left:10px" placeholder="Description" value="${data.description}" />
          </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
          const leadCompanyName = document.getElementById("swal-input1").value;
          const description = document.getElementById("swal-input2").value;

          return { leadCompanyName, description };
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
  }).then(async (result) => {
      if (result.isConfirmed) {
          const updatedLeadCompany = result.value;
          updatedLeadCompany.id = data.id;  

          if (updatedLeadCompany) {
              const res = await updateLeadCompany(updatedLeadCompany); 
              if (res.isSuccess) {
                  myToaster.showSuccessToast(res.message);
                  fetchLeadCompanies();  
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
    
    primereactDeleteConfirmUser = (user,deletUserHandler) => {
      confirmDialog({
          message: `Are you sure you want to delete the user "${user.name}"?`,
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Yes',
          rejectLabel: 'No',
          acceptClassName: 'p-button-secondary',
          rejectClassName: 'p-button-danger',
          className: 'custom-dialog',
          accept:()=>deletUserHandler(user.id)
         
      });
  };
  primereactDeleteConfirmEnquiry = (enquiry, deleteEnquiryHandler) => {
    confirmDialog({
        message: `Are you sure you want to delete the enquiry "${enquiry.name}"?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        acceptClassName: 'p-button-secondary',
        rejectClassName: 'p-button-danger',
        className: 'custom-dialog',
        accept: () => deleteEnquiryHandler(enquiry.id),  
    });
};
primereactDeleteLeadSource =(leadSource,deleteLeadSourceHandler)=>{
  confirmDialog({
    message: `Are you sure you want to delete the enquiry "${leadSource.name}"?`,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptClassName: 'p-button-secondary',
    rejectClassName: 'p-button-danger',
    className: 'custom-dialog',
    accept: () => deleteLeadSourceHandler(leadSource.id),  
});
}
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
  primereactDeleteLeadCompany =(leadCompany,deleteLeadCompanyHandler)=>{
    confirmDialog({
      message: `Are you sure you want to delete the lead company "${leadCompany.leadCompanyName}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptClassName: 'p-button-secondary',
      rejectClassName: 'p-button-danger',
      className: 'custom-dialog',
      accept: () => deleteLeadCompanyHandler(leadCompany.id)
  })
  }
  

  
      
      
}
const myToaster=new Toaster();
export default myToaster;