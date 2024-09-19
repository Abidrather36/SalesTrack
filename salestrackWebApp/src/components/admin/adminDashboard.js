import React, { useEffect, useState } from "react";
import "../../Components/shared/Dashboard.css"
import Card from "../shared/Card";
import { FaEnvelope, FaUsers, FaBriefcase,FaBuilding  } from "react-icons/fa";
import { getAllEnquiries as fetchAllEnquiries } from "../../Services/AuthService";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    getAllEnquiries();
  }, []);

  const getAllEnquiries = async () => {
    try {
      const response = await fetchAllEnquiries();
      setEnquiries(response.result || []); 
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };


  const myProps = [
    {
      title: "Total Enquiries",
      number: enquiries.length, 
      icon: <FaEnvelope />,
    },
    {
      title: "Total Companies",
      number: 10,
      icon: <FaBuilding />,
    },
   
  ];

  return (
    <>
      <Card props={myProps} />
    </>
  );
}
