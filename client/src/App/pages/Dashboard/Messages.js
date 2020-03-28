import React, {useState, useEffect} from 'react';
import {getMessages, makeDate} from '../Custom/Functions';
import axios from 'axios';

const Messages =(props)=>{
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    getMessages(setMessages);
  }, []);

  const deleteMessage = id => {
    let data = {
      id: id
    };
    axios.delete('/api/message/' + id, data, {})
      .then(res => {
        if (res.statusText === 'OK') {
          alert("Deleted Message.");
          getMessages(setMessages);
        } else {
          alert("Failed To Delete Message.");
        }
      });
  }
  return (
    <div>
      {messages.length ? messages.map((m, ix) => {
        return (
          <div key={ix} className='row list-item'>
            <div className='col-md-4'>
              <p>From: <b>{m.m_sender_name}</b></p>
              <p>{m.m_sender_email} | {m.m_sender_phone}</p>
              <p>On: <b>{makeDate(m.m_entry_date).txt}</b></p>
            </div>
            <div className='col-md-6'>
              <p>Message: <b>{m.m_message}</b></p>
              <p>Reply: <b>{m.m_reply}</b></p>
            </div>
            <div className='col-md-2'>
              <a href='#edit' className='btn btn-primary'>
                <i className='fa fa-pencil'>Reply</i>
              </a>
              <br/>
              <a href='#delete' className='btn btn-danger'
                onClick={() => { deleteMessage(m.m_id) }}>
                <i className='fa fa-trash'>Delete</i>
              </a>
            </div>
          </div>
        )
      }) : <h4>No Messages Found!</h4>}
    </div>
  );
}

export default Messages;