import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/sessionActions';
import Nav from 'react-bootstrap/Nav';

const DashLink = ({ history}) => (
  <Nav.Link href='#dashboard' onClick={() => { history.push('/dashboard') }} >Dashboard</Nav.Link>
);

const { object, func } = PropTypes;

DashLink.propTypes = ({
  history: object.isRequired,
  logout: func.isRequired
});

const mapDispatch = dispatch => ({
  logout: history => dispatch(logout(history))
});

export default connect(null, mapDispatch)(withRouter(DashLink));
