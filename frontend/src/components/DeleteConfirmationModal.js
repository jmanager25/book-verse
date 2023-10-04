import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import buttonstyles from '../styles/Button.module.css'

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm, itemName}) => {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
            <Button className={buttonstyles.Button} onClick={handleClose}>Cancel</Button>
            <Button className={buttonstyles.Danger} onClick={handleConfirm}>Delete</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmationModal;