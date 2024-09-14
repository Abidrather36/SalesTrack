// import React from "react";
// import Header from "./Header";
// import Sidebar from "./sidebar";
// import DashboardFooter from "./DashboardFooter";

// function DashboardLayout({children,labelList }) {
//     return (
//       <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
//         <Sidebar sidebarLabels={labelList}/>
//         <div className="h-screen flex-grow-1 overflow-y-lg-auto">
//           < Header/>
//           <main className="py-6 bg-surface-secondary">
//             <div className="container-fluid">{children}</div>
//           </main>
//           <DashboardFooter />
//         </div>
//       </div>
//     );
//   }
  

// export default DashboardLayout;


import React from "react";
import Header from "./Header";
import Sidebar from "./sidebar";
import DashboardFooter from "./DashboardFooter";
import { Outlet } from "react-router-dom"; 

function DashboardLayout({ labelList }) {
  return (
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
      <Sidebar sidebarLabels={labelList} />
      <div className="h-screen flex-grow-1 overflow-y-lg-auto">
        <Header />
        <main className="py-6 bg-surface-secondary">
          <div className="container-fluid">
            <Outlet /> 
          </div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
