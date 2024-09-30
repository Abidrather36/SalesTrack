import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { getAllLeads } from "../../Services/LeadService";
import { useNavigate } from "react-router-dom";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { useForm } from "react-hook-form";
import { leadSources as getLeadSources } from "../../Services/LeadSource";
import myToaster from "../../utils/toaster";
import { updateLead } from "../../Services/LeadService";

function LeadList() {
  const [leads, setLeads] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editLeadData, setEditLeadData] = useState({name:"",email:""});
  const [leadSources, setLeadSources] = useState([]);
  const[leadData,setLeadData]=useState({})

  useEffect(() => {
    fetchAllLeads();
    fetchLeadSources();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchLeadSources = async () => {
    try {
      const res = await getLeadSources();
      setLeadSources(res.result);
    } catch (error) {
      myToaster.showErrorToast("Failed to load lead sources.");
    }
  };

  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Lead Source" },
    { key: "comment", label: "Comment" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "userRole", label: "User Role" },
    { key: "isActive", label: "Is Active" },
    { key: "companyName", label: "Company Name" },
  ];

  const editLead = (lead) => {
    setLeadData(lead);
    setShowGrid(false);
    setShowForm(true);
    console.log(leadData)

  };

  const submitLeadForm=async (e)=>{
  e.preventDefault()
   var result=await updateLead(leadData);
   if(result.isSuccess){
    console.log(result)
    myToaster.showSuccessToast(result.message)
   }
   else{
    myToaster.showErrorToast(result.message)
   }
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditLeadData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const deleteLead = (leadId) => {
    console.log(leadId);
  };

  const fetchAllLeads = async () => {
    try {
      const response = await getAllLeads();
      setLeads(response.result);
      
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showGrid && (
        <div>
          <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "leads" }} />
          <Grid
            headers={headers}
            buttons={[
              {
                key: "edit",
                title: "Edit",
                className: "btn btn-primary",
                onEditHandler: (lead) => editLead(lead),
                icon: <FaEdit />,
              },
              {
                key: "delete",
                title: "Delete",
                className: "btn btn-danger",
                onDeleteHandler: (lead) => deleteLead(lead.id),
                icon: <FaTrash />,
              },
            ]}
            data={leads}
            loading={loading}
            onAdd={() => navigate("/companyAdmin/add-new-lead")}
            tableName="Leads"
            addButtonLabel="Add Lead"
          />
        </div>
      )}

      {showForm && (
        <div className="addForm">
          <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "Update-Lead" }} />
          <div className="row justify-content-center" style={{ padding: "20px" }}>
            <div className="col-lg-8 mb-4-lg-0">
              <div
                className="login-container"
                style={{
                  background: "#fff",
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
              >
                <h2 className="form-title">Edit Lead</h2>
                <form className="login-form" onSubmit={submitLeadForm} autoComplete="off">
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="text"
                        name="name"
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })} 
                        placeholder="Lead Name"
                      />
                      {errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={leadData.email}
                        onChange={(e)=>setLeadData({...leadData, email:e.target.value})} // Updated
                       
                      />
                      {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="text"
                        name="phoneNumber"
                        value={leadData.phoneNumber}
                        placeholder="Phone Number"
                        onChange={(e)=>setLeadData({...leadData,phoneNumber:e.target.value})} // Updated
                      />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        as="select"
                        name="leadSourceId"
                        value={leadData.leadSourceId}
                        onChange={(e)=>setLeadData({...leadData,leadSourceId:e.target.value})} // Updated
                      >
                        <option value="">Select Lead Source</option>
                        {leadSources.map((source) => (
                          <option key={source.id} value={source.id}>
                            {source.leadSourceName}
                          </option>
                        ))}
                      </InputField>
                      {errors.leadSourceId && <span className="text-danger">{errors.leadSourceId.message}</span>}
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="text"
                        name="comment"
                        value={leadData.comment}
                        placeholder="Comment"
                        onChange={(e)=>{setLeadData({...leadData, comment :e.target.value})}} // Updated
                      />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        as="select"
                        name="assignTo"
                        value={leadData.assignTo}
                        onChange={(e)=>{setLeadData({...leadData, assignTo :e.target.value})}} 
                      >
                        <option value="">Assign To</option>
                        <option value="7EC27075-3A19-4BB8-A5FF-A20EF959155D">Ram</option>
                      </InputField>
                      {errors.assignTo && <span className="error-message">{errors.assignTo.message}</span>}
                    </div>
                  </div>

                  {loading ? (
                    <button type="submit" className="login-button" disabled>
                      <Spin />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                      update Lead
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeadList;
