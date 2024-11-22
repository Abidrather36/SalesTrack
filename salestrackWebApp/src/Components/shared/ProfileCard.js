import React from "react";
import "./ProfileCard.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import BreadcrumbComponent from "./Breadcrumb";

function ProfilePage() {
  const getUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || {};
  };
  const user = getUserData();

  const Props = {
    fullName: user.fullName || "Unknown User",
    email: user.email || "Not Provided",
    phoneNumber: user.phoneNumber || "Not Available",
    userRole:
      user.userRole === 1
        ? "Admin"
        : user.userRole === 2
        ? "Company Admin"
        : user.userRole === 3
        ? "salesExecutive"
        : user.userRole === 4
        ? "Sales Manager"
        : "Unknown Role",
  };

  return (
    <>
      <MDBRow>
        <MDBCol>
          <BreadcrumbComponent
            style={{ fontSize: "large", color: "#333" }}
            labels={{ module: Props.userRole, currentRoute: "Profile" }}
          />
        </MDBCol>
      </MDBRow>
      <section style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <MDBContainer className="py-5">
          <MDBRow className="justify-content-center">
            <MDBCol lg="4" className="mb-4">
              <MDBCard className="profile-card shadow-sm">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="User Avatar"
                    className="rounded-circle"
                    style={{ width: "150px", border: "3px solid #007bff" }}
                    fluid
                  />
                  <h5 className="mt-3">{Props.fullName}</h5>
                  <p className="text-muted mb-1">{Props.userRole}</p>
                  <p className="text-muted mb-4">Bengaluru, Karnataka</p>
                  <MDBBtn color="primary" className="mt-2" href="#">
                    Edit Profile
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{Props.fullName}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{Props.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{Props.phoneNumber}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        Kalyanagar, Bengaluru, Karnataka
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

export default ProfilePage;

// import React from "react";
// import "./ProfileCard.css";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
// } from "mdb-react-ui-kit";
// import BreadcrumbComponent from "./Breadcrumb";

// function ProfilePage() {
//   const getUserData = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user || {};
//   };

//   const user = getUserData();

//   const Props = {
//     fullName: user.fullName || "",
//     email: user.email || "",
//     phoneNumber: user.phoneNumber || "",
//     userRole:
//       user.userRole === 1
//         ? "Admin"
//         : user.userRole === 2
//         ? "CompanyAdmin"
//         : user.userRole === 3
//         ? "SalesExecutive"
//         : user.userRole === 4
//         ? "SalesManager"
//         : "Unknown",
//   };

//   return (
//     <>
//       <MDBRow>
//         <MDBCol>
//           <BreadcrumbComponent
//             style={{ fontSize: "large", color: "#495057" }}
//             labels={{ module: Props.userRole, currentRoute: "Profile" }}
//           />
//         </MDBCol>
//       </MDBRow>
//       <section style={{ backgroundColor: "#f8f9fa" }}>
//         <MDBContainer className="py-5">
//           <MDBRow className="justify-content-center">
//             <MDBCol lg="4" md="6" sm="12" className="mb-4">
//               <MDBCard className="text-center shadow-lg rounded">
//                 <MDBCardBody>
//                   <MDBCardImage
//                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                     alt="avatar"
//                     className="rounded-circle mx-auto"
//                     style={{
//                       width: "120px",
//                       height: "120px",
//                       border: "4px solid #00b4d8",
//                       boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//                       marginBottom: "15px",
//                     }}
//                     fluid
//                   />
//                   <h5 className="mb-1" style={{ fontWeight: "600" }}>
//                     {Props.fullName}
//                   </h5>
//                   <p
//                     className="text-muted mb-3"
//                     style={{ fontSize: "0.9rem", fontWeight: "500" }}
//                   >
//                     {Props.userRole}
//                   </p>
//                   <div className="d-flex justify-content-center">
//                     <button
//                       className="btn btn-primary btn-sm mx-2"
//                       style={{ borderRadius: "20px", fontSize: "0.85rem" }}
//                     >
//                       Message
//                     </button>
//                     <button
//                       className="btn btn-outline-secondary btn-sm mx-2"
//                       style={{ borderRadius: "20px", fontSize: "0.85rem" }}
//                     >
//                       Edit Profile
//                     </button>
//                   </div>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//             <MDBCol lg="8" md="12">
//               <MDBCard className="shadow rounded">
//                 <MDBCardBody>
//                   <MDBRow className="mb-3">
//                     <MDBCol sm="3">
//                       <MDBCardText className="text-muted">
//                         Full Name
//                       </MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText style={{ fontWeight: "500" }}>
//                         {Props.fullName}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow className="mb-3">
//                     <MDBCol sm="3">
//                       <MDBCardText className="text-muted">Email</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText style={{ fontWeight: "500" }}>
//                         {Props.email}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow className="mb-3">
//                     <MDBCol sm="3">
//                       <MDBCardText className="text-muted">Phone</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText style={{ fontWeight: "500" }}>
//                         {Props.phoneNumber}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow className="mb-3">
//                     <MDBCol sm="3">
//                       <MDBCardText className="text-muted">Address</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText style={{ fontWeight: "500" }}>
//                         Kalyanagar, Bengaluru, Karnataka
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     </>
//   );
// }

// export default ProfilePage;

