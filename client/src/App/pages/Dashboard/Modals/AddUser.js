import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Col } from 'react-bootstrap';
import { makeId, getPartners } from '../../Custom/Functions';
import Alert from '../../Custom/Alert';

import sha1 from 'sha1';
import axios from 'axios';

const AddUser = (props) => {

  const [passError, setPassError] = useState("");
  const [passErrorColor, setPassErrorColor] = useState("");
  const [partners, setPartners] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    getPartners(setPartners);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let f = e.target;

    let pass = f.u_password.value;
    let passConf = f.u_password_conf.value;
    if(pass !== passConf){
      alert("Password Missmatch!\nPlease Correct That.");
    }else{
      let password = sha1(f.u_password.value);
      let data = {
        u_id: makeId(),
        u_full_name: f.u_full_name.value,
        u_username: f.u_username.value,
        u_password: password,
        u_email: f.u_email.value,
        u_phone: f.u_phone.value,
        u_partner: f.u_partner.value,
        u_role: f.u_role.value
      };
      
      axios.post("/api/users", data, {})
        .then(res => { // then print response status
          if (res.statusText === 'OK') {
            setAddSuccess(true);
            props.onHide();
          }else{
            alert("Failed to Add User.")
          }
        });
    }
    
  }
  
  const checkPassword=e=>{
    let pass = document.getElementById('u_password').value;
    let confPass = e.target.value;
    if(pass === confPass){
      setPassError("Password Match");
      setPassErrorColor("bg-green");
    }else{
      setPassError("Password Mis-Match");
      setPassErrorColor("bg-red");
    }
  }

  return (
    <div>
      <Alert
        info={{
          title: 'Adding User',
          msg: "Added User Succefully!"
        }}
        show={addSuccess}
        onHide={() => { setAddSuccess(false) }}
      />
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add User
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >

            <Form.Group controlId="u_full_name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type='text' placeholder="User's Full Name" required={true} />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="u_email">
                <Form.Label>User Email</Form.Label>
                <Form.Control type='email' placeholder="example@site.com" required={true} />
              </Form.Group>
              <Form.Group as={Col} controlId="u_phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type='tel' placeholder="Enter Phone Number" required={true} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="u_partner">
                <Form.Label>Partners</Form.Label>
                <Form.Control as="select" required={true}>
                  {partners ? partners.map((p, idx) => {
                    return <option value={p.p_name} key={idx}>{p.p_name}</option>;
                  }) : <option value=''></option>}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="u_role">
                <Form.Label>User Role</Form.Label>
                <Form.Control type='text' placeholder="User Role" required={true} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="u_username">
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder="Enter Username" required={true} />
              </Form.Group>
              <Form.Group as={Col} controlId="u_password">
                <Form.Label>Password</Form.Label>
                <Form.Control type='text' placeholder="User Password" required={true} />
              </Form.Group>
            </Form.Row>
            <Form.Group as={Col} controlId="u_password_conf">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='text' placeholder="Confirm Password"
                onChange={checkPassword} required={true} />
              <p className={passErrorColor}>{passError}</p>
            </Form.Group>

            <Modal.Footer>
              <Button variant="primary" type="submit">Save User</Button>
              <Button variant='danger' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddUser;