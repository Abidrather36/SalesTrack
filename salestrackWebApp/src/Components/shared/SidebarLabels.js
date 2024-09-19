import { FaTachometerAlt, FaEnvelope,FaUser } from "react-icons/fa";

export const PortalAdminsidebarLabels = [
    {
      id: 1,
      label: "Dashboard",
      link: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      label: "Enquiries",
      link: "/admin/enquirylist",
      icon: <FaEnvelope />,
    },
  
  ];
  export const CompanyAdminsidebarLabels = [
    {
      id: 1,
      label: "Dashboard",
      link: "/companyAdmin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      label: "Users List",
      link: "/companyAdmin/userList",
      icon: <FaEnvelope />,
    },
    {
        id: 3,
        label: "Add New User",
        link: "/companyAdmin/add-new-user",
        icon: <FaUser />,
      },
    ]