import React, {useState, useEffect} from 'react';
import {getPartners, makeDate, getImage} from '../Custom/Functions';
import axios from 'axios';

const Partners =(props)=>{
  const [partners, setPartners] = useState([]);

  useEffect(()=>{
    getPartners(setPartners);
  }, []);

  const deletePartner = id => {
    let data = {
      id: id
    };
    axios.delete('/api/partner/' + id, data, {})
      .then(res => {
        if (res.statusText === 'OK') {
          alert("Deleted Partner.");
          getPartners(setPartners);
        } else {
          alert("Failed To Delete Partner.");
        }
      });
  }

  return (
    <div>
      {partners.length ? partners.map((p, ix) => {
        return (
          <div key={ix} className='row list-item'>
            <div className='col-md-4'>
              <img width='90%' src={getImage(p.p_logo, 'partners')} alt={p.p_name} />
              <p>Registered: <b>{makeDate(p.p_entry_date).txt}</b></p>
            </div>
            <div className='col-md-6'>
              <p>Name: <b>{p.p_name}</b></p>
              <p>Address: <b>{p.p_address}</b></p>
              <p>Description: {p.p_description}</p>
            </div>
            <div className='col-md-2'>
              <a href='#edit' className='btn btn-primary'>
                <i className='fa fa-partner'>Edit</i>
              </a>
              <br/>
              <a href='#delete'
                onClick={() => { deletePartner(p.p_id) }}
                className='btn btn-danger' >
                <i className='fa fa-trash'>Delete</i>
              </a>
            </div>
          </div>
        )
      }) : <h4>No Partners Found!</h4>}
    </div>
  );
}

export default Partners;