import React, { useState} from 'react';
import { Form, Modal, Button} from 'react-bootstrap';
import { makeId } from '../../Custom/Functions';

import axios from 'axios';

const AddPartner = (props) => {

  const [image, setImage] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    let f = e.target;
    let fields = {
      p_id: makeId(),
      p_name: f.p_name.value,
      p_address: f.p_address.value,
      p_contact: f.p_contact.value,
      p_description: f.p_description.value,
      p_logo: image
    };
    let data = new FormData();
    Object.keys(fields).map(f => data.append(f, fields[f]));

    axios.post("/api/partners", data, {})
    .then(res => { // then print response status
      if (res.statusText === 'OK') {
        alert("Partner Added");
        props.onHide();
      }else{
        console.log(res);
        alert("Partner Not Added" );
      }
    });
  }

  const fileChange = e => {
    setImage(e.target.files[0]);
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Partner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >

          <Form.Group controlId="p_name">
            <Form.Label>Name Of Partner</Form.Label>
            <Form.Control type='text' placeholder="Partner's Name" required={true} />
          </Form.Group>

          <Form.Group controlId="p_address">
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder="5th Street, Indutrial Area, Kampala" required={true} />
          </Form.Group>

          <Form.Group controlId="p_contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control type='text' placeholder="Partner's Contact" required={true} />
          </Form.Group>

          <Form.Group controlId="p_logo">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file" onChange={fileChange} placeholder="Partner's Logo" />
          </Form.Group>

          <Form.Group controlId="p_description">
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' required={true} placeholder='Partner Description' />
          </Form.Group>

          <Modal.Footer>
            <Button variant="primary" type="submit">Save Partner</Button>
            <Button variant='danger' onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddPartner;