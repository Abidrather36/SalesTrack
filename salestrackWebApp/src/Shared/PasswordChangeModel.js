<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { changePassword } from "../Services/AuthService";
import { useForm } from "react-hook-form";
import storage from "../utils/storages";
import myToaster from "../utils/toaster";
=======
// import React from "react";
// import { useState } from "react";
// import InputField from "../Public/Components/InputField";
// import storage from "../utils/storages";
// import { changePassword } from "../Services/AuthService";
// import myToaster from "../utils/toaster";
// const PasswordChangeModal = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const handleChangePassword = async (e) => {
//     try {
//       const obj = {
//         oldPassword,
//         newPassword,
//         confirmPassword,
//       };
//       console.log(obj);
//       const token = storage.getItem("salesTrack");
//       const bearerToken = `Bearer ${token.replace(/"/g, "")}`;
//       console.log("Authorization Header:", bearerToken);
//       const response = await changePassword(obj, bearerToken);
//       if(response.isSuccess){
//       myToaster.showSuccessToast(response.message)
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="password-modal">
//       <div className="modal-content">
//         <h4>Your password is temporary. Please change it to continue</h4>
//         <form>
//           <InputField
//             type="password"
//             placeholder="Old password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//           />
//           <InputField
//             type="password"
//             placeholder="New password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <InputField
//             type="password"
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={handleChangePassword}
//             className="btn btn-primary"
//             style={{
//               backgroundColor: "var(--accent-color)",
//               color: "var(--contrast-color)",
//               fontFamily: "Montserrat, sans-serif",
//               borderRadius: "50px",
//               fontSize: "14px",
//               margin: "0px 0px 0px 30px",
//             }}
//           >
//             Change Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PasswordChangeModal;


// import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { changePassword } from '../Services/AuthService';
// import { useForm } from 'react-hook-form';
// import storage from '../utils/storages';

// function ChangePasswordModal({ open, handleClose }) {
//   const [show, setShow] = useState(open);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();


//   useEffect(() => {
//     setShow(open);
//   }, [open]);

//  const onFormSubmit=async (data)=>{
//   const token = storage.getItem("salesTrack");
//       const bearerToken = `Bearer ${token.replace(/"/g, "")}`;
//         const response = await changePassword(data, bearerToken);
//         console.log(response)
//   }

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Change your temporary Password to continue</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit(onFormSubmit)}>
//           <Form.Group className="mb-3" controlId="currentPassword">
//             <Form.Label>Current Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="oldPassword"
//               {...register("oldPassword",{
//                 require:"old password is required",
              
//               })}
//               placeholder="Enter current password"
//               autoFocus
//             />
//            {errors.oldPassword && <div>{errors.oldPassword.message}</div>}
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="newPassword">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="newPassword"
//               {...register("newPassword",{
//                 required:"new password is required"
//               })}
//               placeholder="Enter new password"
//             />
//            {errors.newPassword && <div>{errors.newPassword.message}</div>}
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="confirmPassword">
//             <Form.Label>Confirm New Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="confirmPassword"
//               {...register("confirmPassword",{
//                 required:"confirm password is required",
//               })}
//               placeholder="Confirm new password"
//             />
//            {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}

//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" type='submit '>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default ChangePasswordModal;

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { changePassword } from '../Services/AuthService';
import { useForm } from 'react-hook-form';
import storage from '../utils/storages';
>>>>>>> Stashed changes

function ChangePasswordModal({ open, handleClose }) {
  const [show, setShow] = useState(open);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    watch,
  } = useForm();

<<<<<<< Updated upstream
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
=======
  const newPassword = watch('newPassword'); // Watch newPassword for confirmPassword validation
>>>>>>> Stashed changes

  useEffect(() => {
    setShow(open);
  }, [open]);

  const onFormSubmit = async (data) => {
    const token = storage.getItem("salesTrack");
    const bearerToken = `Bearer ${token.replace(/"/g, "")}`;
    const response = await changePassword(data, bearerToken);
<<<<<<< Updated upstream
    if(response.isSuccess){
      myToaster.showSuccessToast(response.message)
    }
=======
    console.log(response);
>>>>>>> Stashed changes
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change your temporary password to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              {...register("oldPassword", {
<<<<<<< Updated upstream
                require: "old password is required",
=======
                required: "Old password is required",
>>>>>>> Stashed changes
              })}
              placeholder="Enter current password"
              autoFocus
            />
            {errors.oldPassword && <div>{errors.oldPassword.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              {...register("newPassword", {
<<<<<<< Updated upstream
                required: "new password is required",
=======
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
>>>>>>> Stashed changes
              })}
              placeholder="Enter new password"
            />
            {errors.newPassword && <div>{errors.newPassword.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              {...register("confirmPassword", {
<<<<<<< Updated upstream
                required: "confirm password is required",
              })}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <div>{errors.confirmPassword.message}</div>
            )}
            {newPassword && confirmPassword && newPassword!==confirmPassword && (
              <div>{"newPassword and confirmPassword does not match"}</div>
            )}
=======
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
>>>>>>> Stashed changes
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
<<<<<<< Updated upstream
        <Button
          variant="primary"
          type="submit "
          disabled={!newPassword ||!confirmPassword || newPassword!== confirmPassword}
          onClick={handleSubmit(onFormSubmit)}
        >
=======
        <Button variant="primary" type="submit">
>>>>>>> Stashed changes
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordModal;
