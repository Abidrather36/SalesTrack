
import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import { useForm } from "react-hook-form";
import { FaUsers, FaBriefcase, FaSyncAlt } from "react-icons/fa";
import {
  getAllLeads as fetchAllLeads,
  todaysFollowUp,
} from "../../Services/LeadService";
import { leadSources as fetchLeadSources } from "../../Services/LeadSource";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import myToaster from "../../utils/toaster";
import Grid from "../shared/Grid";

export default function ExecutiveDashboard({ leadData }) {
  const [leads, setLeads] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch leads and lead sources on component mount
  useEffect(() => {
    getAllLeads();
    fetchAllLeadSources();
  }, []);

  // Fetch leads
  const getAllLeads = async () => {
    try {
      const response = await fetchAllLeads();
      setLeads(response.result || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const onSubmit = (data) => {
    setLeadTodayFollowUp([]);
    onfetchFollowUpHistory(data);
  };

  // Fetch lead sources
  const fetchAllLeadSources = async () => {
    try {
      const response = await fetchLeadSources();
      setLeadSources(response.result || []);
    } catch (error) {
      console.error("Error fetching lead sources:", error);
    }
  };

  // Fetch today's follow-up data
  const onfetchFollowUpHistory = async (data) => {
    setLoading(true);
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
            return {
              ...item,
              followUpDate: formattedDate,
            };
          })
          .sort(
            (a, b) =>
              new Date(b.followUpDate.split("-").reverse().join("-")) -
              new Date(a.followUpDate.split("-").reverse().join("-"))
          );
        setLeadTodayFollowUp(formattedResult);
        myToaster.showSuccessToast(response.message);
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      console.error("Error fetching follow-up history:", error);
      setLeadTodayFollowUp([]); // Clear follow-up history on error
      myToaster.showErrorToast("Failed to fetch follow-up data.");
    } finally {
      setLoading(false);
    }
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Refresh button handler
  const handleRefresh = () => {
    getAllLeads(); // Fetch the latest leads
    fetchAllLeadSources(); // Fetch the latest lead sources
    if (leadTodayFollowUp.length > 0) {
      setLeadTodayFollowUp([]); // Clear previous follow-ups if necessary
      setLeads([]);
    }
  };

  const headers = [
    { key: "clientName", label: "Client Name" },
    { key: "leadProcessStep", label: "Lead Process Step" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "leadComments", label: "Lead Comments" },
    { key: "followUpDate", label: "Follow-up Date" },
  ];

  const myProps = [
    {
      title: "Total Leads",
      number: leads.length,
      icon: <FaUsers />,
      link: "/salesExecutive/leadList",
    },
    {
      title: "Total Lead Sources",
      number: leadSources.length,
      icon: <FaUsers />,
      link:"/salesExecutive/leadSourceList"
    },
    {
      title: "Today's Follow Up",
      number: leadTodayFollowUp.length,
      icon: <FaBriefcase />,
    },
  ];

  return (
    <>
      <Card props={myProps} />
      <h1
        style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "1.5em",
          color: "black",
          textAlign: "left",
          marginTop: "20px",
          marginBottom: "20px",
          textShadow: "1px 1px 2px #bdc3c7",
          marginLeft: "30px",
        }}
      >
        TODAY'S FOLLOWUP HISTORY
      </h1>

      <div
        style={{ marginLeft: "30px" }}
        className="d-flex justify-content-between align-items-start mb-3"
      >
        <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
          <form
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
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
                  className="h6 font-semibold text-muted text-sm d-block mb-2"
                >
                  Select Date
                </label>

                {/* Move the error message above the input field */}
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
                  style={{
                    padding: "0px 1.25rem 0 1.12rem",
                    maxWidth: "300px",
                  }}
                  {...register("date", { required: "Date is required" })}
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

              {/* Conditionally rendered Refresh Button */}
              {leadTodayFollowUp.length > 0 && (
                <div style={{ marginBottom: "22px", alignSelf: "flex-end",marginBottom: "22px", marginLeft: "auto",  }}>
                  <button
                    type="button"
                    className="btn btn-secondary d-flex align-items-center justify-content-center"
                    onClick={handleRefresh}
                    style={{
                      marginTop:"-30px",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%", // Makes the button circular
                      padding: "10px",
                      position:"absolute",
                      marginLeft:"500px"
                    }}
                  >
                    <FaSyncAlt style={{ fontSize: "1.2rem" }} />
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Follow-up History Grid */}
      <div>
        {loading ? (
          <p style={{ marginLeft: "32px" }}>Loading...</p>
        ) : leadTodayFollowUp.length === 0 ? (
          <p style={{ marginLeft: "32px" }}></p>
        ) : (
          <Grid
            headers={headers}
            data={Array.isArray(leadTodayFollowUp) ? leadTodayFollowUp : []}
            loading={loading}
            tableName="Today's Follow-up"
          />
        )}
      </div>
    </>
  );
}
