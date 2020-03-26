import React, {useState, useEffect} from 'react';
import {getMessages, makeDate} from '../Custom/Functions';


const Messages =(props)=>{
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    getMessages(setMessages);
  }, []);

  return (
    <div>
      <table border='1' width='100%'>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Message</th>
            <th>Reply</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages ? messages.map((m, ix) => {
            return (
              <tr key={ix}>
                <td>{makeDate(m.m_entry_date).txt}</td>
                <td>{m.m_sender_name}</td>
                <td>{m.m_sender_email}<br/>{m.m_sender_phone}</td>
                <td>{m.m_message}</td>
                <td>{m.m_reply}</td>
                <td>
                  <a href='#edit'><i className='fa fa-refresh'></i></a>
                  <a href='#delete' ><i className='fa fa-trash'></i></a>
                </td>
              </tr>
            )
          }) : <tr><td colSpan='6'><h6>No Messages Found!</h6></td></tr>}

        </tbody>
      </table>
    </div>
  );
}

export default Messages;