import React, {useState, useEffect} from 'react';
import {getPayment, makeDate} from '../Custom/Functions';
import axios from 'axios';

const Payment =(props)=>{
  const [payment, setPayment] = useState([]);

  useEffect(()=>{
    getPayment(setPayment);
  }, []);

  const deletePartner = id => {
    let data = {
      id: id
    };
    axios.delete('/api/partners/' + id, data, {})
      .then(res => {
        if (res.statusText === 'OK') {
          alert("Deleted Partner.");
          getPayment(setPayment);
        } else {
          alert("Failed To Delete Partner.");
        }
      });
  }

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
                  <a href='#edit' className='btn btn-primary'><i className='fa fa-refresh'>Edit</i></a> 
                  
                  <a href='#delete' className='btn btn-danger'
                    onClick={() => { deletePartner(p.p_id) }}>
                    <i className='fa fa-trash'>Delete</i>
                  </a>
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