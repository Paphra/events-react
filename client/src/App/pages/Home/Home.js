import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ModalAddEvent from '../Events/ModalAdd.js';
import {getEvents} from '../Custom/Functions.js';

import Slides from './Slides';
import UpEvents from './UpEvents';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';

const Home =(props)=>{

  const [showAdd, setShowAdd] = useState(false);
  const [events, setEvents] = useState([]);
  document.getElementById('title').innerHTML = 'Home | Events Management System';
  
  useEffect(()=>{
    getEvents(setEvents);
  }, []);

  return (
    <div className='Paddding-home'>
      {(events) ? <Slides events={events} />  : <h4>No Events</h4>}
      <hr />
      <Container className='justify-content-center'>
        <h4>Upcoming Events</h4>
        {props.authenticated?
          <div>
            <Button variant='primary'
              onClick={() => { setShowAdd(true) }}>Add Event</Button>
            <ModalAddEvent
              show={showAdd}
              onHide={() => { setShowAdd(false) }}
            />
          </div>:<div></div>
        }
        <hr />
        <UpEvents events={events} />
      </Container>
    </div>
    );
};

const { object, bool } = PropTypes;

Home.propTypes = {
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

export default connect(mapState, mapDispatch)(Home);