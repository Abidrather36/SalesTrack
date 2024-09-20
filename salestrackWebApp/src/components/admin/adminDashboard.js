import React, { useEffect, useState } from "react";
import Card from "../shared/Card";
import { FaEnvelope, FaUsers, FaBriefcase,FaBuilding  } from "react-icons/fa";
import { getAllEnquiries as fetchAllEnquiries } from "../../Services/AuthService";
import { getCompanies } from "../../Services/CompanyService"

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [companies, setCompanies] = useState([]);


  useEffect(() => {
    getAllEnquiries();
    getAllCompanies();
  }, []);

  const getAllEnquiries = async () => {
    try {
      const response = await fetchAllEnquiries();
      setEnquiries(response.result || []); 
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };
  const getAllCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.result || []); 
    } catch (error) {
      console.error("Error fetching companies:", error);
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
      number:companies.length, 
      icon: <FaBuilding />,
    },
   
  ];

  return (
    <>
      <Card props={myProps} />
    </>
  );
}
