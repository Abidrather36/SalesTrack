import React from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import DashboardLayout from "../shared/DashboardLayout";
import ContexMenu from "../shared/ConextMenu";
import ThreeDotMenu from "../shared/ConextMenu"
import AddUserForm from "./AddUser";
export default function AdminDashboard() {
  const labelsList = [
    { label: "Dashboard", link: "/admin/dashboard" },
    { label: "Enquiries", link: "/admin/enquirylist" },
    { label: "AddUser", link: "/admin/adduser" },
  ];
  return (
    <>
   <AddUserForm/>
      {/* <DashboardLayout labelList={labelsList} /> */}
    </>
  );
}
