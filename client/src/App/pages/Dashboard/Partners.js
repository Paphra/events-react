import React, {useState, useEffect} from 'react';
import {getPartners, makeDate} from '../Custom/Functions';


const Partners =(props)=>{
  const [partners, setPartners] = useState([]);

  useEffect(()=>{
    getPartners(setPartners);
  }, []);

  return (
    <div>
      <table border='1' width='100%'>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Name</th>
            <th>Address</th>
            <th>Description</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners ? partners.map((ptn, ix) => {
            return (
              <tr key={ix}>
                <td>{makeDate(ptn.p_entry_date).txt}</td>
                <td>{ptn.p_name}</td>
                <td>{ptn.p_address}</td>
                <td>{ptn.p_description}</td>
                <td>{ptn.p_logo}</td>
                <td>
                  <a href='#edit'><i className='fa fa-refresh'></i></a>
                  <a href='#delete' ><i className='fa fa-trash'></i></a>
                </td>
              </tr>
            )
          }) : <tr><td colSpan='6'><h6>No Partners Found!</h6></td></tr>}

        </tbody>
      </table>
    </div>
  );
}

export default Partners;