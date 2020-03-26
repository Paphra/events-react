import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../../../logo.png';
import {connect} from 'react-redux';

import Logout from '../Login/Logout';
import DashLink from '../Dashboard/DashLink';

const NavBar =({authed})=>{
  return (
    <Navbar fixed='top' collapseOnSelect bg="dark" variant="dark" expand='md'>
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Ultimate Sports Events"
        />Ultimate Sports Events
        </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive'></Navbar.Toggle>
      <Navbar.Collapse>
        <Nav className='mr-auto justify-content-end' id='responsive'>
          {authed?<DashLink />:()=>{}}
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
          {authed ? <Logout /> : () => { }}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapState =({session})=>({
  authed: session.authenticated,
});

export default connect(mapState)(NavBar);