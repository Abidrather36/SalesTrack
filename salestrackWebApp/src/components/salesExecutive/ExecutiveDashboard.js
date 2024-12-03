import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import { useForm } from "react-hook-form";
import {
  FaEdit,
  FaPlus,
  FaCog,
  FaTrash,
  FaUsers,
  FaBriefcase,
  FaSyncAlt,
} from "react-icons/fa";
import {
  getAllLeads as fetchAllLeads,
  todaysFollowUp,
} from "../../Services/LeadService";
import { leadSources as fetchLeadSources } from "../../Services/LeadSource";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import myToaster from "../../utils/toaster";
import Grid from "../shared/Grid";
import { CircularProgress } from "@mui/material";
import BasicModal from "./AddfollowUpdate"; // Import the BasicModal component

export default function ExecutiveDashboard() {
  const [leads, setLeads] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(""); // Date selected by the user
  const [hasFollowUpHistory, setHasFollowUpHistory] = useState(false); // Flag to track if there are follow-ups
  const [followUpdatePopup, setFollowUpdatePopup] = useState(false); // Flag to show follow-up modal
  const [showGrid, setShowGrid] = useState(true); // Flag to show the grid
  const [leadData, setLeadData] = useState({}); // To store the selected lead data
  const [followUpHistory, setFollowUpHistory] = useState([]); // Store follow-up history data

  useEffect(() => {
    getAllLeads(); // Fetch all leads
    fetchAllLeadSources(); // Fetch all lead sources
    fetchTodayFollowUp(); // Fetch today's follow-up history immediately
  }, []);

  // Handle click on "Manage Lead" button
  const manageLead = (lead) => {
    setLeadData(lead); // Store the selected lead data
    setFollowUpdatePopup(true); // Show the "Manage Lead" modal
    setShowGrid(false); // Hide the grid
    setFollowUpHistory(false);
  };

  // Fetch today's follow-up history
  const fetchTodayFollowUp = async () => {
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
    await onfetchFollowUpHistory({ date: today });
  };

  const getAllLeads = async () => {
    try {
      const response = await fetchAllLeads();
      setLeads(response.result || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const fetchAllLeadSources = async () => {
    try {
      const response = await fetchLeadSources();
      setLeadSources(response.result || []);
    } catch (error) {
      console.error("Error fetching lead sources:", error);
    }
  };

  const onfetchFollowUpHistory = async (data) => {
    setLoading(true);
    setHasFollowUpHistory(false); // Reset the flag before fetching

    try {
      const response = await todaysFollowUp(data);
      if (response.isSuccess) {
        const result = Array.isArray(response.result)
          ? response.result
          : [response.result];
        const formattedResult = result
          .map((item) => {
            const date = item.followUpDate
              ? item.followUpDate.split("T")[0]
              : null;
            const formattedDate = date
              ? date.split("-").reverse().join("-")
              : "";
            return { ...item, followUpDate: formattedDate };
          })
          .sort(
            (a, b) =>
              new Date(b.followUpDate.split("-").reverse().join("-")) -
              new Date(a.followUpDate.split("-").reverse().join("-"))
          );

        setLeadTodayFollowUp(formattedResult);
        setHasFollowUpHistory(formattedResult.length > 0); // Set flag based on whether any follow-ups exist

        if (formattedResult.length === 0) {
          myToaster.showErrorToast("No follow-up history found Today");
        }
      } else {
        setHasFollowUpHistory(false); // Ensure the flag is false if no success
      }
    } catch (error) {
      console.error("Error fetching follow-up history:", error);
      setLeadTodayFollowUp([]);
      setHasFollowUpHistory(false);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRefresh = () => {
    getAllLeads();
    fetchAllLeadSources();
    setDate("");
    fetchTodayFollowUp();
    setHasFollowUpHistory(false);
    if (leadTodayFollowUp.length > 0) {
      setLeadTodayFollowUp([]);
      setLeads([]);
    }
  };

  const headers = [
    { key: "leadCompanyName", label: "Lead Company Name" },
    { key: "clientName", label: "Client Name" },
    { key: "leadProcessStep", label: "Lead Process Step" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "leadComments", label: "Lead Comments" },
    { key: "followUpDate", label: "Follow-up Date" },
  ];
  const user = JSON.parse(localStorage.getItem("user"));
  // const myProps = [
  //   {
  //     title: "Total Leads",
  //     number: leads.length,
  //     icon: <FaUsers />,
  //     link: "/salesExecutive/leadList",
  //   },
  //   {
  //     title: "Total Lead Sources",
  //     number: leadSources.length,
  //     icon: <FaUsers />,
  //     link: "/salesExecutive/leadSourceList",
  //   },
  //   {
  //     title: "Today's Follow Up",
  //     number: leadTodayFollowUp.length,
  //     icon: <FaBriefcase />,
  //   },
  // ];
  const myProps = [
    {
      title: "Total Leads",
      number: leads.length,
      icon: <FaUsers />,
      link:
        user?.userRole === 3
          ? "/salesExecutive/leadList"
          : "/salesManager/leadList",
    },
    {
      title: "Total Lead Sources",
      number: leadSources.length,
      icon: <FaUsers />,
      link:
        user?.userRole === 3
          ? "/salesExecutive/leadSourceList"
          : "/salesManager/leadSourceList",
    },
    {
      title: "Today's Follow Up",
      number: leadTodayFollowUp.length,
      icon: <FaBriefcase />,
    },
  ];
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Handle date selection
  const onDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  return (
    <>
      <Card props={myProps} />
      <h1
        className="text-primary"
        style={{
          fontSize: "1.3em",
          textAlign: "left",
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "30px",
        }}
      >
        <div>
          <span>Search Follow-Up History </span>
          <i
            className="fas fa-arrow-down"
            style={{ display: "block", marginTop: "5px", marginLeft: "80px" }}
          ></i>
        </div>
      </h1>

      {/* Search Form */}
      <div
        style={{ marginLeft: "30px" }}
        className="d-flex justify-content-between align-items-start mb-3"
      >
        <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
          <form
            className="login-form"
            onSubmit={handleSubmit(onfetchFollowUpHistory)}
            autoComplete="off"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              {/* Date Input Field */}
              <div style={{ marginBottom: "22px" }}>
                <label
                  style={{ marginBottom: "20px" }}
                  className="h6 font-semibold text-primary text-sm d-block mb-2"
                >
                  Select Date
                </label>

                {errors.date && (
                  <span
                    className="error-message"
                    style={{ color: "red", marginBottom: "5px" }}
                  >
                    {errors.date.message}
                  </span>
                )}

                <InputField
                  type="date"
                  value={date}
                  style={{
                    padding: "0px 1.25rem 0 1.12rem",
                    maxWidth: "300px",
                  }}
                  {...register("date", { required: "Date is required" })}
                  onChange={onDateChange} // Update date state on date change
                />
              </div>

              {/* Submit Button */}
              <div style={{ marginBottom: "22px", alignSelf: "flex-end" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ marginBottom: "25px", height: "50px" }}
                >
                  {loading ? <Spin /> : "Search"}
                </button>
              </div>

              {/* Refresh Button */}
              {leadTodayFollowUp.length > 0 && (
                <div
                  style={{
                    marginBottom: "22px",
                    alignSelf: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRefresh}
                    style={{ marginBottom: "25px", height: "50px" }}
                  >
                    <FaSyncAlt /> Refresh
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Follow-up History Table */}
      <div>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "30px" }}
          >
            <CircularProgress />
          </div>
        ) : !hasFollowUpHistory ? (
          date ? (
            <p style={{marginLeft:"30px"}}>No follow-up history found for {formatDate(date)}.</p>
          ) : (
            <p>No follow-up history found Today.</p>
          )
        ) : (
          <Grid
            buttons={[
              {
                key: "add",
                title: "Manage Lead",
                className: "btn btn-warning",
                onAddFollowUpdate: (lead) => manageLead(lead), // Open the modal on "Manage Lead"
                icon: <FaCog />,
              },
            ]}
            headers={headers}
            data={leadTodayFollowUp}
            loading={loading}
            tableName={
              date
                ? `Follow-up History for ${formatDate(date)}`
                : "Today's Follow-up History"
            }
          />
        )}
      </div>

      {/* Follow-up Modal */}
      {followUpdatePopup && (
        <BasicModal
          leadData={leadData} 
          onClose={() => setFollowUpdatePopup(false)}
          popupForm={true}
          leadIdKey="leadId"
          context="salesExecutive"
        />
      )}
    </>
  );
}


