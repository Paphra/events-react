import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { makeDate } from '../Custom/Functions';

const ModalDetails =(props)=>{
  const event = props.event;

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Event Details For: {event.e_title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {event.e_description}<br />
        At {event.e_venue}<br />
        Date: {makeDate(event.e_start_date, event.e_start_time).txt} <br />
        Upto: {makeDate(event.e_end_date, event.e_end_time).txt}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger'
          onClick={props.onHide}>
          Close</Button>
      </Modal.Footer>
    </Modal>

  );
}

export default ModalDetails;
