import React, {useState, useEffect} from 'react';
import {getBookings, makeDate} from '../Custom/Functions';


const Bookings =(props)=>{
  const [bookings, setBookings] = useState([]);

  useEffect(()=>{
    getBookings(setBookings);
  }, []);

  return (
    <div>
      <table border='1' width='100%'>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Customer</th>
            <th>Event</th>
            <th>CODE</th>
            <th>Tickets</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings ? bookings.map((b, ix) => {
            return (
              <tr key={ix}>
                <td>{makeDate(b.b_start_date, b.b_start_time).txt}</td>
                <td>{b.b_title}</td>
                <td>{b.b_tickets}</td>
                <td>{b.b_venue}</td>
                <td>{b.b_price}</td>
                <td>{b.b_status}</td>
                <td>
                  <a href='#edit'><i className='fa fa-refresh'></i></a>
                  <a href='#delete' ><i className='fa fa-trash'></i></a>
                </td>
              </tr>
            );
          }) : <tr><td colSpan='7'> <h6>No Bookings Found!</h6></td></tr>}

        </tbody>
      </table>
    </div>
  );
}

export default Bookings;