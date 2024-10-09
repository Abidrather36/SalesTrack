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
      link:"/salesExecutive/leadList",
      
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

// import React, { useState, useEffect } from 'react';
// import Card from '../shared/Card';
// import { FaUsers, FaBriefcase } from "react-icons/fa";
// import { getAllLeads as fetchAllLeads } from "../../Services/LeadService";
// import { leadSources } from '../../Services/LeadSource';

// export default function ExecutiveDashboard() {
//   const [leads, setLeads] = useState([]);
//   const [leadSourcesData, setLeadSources] = useState([]);
//   const [salesManagers, setSalesManagers] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     getAllData(); 
//   }, []);

//   const getAllData = async () => {
//     setLoading(true); 
//     try {
//       await Promise.all([getAllLeads(), fetchAllLeadSources()]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     setLoading(false); 
//   };

//   const getAllLeads = async () => {
//     try {
//       const response = await fetchAllLeads();
//       setLeads(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//     }
//   };

//   const fetchAllLeadSources = async () => {
//     try {
//       const response = await leadSources();
//       setLeadSources(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leadSources:", error);
//     }
//   };

//   const myProps = [
//     {
//       title: "Total Leads",
//       number: leads.length,
//       icon: <FaUsers />,
//       link: "/salesExecutive/leadList",
//     },
//     {
//       title: "Total Lead Sources",
//       number: leadSourcesData.length,
//       icon: <FaUsers />,
//     },
//     {
//       title: "Total Sales Managers",
//       number: salesManagers.length,
//       icon: <FaBriefcase />,
//     },
//   ];

//   return (
//     <>
//       <Card props={myProps} loading={loading} /> 
//     </>
//   );
// }
