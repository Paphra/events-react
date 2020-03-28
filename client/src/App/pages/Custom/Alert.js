import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Alert = (props) => {

  const info = props.info;

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {info.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {info.msg}        
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Alert;