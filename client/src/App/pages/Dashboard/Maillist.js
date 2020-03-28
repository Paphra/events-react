import React, {useState, useEffect} from 'react';
import {getMaillist, makeDate} from '../Custom/Functions';
import axios from 'axios';

import Alert from '../Custom/Alert';

const Maillist =(props)=>{
  const [maillist, setMaillist] = useState([]);
  const [deleteSuccess, sepeleteSuccess] = useState(false);
  const [statusFail, setStatusFail] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [deleteFail, sepeleteFail] = useState(false);

  useEffect(()=>{
    getMaillist(setMaillist);
  }, []);

  const deleteMailList =id=>{
    let data = {
      id: id
    };
    axios.delete('/api/maillist/' + id, data, {})
    .then(res => {
      if(res.statusText === 'OK'){
        getMaillist(setMaillist);
        sepeleteSuccess(true);
      }else{
        sepeleteFail(true);
      }
    });
  }

  const statusMailList = (id, status)=>{
    let data = {
      id: id,
      status: status
    };
    axios.post('/api/mailist', data, {})
    .then(res => {
      if (res.statusText === 'OK') {
        getMaillist(setMaillist);
        setStatusSuccess(true);
      } else {
        setStatusFail(true);
      }
    });

  }

  return (
    <div>
      <Alert
        info={{
          title: 'Deleting Item',
          msg: "Deleted Mail List Item"
        }}
        show={deleteSuccess}
        onHide={() => { sepeleteSuccess(false)}} 
      />
      <Alert
        info={{
          title: 'Deleting Item',
          msg: "Failed to Deleted Mail List Item"
        }}
        show={deleteFail}
        onHide={() => { sepeleteFail(false) }}
      />
      <Alert
        info={{
          title: 'Changing Status',
          msg: "Status Changed!"
        }}
        show={statusSuccess}
        onHide={() => { setStatusSuccess(false) }}
      />
      <Alert
        info={{
          title: 'Changing Status',
          msg: "Failed to Change Status!"
        }}
        show={statusFail}
        onHide={() => { setStatusFail(false) }}
      />
      {maillist.length ? maillist.map((ml, ix) => {
        return (
          <div key={ix} className='row list-item'>
            <div className='col-md-6'>
              <p>Email Address: <b>{ml.ml_email}</b></p>
              <p>Date: <b>{makeDate(ml.ml_entry_date).txt}</b></p>
            </div>
            <div className='col-md-4'>
              <p>Status: <b>{ml.ml_status}</b></p>
              <a href='#change' className='btn btn-primary'
                onClick={() => { statusMailList(ml.ml_id, ml.ml_status) }}>
                <i className='fa fa-refresh'></i>
              </a>
            </div>
            <div className='col-md-2'>
              <a href='#delete'
                onClick={() => { deleteMailList(ml.ml_id) }}
                className='btn btn-danger' >
                <i className='fa fa-trash'></i>
              </a>
            </div>
          </div>
        )
      }) : <h4>No Email Found!</h4>}
    </div>
  );
}

export default Maillist;