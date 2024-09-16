import React from "react";
import "./AdminDashboard.css";
import Card from "../shared/Card";
import { FaEnvelope, FaUsers, FaBriefcase } from "react-icons/fa";

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
      <Card props={myProps} />
    </>
  );
}
