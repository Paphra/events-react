import React, {useState, useEffect} from 'react';
import {getPayment, makeDate} from '../Custom/Functions';


const Payment =(props)=>{
  const [payment, setPayment] = useState([]);

  useEffect(()=>{
    getPayment(setPayment);
  }, []);

  return (
    <div>
      <table border='1' width='100%'>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payment ? payment.map((p, ix) => {
            return (
              <tr key={ix}>
                <td>{makeDate(p.pm_entry_date).txt}</td>
                <td>{p.pm_name}</td>
                <td>
                  <a href='#edit'><i className='fa fa-refresh'></i></a>
                  <a href='#delete' ><i className='fa fa-trash'></i></a>
                </td>
              </tr>
            )
          }) : <tr><td colSpan='3'><h6>No Payment Methods Found!</h6></td></tr>}

        </tbody>
      </table>
    </div>
  );
}

export default Payment;