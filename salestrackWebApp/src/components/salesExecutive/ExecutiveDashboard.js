import React, { useState } from 'react'
import Card from '../shared/Card';
import { FaEnvelope, FaUsers, FaBriefcase } from "react-icons/fa";
import { getAllLeads as fetchAllLeads } from "../../Services/LeadService";
import { useEffect } from 'react';
import { leadSources } from '../../Services/LeadSource';

export default function ExecutiveDashboard() {
    const [leads,setleads]=useState([])
    const [leadsources,setLeadSources]=useState([])
    const [salesmanager,setSalesManager]=useState([])
 useEffect(() => {
  getAllLeads()
  fetchAllLeadSources()
 }, [])
 
 const getAllLeads=async ()=>{
    try {
        const response = await fetchAllLeads();
        setleads(response.result || []); 
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
 }
 const fetchAllLeadSources=async ()=>{
        try{
          const response=await leadSources();
          setLeadSources(response.result || []);
        }
        catch(error){
        console.error("Error fetching leadSources:", error);

        }
 }
 const myProps = [
    {
      title: "Total Leads",
      number: leads.length, 
      icon: <FaUsers />,
      link:"/salesExecutive/leadList"
    },
    {
      title: "Total Lead Sources",
      number: leadsources.length,
      icon: <FaUsers />,
    },
    {
      title: "Total Sales Managers",
      number: salesmanager.length,
      icon: <FaBriefcase />,
    },
  ];
    return (
    <>
      <Card props={myProps}/>
    </>
  )
}

