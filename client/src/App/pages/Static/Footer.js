import React, {useState} from 'react';
import logo from '../../../logo.png';
import axios from 'axios';
import {makeId} from '../Custom/Functions';

const Footer =()=>{
  const [email, setEmail] = useState('');

  const handleSubscribe =(event)=>{
    event.preventDefault();

    let data = {
      ml_id: makeId(),
      ml_email: email,
      ml_status: 'Active'
    };
    axios.post('/api/maillist', data, {}).then(res=>{
      if(res.statusText === 'OK'){
        alert("Added To Mail List");
      }
    });

  }

  return (
    <footer className='site-footer'>
      <a className="btn btn-danger" href="#top" data-toggle="tooltip" title="Go To Top">
        <i className="fa fa-chevron-up"></i>
      </a>
      <hr />
      <form className='form Subscribe-form' onSubmit={handleSubscribe}>
        <div className='row'>
          <input name='email' placeholder='email@example.com'
            onChange={e => { setEmail(e.target.value) }} 
            className='form-control col-md-8' id='email' type='email' />
          <input type='submit' value='Subscribe' 
            className='btn btn-primary col-md-4'/>
        </div>
      </form>
      <hr/>
      <div className='footer-logo'>
        <img src={logo} width='12%' alt="logo" />
      </div>
    </footer>
  );
}

export default Footer;