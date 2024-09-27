import React, { useState } from 'react'
import Card from '../shared/Card';
import { FaEnvelope, FaUsers, FaBriefcase } from "react-icons/fa";
import { getAllLeads as fetchAllLeads } from "../../Services/LeadService";
import { useEffect } from 'react';

export default function ExecutiveDashboard() {
    const [leads,setleads]=useState([])
 
 useEffect(() => {
  getAllLeads()
 }, [])
 
 const getAllLeads=async ()=>{
    try {
        const response = await fetchAllLeads();
        setleads(response.result || []); 
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
 }
 const myProps = [
    {
      title: "Total Leads",
      number: leads.length, 
      icon: <FaUsers />,
    },
    {
      title: "Total Lead Sources",
      number: null,
      icon: <FaUsers />,
    },
    {
      title: "Total Sales Managers",
      number: null,
      icon: <FaBriefcase />,
    },
  ];
    return (
    <>
      <Card props={myProps}/>
    </>
  )
}

