import React, { useEffect, useState } from "react";
import "../../Components/shared/Dashboard.css"
import Card from "../shared/Card";
import { FaEnvelope, FaUsers, FaBriefcase } from "react-icons/fa";
import { UserList as fetchAllUsers } from "../../Services/CompanyService";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetchAllUsers();
      setUsers(response.result || []); 
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };


  const myProps = [
    {
      title: "Total Users",
      number: users.length, 
      icon: <FaUsers />,
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
