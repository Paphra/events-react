import React, {useState, useEffect} from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import {makeDate, getEvents, getImage} from '../Custom/Functions.js';

import ModalAddEvent from './ModalAdd';
import ModalBookEvent from './ModalBook'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';

const Events =(props)=>{
  
  const [showBook, setShowBook] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    getEvents(setEvents);
  }, []);

  const checkDate = (date) => {
    return (new Date(date)) > (new Date());
  }
  
  document.getElementById('title').innerHTML = 'Events | Events Management System';
  return (
    <Container className='text-center Padding-others'>
      <h1>All The Events Events</h1>
      {props.authenticated ?
        <div>
          <Button variant='primary'
            onClick={() => { setShowAdd(true) }}>Add Event</Button>
          <ModalAddEvent
            show={showAdd}
            onHide={() => { setShowAdd(false) }}
          />
        </div> : <div></div>
      }
      <hr />
      <CardColumns >
        {(events) ? events.map((ev, idx) => (
          <Card
            bg={'dark'}
            key={idx}
            text={'dark' === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem' }}
          >
            <Card.Img variant="top" src={getImage(ev.e_image)} />
            {/*<Card.Header>{ev.e_title}</Card.Header>*/}
            <Card.Body>
              <Card.Title>{ev.e_title}</Card.Title>
              <Card.Text>
                {ev.e_description.substr(0, 40) + ' ...'}<br />
                At {ev.e_venue}<br />
                Date: {makeDate(ev.e_start_date, ev.e_start_time).txt} <br />
                Upto: {makeDate(ev.e_end_date, ev.e_end_time).txt}
              </Card.Text>
              
              {checkDate(ev.e_start_date) ?
                <div>
                  <Button variant="primary" onClick={() => { setShowBook(true) }}>Book/Buy Ticket</Button>
                  <ModalBookEvent
                    event={ev}
                    show={showBook}
                    onHide={() => { setShowBook(false) }}
                  />
                </div>
                : () => { }}

            </Card.Body>
          </Card>
        )) : <p>No Events to Display</p>}
      </CardColumns>
    </Container>
  );
};

const { object, bool } = PropTypes;

Events.propTypes = {
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

export default connect(mapState, mapDispatch)(Events);