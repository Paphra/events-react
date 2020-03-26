import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/sessionActions';
import Nav from 'react-bootstrap/Nav';

const Logout = ({ history, logout }) => (
  <Nav.Link href='#logout' onClick={() =>logout(history)} >Logout</Nav.Link>
);

const { object, func } = PropTypes;

Logout.propTypes = ({
  history: object.isRequired,
  logout: func.isRequired
});

const mapDispatch = dispatch => ({
  logout: history => dispatch(logout(history))
});

export default connect(null, mapDispatch)(withRouter(Logout));
