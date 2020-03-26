import React, {useState, useEffect} from 'react';
import {getEvents, makeDate} from '../Custom/Functions';


const Events =(props)=>{
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    getEvents(setEvents);
  }, []);

  return (
    <div>
      <table border='1' width='100%'>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Title</th>
            <th>Tickets</th>
            <th>Venue</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events?events.map((ev, ix)=>{
            return (
              <tr key={ix}>
                <td>{makeDate(ev.e_start_date, ev.e_start_time).txt}</td>
                <td>{ev.e_title}</td>
                <td>{ev.e_tickets}</td>
                <td>{ev.e_venue}</td>
                <td>{ev.e_price}</td>
                <td>{ev.e_status}</td>
                <td>
                  <a href='#edit'><i className='fa fa-refresh'></i></a>
                  <a href='#delete' ><i className='fa fa-trash'></i></a>
                </td>
              </tr>
            )
          }) : <tr><td colSpan='7'><h6>No Events Found!</h6></td></tr>}
          
        </tbody>
      </table>
    </div>
  );
}

export default Events;