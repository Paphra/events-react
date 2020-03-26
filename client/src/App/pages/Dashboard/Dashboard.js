import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';

import {Tab, Row, Col, ListGroup} from 'react-bootstrap';

import Bookings from './Bookings';
import Events from './Events';
import Users from './Users';
import Partners from './Partners';
import Payment from './Payment';
import Messages from './Messages';
import Maillist from './Maillist';

const Dashboard = ({ actions: { logout }, user, authenticated }) => {

  document.getElementById('title').innerHTML = 'Dashboard | Events Management System'
  
  return (
  <div className='Dashboard'>
    <h3 className='text-left'>Welcome {user.u_username}</h3>
    <hr/>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#bookings">
      <Row>
        <Col sm={3}>
          <ListGroup>
            <ListGroup.Item action href="#bookings">Bookings</ListGroup.Item>
            <ListGroup.Item action href="#events">Events</ListGroup.Item>
            <ListGroup.Item action href="#users">Users</ListGroup.Item>
            <ListGroup.Item action href="#partners">Partners</ListGroup.Item>
            <ListGroup.Item action href="#payment">Payment</ListGroup.Item>
            <ListGroup.Item action href="#messages">Messages</ListGroup.Item>
            <ListGroup.Item action href="#maillist">Mail List</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="#bookings">
              <h4>Bookings</h4>
              <Bookings />
              </Tab.Pane>
              <Tab.Pane eventKey="#events">
                <h4>Events</h4>
                <Events />
              </Tab.Pane>
              <Tab.Pane eventKey="#users">
                <h4>Users</h4>
                <Users />
              </Tab.Pane>
              <Tab.Pane eventKey="#partners">
                <h4>Partners</h4>
                <Partners />
              </Tab.Pane>
              <Tab.Pane eventKey="#payment">
                <h4>Payment</h4>
                <Payment/>
              </Tab.Pane>
              <Tab.Pane eventKey="#messages">
                <h4>Messages</h4>
                <Messages />
              </Tab.Pane>
              <Tab.Pane eventKey="#maillist">
                <h4>Maillist</h4>
                <Maillist />
              </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </div>
  );
};

const { object, bool } = PropTypes;

Dashboard.propTypes = {
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

export default connect(mapState, mapDispatch)(Dashboard);