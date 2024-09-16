import React from "react";
import "./AdminDashboard.css";
<<<<<<< Updated upstream
import Card from "../shared/Card";
import { FaEnvelope, FaUsers, FaBriefcase } from "react-icons/fa";

=======
import { Link } from "react-router-dom";
import DashboardLayout from "../shared/DashboardLayout";
import AddUserForm from "./AddUser";
>>>>>>> Stashed changes
export default function AdminDashboard() {
  const myProps = [
    {
      title: "Total Enquiries",
      number: 10,
      icon: <FaEnvelope />,
    },
    {
      title: "Total Sales Executives",
      number: 20,
      icon: <FaUsers />,
    },
    {
      title: "Total Sales Managers",
      number: 7,
      icon: <FaBriefcase />,
    },
  ];
  return (
    <>
<<<<<<< Updated upstream
      <Card props={myProps} />
=======
   {/* <AddUserForm/> */}
      {/* <DashboardLayout labelList={labelsList} /> */}
>>>>>>> Stashed changes
    </>
  );
}
