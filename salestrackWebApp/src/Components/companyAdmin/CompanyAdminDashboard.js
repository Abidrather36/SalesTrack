import React, { useEffect, useState } from "react";
import Card from "../shared/Card";
import { FaEnvelope, FaUsers, FaBriefcase } from "react-icons/fa";
import { UserLists as fetchAllUsers } from "../../Services/UserService";
import { UserRole } from "../../Models/Enums/userRole";

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

  const totalSalesExecutives = users.filter(user => user.userType === 1).length;
  const totalSalesManagers = users.filter(user => user.userType === 2).length;
  const myProps = [
    {
      title: "Total Users",
      number: users.length, 
      icon: <FaUsers />,
    },
    {
      title: "Total Sales Executives",
      number: totalSalesExecutives,
      icon: <FaUsers />,
    },
    {
      title: "Total Sales Managers",
      number: totalSalesManagers,
      icon: <FaBriefcase />,
    },
  ];

  return (
    <>
      <Card props={myProps} />
    </>
  );
}
