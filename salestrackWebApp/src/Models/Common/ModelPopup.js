import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import myToaster from '../../utils/toaster';
import { changePassword } from '../../Services/AuthService';
import storage from '../../utils/storages';
import { Navigate, useNavigate } from 'react-router-dom';

function ChangePasswordModal({ open, handleClose }) {
  const [show, setShow] = useState(open);
  const[oldPassword,setOldPassword]=useState('')
  const[newPassword,setNewPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

   const navigate=useNavigate()

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleSave=async (e)=>{
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      myToaster.showErrorToast("Passwords do not match!");
      return;
    }

    console.log(oldPassword,newPassword,confirmPassword);
    const data={
      oldPassword:oldPassword,
      newPassword:newPassword,
      confirmPassword:confirmPassword
    };
    
    setLoading(true)
    setError('');

    try {

      const token = storage.getItem("salesTrack");
      console.log(token)
      const bearerToken = `Bearer ${token.replace(/"/g, "")}`;
      console.log(bearerToken)
        const response = await changePassword(data, bearerToken);
        console.log(response)
        myToaster.showSuccessToast("Password changed successfully");  
      setLoading(false)
      handleClose()
      navigate("/admin/dashboard")
      // setLoading(false);
      // handleClose(); 
    }
     catch (err) 
     {
      console.error('Error changing password:', err);
      setError('Failed to change password. Please try again.');
      setLoading(false);
    }
  }
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change your temporary Password to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              autoFocus
              onChange={(e)=>{setOldPassword(e.target.value)}}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              onChange={(e)=>{setNewPassword(e.target.value)}}
              
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => {
          // Handle submit action here
          handleSave(e)
          // handleClose();
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordModal;
