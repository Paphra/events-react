import React, {useState, useEffect} from 'react';
import {getEvents, makeDate, getImage} from '../Custom/Functions';
import axios from 'axios';

const Events =(props)=>{
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    getEvents(setEvents);
  }, []);
  
  const deleteEvent = id => {
    let data = {
      id: id
    };
    axios.delete('/api/events/' + id, data, {})
      .then(res => {
        if (res.statusText === 'OK') {
          alert("Deleted Event.");
          getEvents(setEvents);
        } else {
          alert("Failed To Delete Event.");
        }
      });
  }

  return (
    <div>
      {events.length ? events.map((ev, ix) => {
        return (
          <div key={ix} className='row event-list-item'>
            <div className='col-md-4'>
              <img width='90%' src={getImage(ev.e_image, 'events')} alt={ev.e_title} />
              <p>On <span>{makeDate(ev.e_start_date, ev.e_start_time).txt}</span></p>
            </div>
            <div className='col-md-6'>
              <h3>{ev.e_title}</h3>
              <p>Seats: <b>{ev.e_tickets}</b> at <b>{ev.e_venue}</b></p>
              <p>Ticket Price: <b>{ev.e_price}</b> | Event Status: <b>{ev.e_status}</b></p>
            </div>
            <div className='col-md-2'>
              <a href='#edit' className='btn btn-primary'>
                <i className='fa fa-refresh'></i>
              </a>
              <br/>
              <a href='#delete'
                onClick={() => { deleteEvent(ev.e_id) }}
                className='btn btn-danger' >
                <i className='fa fa-trash'></i>
              </a>
            </div>
          </div>
        )
      }) : <h4>No Events Found!</h4>}
    </div>
  );
}

export default Events;