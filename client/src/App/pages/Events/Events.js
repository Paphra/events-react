import React, {useState, useEffect} from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import {makeDate, getEvents, getImage, checkDate} from '../Custom/Functions.js';

import ModalDetails from './ModalDetails';
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
  const [showDetails, setShowDetails] = useState(false);

  useEffect(()=>{
    getEvents(setEvents);
  }, []);
  
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
      <div>
        <h3>Upcomming Events</h3>
        <CardColumns >
          {events ? events.map((ev, idx) => {
            return (
              checkDate(ev.e_start_date) ?
                <Card
                  bg={'dark'}
                  key={idx}
                  text={'dark' === 'light' ? 'dark' : 'white'}
                  style={{ width: '18rem' }}
                >
                  <Card.Img variant="top" src={getImage(ev.e_image)} />
                  <Card.Body>
                    <Card.Title>{ev.e_title}</Card.Title>
                    <Card.Text>
                      {ev.e_description.substr(0, 40) + ' ...'}<br />
                At {ev.e_venue}<br />
                Date: {makeDate(ev.e_start_date, ev.e_start_time).txt} <br />
                Upto: {makeDate(ev.e_end_date, ev.e_end_time).txt}
                    </Card.Text>
                    <Button variant="primary" onClick={() => { setShowBook(true) }}>Book/Buy Ticket</Button>
                    <ModalBookEvent
                      event={ev}
                      show={showBook}
                      onHide={() => { setShowBook(false) }}
                    />
                  </Card.Body>
                </Card>
                : () => { }
            )
          }) : () => { }}
        </CardColumns>
        <hr />
        <h3>Finished Events</h3>
        <div className="top-content">
          <div className="container-fluid">
            <div id="finished" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner row w-100 mx-auto Pad-events" role="listbox">

                {events.length ? events.map((ev, idx) => {
                  return (
                    !checkDate(ev.e_start_date) ?
                      <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active event-carousel-item" key={idx}>
                        <img src={getImage(ev.e_image)} alt={ev.e_title} className="img-fluid mx-auto d-block"/>
                        <h4>{ev.e_title} </h4>
                        <p>{ev.e_description.substr(0, 40) + ' ...'} 
                          <a className="btn btn-danger" href="#EventDetails"
                            onClick={() => { setShowDetails(true) }}>Read More</a></p>
                        <p>At {ev.e_venue}<br /> on <b>{makeDate(ev.e_start_date, ev.e_start_time).txt}</b></p>
                        <ModalDetails
                          show={showDetails}
                          onHide={() => { setShowDetails(false) }}
                          event={ev}
                        />
                      </div>
                      : () => { }
                  )
                }) : <p>No Events Found!</p>}
              </div>
              <a className="carousel-control-prev" href="#finished" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#finished" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
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