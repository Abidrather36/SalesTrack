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
import BasicModal from "./AddfollowUpdate";

export default function ExecutiveDashboard() {
  const [leads, setLeads] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [hasFollowUpHistory, setHasFollowUpHistory] = useState(false);
  const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [leadData, setLeadData] = useState({});
  const [followUpHistory, setFollowUpHistory] = useState([]);

  useEffect(() => {
    getAllLeads();
    fetchAllLeadSources();
    fetchTodayFollowUp();
  }, []);

  const manageLead = (lead) => {
    setLeadData(lead);
    setFollowUpdatePopup(true);
    setShowGrid(false);
    setFollowUpHistory(false);
  };

  const fetchTodayFollowUp = async () => {
    const today = new Date().toISOString().split("T")[0];
    await onfetchFollowUpHistory({ date: today }, false);
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

  const onfetchFollowUpHistory = async (data, isCustomSearch = true) => {
    setLoading(true);
    setHasFollowUpHistory(false);

    try {
      const response = await todaysFollowUp(data);
      if (response.isSuccess) {
        const result = Array.isArray(response.result) ? response.result : [response.result];
        if (result.length === 0) {
          if (isCustomSearch) {
            myToaster.showErrorToast("No follow-up history found for the selected date.");
          }
          setLeadTodayFollowUp([]);
          setHasFollowUpHistory(false);
        } else {
          const formattedResult = result
            .map((item) => {
              const date = item.followUpDate ? item.followUpDate.split("T")[0] : null;
              const formattedDate = date ? date.split("-").reverse().join("-") : "";
              return { ...item, followUpDate: formattedDate };
            })
            .sort(
              (a, b) =>
                new Date(b.followUpDate.split("-").reverse().join("-")) -
                new Date(a.followUpDate.split("-").reverse().join("-"))
            );

          setLeadTodayFollowUp(formattedResult);
          setHasFollowUpHistory(formattedResult.length > 0);
        }
      } else {
        if (isCustomSearch) {
          myToaster.showErrorToast(response.message || "Failed to fetch follow-up history.");
        }
        setLeadTodayFollowUp([]);
        setHasFollowUpHistory(false);
      }
    } catch (error) {
      console.error("Error fetching follow-up history:", error);
      if (isCustomSearch) {
        myToaster.showErrorToast("An error occurred while fetching follow-up history.");
      }
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
        </div>
      </h1>

      <div
        style={{ marginLeft: "30px" }}
        className="d-flex justify-content-between align-items-start mb-3"
      >
        <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
          <form
            className="login-form"
            onSubmit={handleSubmit((data) => onfetchFollowUpHistory(data, true))}
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
                  onChange={onDateChange}
                />
              </div>

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

              {leadTodayFollowUp.length > 0 && (
                <div style={{ marginBottom: "22px", alignSelf: "flex-end" }}>
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

      <div>
        {!loading && hasFollowUpHistory ? (
          <Grid
            buttons={[
              {
                key: "add",
                title: "Manage Lead",
                className: "btn btn-warning",
                onAddFollowUpdate: (lead) => manageLead(lead),
                icon: <FaCog />,
              },
            ]}
            headers={headers}
            data={leadTodayFollowUp}
            tableName={
              date
                ? `Follow-up History for ${formatDate(date)}`
                : "Today's Follow-up History"
            }
          />
        ) : !date ? (
          <p style={{ marginLeft: "30px" }}>No follow-up history found Today.</p>
        ) : null}
      </div>

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
