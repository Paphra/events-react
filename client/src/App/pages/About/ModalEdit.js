import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

//import axios from 'axios';

import { Redirect } from 'react-router-dom';

const ModalEditAbout = (props) => {
  const ab = props.about;
  const [redirect, setRedirect] = useState(false);

  const [name, setName] = useState(ab.a_name);
  const [slogan, setSlogan] = useState(ab.a_slogan);
  const [email, setEmail] = useState(ab.a_email);
  const [phone, setPhone] = useState(ab.a_phone);
  const [description, setDescription] = useState(ab.a_description);
  const [address, setAddress] = useState(ab.a_address);
  const [coordinates, setCoordinates] = useState(ab.a_coordinates);
  const [ownerName, setOwnerName] = useState(ab.a_owner_name);
  const [ownerPhone, setOwnerPhone] = useState(ab.a_owner_phone);
  const [ownerEmail, setOwnerEmail] = useState(ab.a_owner_email);

  const handleEditAbout = (e) => {
    e.preventDefault();
    
    let f = e.target;
    let fields = {
      a_name: f.a_name.value,
      a_slogan: f.a_slogan.value,
      a_phone: f.a_phone.value,
      a_email: f.a_email.value,
      a_address: f.a_address.value,
      a_coordinates: f.a_coordinates.value,
      a_description: f.a_description.value,
      a_owner_name: f.a_owner_name.value,
      a_owner_email: f.a_owner_email.value,
      a_owner_phone: f.a_owner_phone.value,
    };

    let data = new FormData();
    data.append(fields);
    let info = {
      id: ab.a_id,
      data: data,
    }
    /*
    axios.patch("http://localhost:9000/about", info, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        if (res.statusText === 'OK') {
          setRedirect(true);
        }
      });
    */
  }

  const redirectToEvents = () => {
    if (redirect) return <Redirect to='/about' />
  }
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {redirectToEvents()}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Business Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditAbout}>
          <Form.Group controlId="a_name">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type="text" value={name}  onChange={e=>setName(e.target.value)}
              placeholder="Business Name" required />
          </Form.Group>
          <Form.Group controlId="a_slogan">
            <Form.Label>Slogan</Form.Label>
            <Form.Control type="text" value={slogan}
              onChange={e => setSlogan(e.target.value)}
              placeholder="Business Slogan" required />
          </Form.Group>
          <Form.Group controlId="a_description">
            <Form.Label>Business Description</Form.Label>
            <Form.Control as='textarea' value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Business Description" required />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="a_phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone Number" required />
            </Form.Group>
            <Form.Group as={Col} controlId="a_email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address" required />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="a_address">
            <Form.Label>Business Address</Form.Label>
            <Form.Control as='textarea' value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Business Address" required />
          </Form.Group>
          <Form.Group controlId="a_coordinates">
            <Form.Label>Location Coordinates</Form.Label>
            <Form.Control type="text" value={coordinates}
              onChange={e => setCoordinates(e.target.value)}
              placeholder="Location Coordinates" required />
          </Form.Group>
          <hr/>
          <Form.Label>Business Owner's Information</Form.Label>
          <Form.Row>
            <Form.Group as={Col} controlId="a_owner_name">
              <Form.Label>Owner's Full Name</Form.Label>
              <Form.Control type='text' value={ownerName}
                onChange={e => setOwnerName(e.target.value)}
                placeholder="Full Name" required />
            </Form.Group>
            <Form.Group as={Col} controlId="a_owner_phone">
              <Form.Label>Owner's Phone Number</Form.Label>
              <Form.Control type="tel" value={ownerPhone}
                onChange={e => setOwnerPhone(e.target.value)}
                placeholder="Phone Number" required />
            </Form.Group>
            <Form.Group as={Col} controlId="a_owner_email">
              <Form.Label>Owner's Email Address</Form.Label>
              <Form.Control type="email" value={ownerEmail}
                onChange={e => setOwnerEmail(e.target.value)}
                placeholder="Email Address" required />
            </Form.Group>
          </Form.Row>

          <Modal.Footer>
            <Button variant="primary" type="submit">Save Information</Button>
            <Button variant='danger' onClick={props.onHide}>Close</Button>
          </Modal.Footer>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalEditAbout;