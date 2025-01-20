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


//Org working fine
// import React, { useState, useEffect } from "react";
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
// import {
//   uploadProfilePicture,
//   getProfilePath,
// } from "../../Services/ProfileService";
// import { ApiUrl } from "../../Services/Shared";
// import myToaster from "../../utils/toaster";

// function ProfilePage() {
//   const API_URL = "http://localhost:5075";

//     const user = JSON.parse(localStorage.getItem("user"));
//   console.log("User Information Full",user)
//   const defaultImage =
//   "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
//   const url="http://localhost:5075"
//   const dbImage = `${url}${user.filePath}`;
//   console.log(".......",dbImage)

//   const Props = {
//     fullName: user.fullName || "Unknown User",
//     email: user.email || "Not Provided",
//     phoneNumber: user.phoneNumber || "Not Available",
//     userRole:
//       user.userRole === 1
//         ? "Admin"
//         : user.userRole === 2
//         ? "Company Admin"
//         : user.userRole === 3
//         ? "Sales Executive"
//         : user.userRole === 4
//         ? "Sales Manager"
//         : "Unknown Role",
//   };
//   const [profilePicture, setProfilePicture] = useState(dbImage!==null?dbImage:defaultImage);
//   useEffect(() => {
//   }, []);

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         const response = await uploadProfilePicture(file);
//         setProfilePicture(`${url}${response.result.filePath}`);
//         myToaster.showSuccessToast(response.message);
//       } catch (error) {
//         console.error("Error uploading profile picture:", error);
//         alert("An error occurred while uploading the profile picture.");
//       }
//     }
//   };

//   return (
//     <>
//       <MDBRow>
//         <MDBCol>
//           <BreadcrumbComponent
//             style={{ fontSize: "large", color: "#333" }}
//             labels={{ module: Props.userRole, currentRoute: "Profile" }}
//           />
//         </MDBCol>
//       </MDBRow>
//       <section style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//         <MDBContainer className="py-5">
//           <MDBRow className="justify-content-center">
//             <MDBCol lg="4" className="mb-4">
//               <MDBCard className="profile-card shadow-sm">
//                 <MDBCardBody className="text-center">
//                   <MDBCardImage
//                     src={profilePicture}
//                     alt="User Avatar"
//                     onError={(e) => (e.target.src = defaultImage)}
//                     className="rounded-circle"
//                     style={{
//                       width: "150px",
//                       border: "3px solid #007bff",
//                     }}
//                     fluid
//                   />
//                   <h5 className="mt-3">{Props.fullName}</h5>
//                   <p className="text-muted mb-1">{Props.userRole}</p>
//                   <p className="text-muted mb-4">Bengaluru, Karnataka</p>
//                   <div className="mt-3">
//                     <label
//                       htmlFor="profilePictureUpload"
//                       className="btn btn-primary btn-sm"
//                     >
//                       Change Picture
//                     </label>
//                     <input
//                       type="file"
//                       id="profilePictureUpload"
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//             <MDBCol lg="8">
//               <MDBCard className="mb-4 shadow-sm">
//                 <MDBCardBody>
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">
//                         Full Name
//                       </MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
//                         {Props.fullName}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">
//                         Email
//                       </MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
//                         {Props.email}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">
//                         Phone
//                       </MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
//                         {Props.phoneNumber}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">
//                         Address
//                       </MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
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



///Editable ///
import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import BreadcrumbComponent from "./Breadcrumb";
import {
  uploadProfilePicture,
  getProfilePath,
} from "../../Services/ProfileService";
import { ApiUrl } from "../../Services/Shared";
import myToaster from "../../utils/toaster";
import { updateUser } from "../../Services/UserService";

function ProfilePage() {
  const API_URL = "http://localhost:5075";
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User Information Full", user);
 
  const defaultImage =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
  const url = "http://localhost:5075";
  const dbImage = `${url}${user.filePath}`;
  console.log(".......", dbImage);

  const Props = {
    fullName: user.fullName || "Unknown User",
    email: user.email || "Not Provided",
    phoneNumber: user.phoneNumber || "Not Available",
    address:user.address || "Not Available",
    userRole:
      user.userRole === 1
        ? "Admin"
        : user.userRole === 2
        ? "Company Admin"
        : user.userRole === 3
        ? "Sales Executive"
        : user.userRole === 4
        ? "Sales Manager"
        : "Unknown Role",
  };

  const [profilePicture, setProfilePicture] = useState(
    dbImage !== null ? dbImage : defaultImage
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedProps, setEditedProps] = useState({ ...Props });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadProfilePicture(file);
        setProfilePicture(`${url}${response.result.filePath}`);
        myToaster.showSuccessToast(response.message);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("An error occurred while uploading the profile picture.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProps((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };


  // const handleSave = async() => {
  //   // Add logic to save the edited data (e.g., API call)
  // //  let response=await updateUser()
  //   console.log("Saved data: ", editedProps);
  //   setIsEditing(false);
  //   myToaster.showSuccessToast("Profile updated !");
  // };
  const handleSave = async () => {
      
      const updateData = {
        id: user.userId,  
        name: editedProps.fullName,
        email: editedProps.email,
        phoneNumber: editedProps.phoneNumber,
        address: editedProps.address || '', 
      };
  
      const response = await updateUser(updateData);
  
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
      } else {
        myToaster.showErrorToast(response.message);
      }
      setIsEditing(false);  
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
                    src={profilePicture}
                    alt="User Avatar"
                    onError={(e) => (e.target.src = defaultImage)}
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      border: "3px solid #007bff",
                    }}
                    fluid
                  />
                  <h5 className="mt-3">{editedProps.fullName}</h5>
                  <p className="text-muted mb-1">{Props.userRole}</p>
                  <p className="text-muted mb-4">Bengaluru, Karnataka</p>
                  <div className="mt-3">
                    <label
                      htmlFor="profilePictureUpload"
                      className="btn btn-primary btn-sm"
                    >
                      Change Picture
                    </label>
                    <input
                      type="file"
                      id="profilePictureUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4 shadow-sm">
                <MDBCardBody>
                  {/* Editable Fields */}
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">
                        Full Name
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={editedProps.fullName}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <MDBCardText className="text-muted">
                          {editedProps.fullName}
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">
                        Email
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditing ? (
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={editedProps.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <MDBCardText className="text-muted">
                          {editedProps.email}
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">
                        Phone
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditing ? (
                        <input
                          type="tel"
                          className="form-control"
                          name="phoneNumber"
                          pattern="\d*" 
                          maxLength="10" 
                          title="Please enter a valid 10-digit phone number"
                          value={editedProps.phoneNumber}
                          onChange={handleInputChange}
                           onInput={(e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Removes non-numeric characters
  }}
                        />
                      ) : (
                        <MDBCardText className="text-muted">
                          {editedProps.phoneNumber}
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="align-items-center">
                    <MDBCol sm="3">
                      <MDBCardText className="font-weight-bold">
                        Address
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          name="address"
                          value={editedProps.address || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <MDBCardText className="text-muted">
                          {editedProps.address || "Not Provided"}
                        </MDBCardText>
                      )}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <div className="text-center mt-3">
                {isEditing ? (
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={toggleEditMode}>
                    Edit Profile
                  </button>
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

export default ProfilePage;

// import React, { useState } from "react";
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
// import {
//   uploadProfilePicture,
//   getProfilePath,
// } from "../../Services/ProfileService";
// import myToaster from "../../utils/toaster";
// import { updateUser } from "../../Services/UserService";

// function ProfilePage() {
//   const API_URL = "http://localhost:5075";
//   const user = JSON.parse(localStorage.getItem("user"));

//   const defaultImage =
//     "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
//   const dbImage = `${API_URL}${user.filePath}`;

//   const Props = {
//     fullName: user.fullName || "Unknown User",
//     email: user.email || "Not Provided",
//     phoneNumber: user.phoneNumber || "Not Available",
//     address: user.address || "Not Available",
//     userRole:
//       user.userRole === 1
//         ? "Admin"
//         : user.userRole === 2
//         ? "Company Admin"
//         : user.userRole === 3
//         ? "Sales Executive"
//         : user.userRole === 4
//         ? "Sales Manager"
//         : "Unknown Role",
//   };

//   const [profilePicture, setProfilePicture] = useState(
//     dbImage !== "null" ? dbImage : defaultImage
//   );
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProps, setEditedProps] = useState({ ...Props });

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         const response = await uploadProfilePicture(file);
//         setProfilePicture(`${API_URL}${response.result.filePath}`);
//         myToaster.showSuccessToast(response.message);
//       } catch (error) {
//         console.error("Error uploading profile picture:", error);
//         alert("An error occurred while uploading the profile picture.");
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProps((prevProps) => ({
//       ...prevProps,
//       [name]: value,
//     }));
//   };

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSave = async () => {
//     const updateData = {
//       id: user.userId,
//       name: editedProps.fullName,
//       email: editedProps.email,
//       phoneNumber: editedProps.phoneNumber,
//       address: editedProps.address || "", // Handle null or empty address
//     };

//     const response = await updateUser(updateData);

//     if (response.isSuccess) {
//       myToaster.showSuccessToast(response.message);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <MDBRow>
//         <MDBCol>
//           <BreadcrumbComponent
//             style={{ fontSize: "large", color: "#333" }}
//             labels={{ module: Props.userRole, currentRoute: "Profile" }}
//           />
//         </MDBCol>
//       </MDBRow>
//       <section style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//         <MDBContainer className="py-5">
//           <MDBRow className="justify-content-center">
//             {/* Profile Picture Section */}
//             <MDBCol lg="4" md="6" sm="12" className="mb-4">
//               <MDBCard className="profile-card shadow-sm">
//                 <MDBCardBody className="text-center">
//                   <MDBCardImage
//                     src={profilePicture}
//                     alt="User Avatar"
//                     onError={(e) => (e.target.src = defaultImage)}
//                     className="rounded-circle"
//                     fluid
//                   />
//                   <h5 className="mt-3">{editedProps.fullName}</h5>
//                   <p className="text-muted mb-1">{Props.userRole}</p>
//                   <p className="text-muted mb-4">Bengaluru, Karnataka</p>
//                   <div className="mt-3">
//                     <label
//                       htmlFor="profilePictureUpload"
//                       className="btn btn-primary btn-sm"
//                     >
//                       Change Picture
//                     </label>
//                     <input
//                       type="file"
//                       id="profilePictureUpload"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>

//             {/* Editable Profile Details Section */}
//             <MDBCol lg="8" md="12">
//               <MDBCard className="mb-4 shadow-sm">
//                 <MDBCardBody>
//                   {/* Full Name */}
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">
//                         Full Name
//                       </MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="fullName"
//                           value={editedProps.fullName}
//                           onChange={handleInputChange}
//                         />
//                       ) : (
//                         <MDBCardText className="text-muted">
//                           {editedProps.fullName}
//                         </MDBCardText>
//                       )}
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />

//                   {/* Email */}
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">Email</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       {isEditing ? (
//                         <input
//                           type="email"
//                           className="form-control"
//                           name="email"
//                           value={editedProps.email}
//                           onChange={handleInputChange}
//                         />
//                       ) : (
//                         <MDBCardText className="text-muted">
//                           {editedProps.email}
//                         </MDBCardText>
//                       )}
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />

//                   {/* Phone */}
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">Phone</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       {isEditing ? (
//                         <input
//                           type="tel"
//                           className="form-control"
//                           name="phoneNumber"
//                           value={editedProps.phoneNumber}
//                           onChange={handleInputChange}
//                         />
//                       ) : (
//                         <MDBCardText className="text-muted">
//                           {editedProps.phoneNumber}
//                         </MDBCardText>
//                       )}
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />

//                   {/* Address */}
//                   <MDBRow className="align-items-center">
//                     <MDBCol sm="3">
//                       <MDBCardText className="font-weight-bold">Address</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       {isEditing ? (
//                         <textarea
//                           className="form-control"
//                           name="address"
//                           value={editedProps.address || ""}
//                           onChange={handleInputChange}
//                         />
//                       ) : (
//                         <MDBCardText className="text-muted">
//                           {editedProps.address || "Not Provided"}
//                         </MDBCardText>
//                       )}
//                     </MDBCol>
//                   </MDBRow>
//                 </MDBCardBody>
//               </MDBCard>

//               {/* Buttons Section */}
//               <div className="text-center mt-3">
//                 <MDBRow className="d-flex justify-content-center">
//                   <MDBCol md="5">
//                     {isEditing ? (
//                       <button
//                         className="btn btn-primary w-100"
//                         onClick={handleSave}
//                       >
//                         Save Changes
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-primary w-100"
//                         onClick={toggleEditMode}
//                       >
//                         Edit Profile
//                       </button>
//                     )}
//                   </MDBCol>
//                 </MDBRow>
//               </div>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     </>
//   );
// }

// export default ProfilePage;
