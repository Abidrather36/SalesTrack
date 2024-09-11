import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ChangePasswordModal({ open, handleClose }) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

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
              placeholder="Enter current password"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          // Handle submit action here
          handleClose();
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordModal;
