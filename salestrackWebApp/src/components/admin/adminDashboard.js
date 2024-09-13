import React from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import DashboardLayout from "../shared/DashboardLayout";
export default function AdminDashboard() {
  const labelsList = [
    { label: "Dashboard", link: "/admin/dashboard" },
    { label: "Enquiries", link: "/admin/enquirylist" },
    { label: "Abid", link: "/admin/abid" },
  ];
  return (
    <>
      <DashboardLayout
       labelList={labelsList}
      
      />
    </>
  );
}
