import React, {useState, useEffect} from 'react';
import {getBookings, makeDate} from '../Custom/Functions';
import axios from 'axios';

const Bookings =(props)=>{
  const [bookings, setBookings] = useState([]);

  useEffect(()=>{
    getBookings(setBookings);
  }, []);

  const deleteBooking = id => {
    let data = {
      id: id
    };
    axios.delete('/api/bookings/' + id, data, {})
      .then(res => {
        if (res.statusText === 'OK') {
          alert("Deleted Booking.");
          getBookings(setBookings);
        } else {
          alert("Failed To Delete Booking.");
        }
      });
  }

  return (
    <div>
      {bookings.length ? bookings.map((b, ix) => {
        return (
          <div key={ix} className='row list-item'>
            <div className='col-md-6'>
              <h3>{b.b_title}</h3>
              <p>Seats: <b>{b.b_tickets}</b></p>
              <p>Event Starts on: <b>{makeDate(b.b_start_date, b.b_start_time).txt}</b></p>
            </div>
            <div className='col-md-4'>
              <p>Location: <b>{b.b_venue}</b></p>
              <p>Ticket Price: <b>{b.b_price}</b> | Payment Status: <b>{b.b_status}</b></p>
              <p>Payment Code: <b>{b.b_payment_code}</b></p>
            </div>
            <div className='col-md-2'>
              <a href='#edit' className='btn btn-primary'>
                <i className='fa fa-refresh'></i>
              </a>
              <br/>
              <a href='#delete' className='btn btn-danger'
                onClick={() => { deleteBooking(b.b_id) }}>
                <i className='fa fa-trash'></i>
              </a>
            </div>
          </div>
        );
      }) : <h4>No Bookings Found!</h4>}
    </div>
  );
}

export default Bookings;