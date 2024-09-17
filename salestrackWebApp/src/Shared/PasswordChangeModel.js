import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { changePassword } from "../Services/AuthService";
import { useForm } from "react-hook-form";
import storage from "../utils/storages";
import myToaster from "../utils/toaster";
import { useNavigate } from "react-router-dom";

function ChangePasswordModal({ open, handleClose }) {
  const navigate=useNavigate()
  const [show, setShow] = useState(open);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setShow(open);
  }, [open]);

  const onFormSubmit = async (data) => {
    const token = storage.getItem("salesTrack");
    const bearerToken = `Bearer ${token.replace(/"/g, "")}`;
    const response = await changePassword(data, bearerToken);
    if(response.isSuccess){
      myToaster.showSuccessToast(response.message)
      navigate("/login")
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change your temporary Password to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              {...register("oldPassword", {
                require: "old password is required",
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
                required: "new password is required",
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
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit "
          disabled={!newPassword ||!confirmPassword || newPassword!== confirmPassword}
          onClick={handleSubmit(onFormSubmit)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordModal;