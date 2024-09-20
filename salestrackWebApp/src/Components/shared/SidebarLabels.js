import { FaTachometerAlt, FaEnvelope,FaUser,FaPlus,FaListAlt } from "react-icons/fa";

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
    {
      id: 1,
      label: "Add Company",
      link: "/admin/add-new-company",
      icon: <FaPlus />,
    },
    {
      id: 2,
      label: "Company List",
      link: "/admin/companylist",
      icon: <FaListAlt />,
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