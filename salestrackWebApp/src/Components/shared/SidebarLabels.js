import { FaTachometerAlt, FaEnvelope,FaUser } from "react-icons/fa";
export const sidebarLabels = [
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
        id: 3,
        label: "Add New User",
        link: "/admin/add-new-user",
        icon: <FaUser />,
      },
      {
        id: 3,
        label: "User List",
        link: "/admin/users",
        icon: <FaUser />,
      },
  ];