import React, {useState, useEffect} from 'react';
import {getMaillist, makeDate} from '../Custom/Functions';


const Maillist =(props)=>{
  const [maillist, setMaillist] = useState([]);

  useEffect(()=>{
    getMaillist(setMaillist);
  }, []);

  return (
    <div>
      <table border='1' width='100%'>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {maillist ? maillist.map((ml, ix) => {
            return (
              <tr key={ix}>
                <td>{makeDate(ml.ml_entry_date).txt}</td>
                <td>{ml.ml_email}</td>
                <td>{ml.ml_status} <a href='#change'><i className='fa fa-refresh'></i></a></td>
                <td><a href='#delete' ><i className='fa fa-trash'></i></a></td>
              </tr>
            )
          }) : <tr><td colSpan='4'><h6>No Email Found!</h6></td></tr>}

        </tbody>
      </table>
    </div>
  );
}

export default Maillist;