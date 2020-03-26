import React, {useState, useEffect} from 'react';
import {Container, Form, Col, Button} from 'react-bootstrap';

import ModalEditAbout from './ModalEdit';
import {getAbout, makeId} from '../Custom/Functions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import axios from 'axios';

const About =(props)=>{
  const [about, setAbout] = useState({});
  const [showEdit, setShowEdit] = useState(false);


  const handleContact = (event) => {
    event.preventDefault();
    let f = event.target;
    let data = {
      m_id: makeId(),
      m_sender_name: f.m_sender_name.value,
      m_sender_email: f.m_sender_email.value,
      m_sender_phone: f.m_sender_phone.value,
      m_message: f.m_message.value
    };
    axios.post('/api/messages', data, {}).then(res => {
      if (res.statusText === 'OK') {
        alert("Message Sent! \nWe shall Reply As Soon As Possible. \n Thank you!");
      }
    });

  }

  
  useEffect(()=>{
    getAbout(setAbout);
  }, []);

  document.getElementById('title').innerHTML = 'About | Events Management System';
  return (
    <Container className='Padding-others'>
      <h1>About Us</h1>
      {props.authenticated ?
        <div>
          <Button variant='primary'
            onClick={() => { setShowEdit(true) }}>Edit</Button>
          <ModalEditAbout
            about={about}
            show={showEdit}
            onHide={() => { setShowEdit(false) }}
          /><hr/>
        </div> : <div></div>
      }
      <div className='About-section'>
        {about?
        <div>
            <h3>Welcome to {about.a_name}</h3>
            <h4>{about.a_slogan}</h4>
            <hr/>
            <div className='row text-left'>
              <div className='col-md-6'>
                <table border='1'>
                  <tbody>
                    <tr>
                      <td>Address: </td>
                      <td>{about.a_address}</td>
                    </tr>
                    <tr>
                      <td>Contact: </td>
                      <td>
                        {about.a_phone}<br/>
                        {about.a_email}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col-md-6'>
                <p>{about.a_description}</p>
                <h5>Owner</h5>
                <p>Meet {about.a_owner_name}. Contact: {about.a_owner_phone + ' ' + about.a_owner_email}</p>
              </div>
            </div>
        </div>
        :<h5>No about Information Currently</h5>}
      </div>
      <hr />
      <h3 className='text-center'>Contact Us</h3>
      <div className='Contact-section'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <Form onSubmit={handleContact}>
              <Form.Group controlId="m_sender_name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" required />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="m_sender_email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Email Address" />
                </Form.Group>
                <Form.Group as={Col} controlId="m_sender_phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Phone Number" required />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="m_message">
                <Form.Label>Message</Form.Label>
                <Form.Control as='textarea' placeholder="Enter Message" required />
              </Form.Group>
              <div className='text-right'>
                <Button variant="primary" type="submit">Send Message</Button>
              </div>
            </Form>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </Container>
    );
}

const { object, bool } = PropTypes;

About.propTypes = {
  actions: object.isRequired,
  user: object.isRequired,
  authenticated: bool.isRequired
};

const mapState = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(About);