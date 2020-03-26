import React, { useState } from 'react';
import { makeDate, getImage } from '../Custom/Functions.js';
import { CardColumns, Card, Button } from 'react-bootstrap';

import ModalBookEvent from '../Events/ModalBook.js';

const UpEvents =(props)=>{

  const [showBook, setShowBook] = useState(false);
  const events = props.events;
  const evalDate =(date)=>{
    return (new Date(date)) > (new Date());
  }
  return (
      <CardColumns >
        {(events) ? events.map((ev, idx) => (
          <Card
            bg={'dark'}
            key={idx}
            text={'dark' === 'light' ? 'dark' : 'white'}
            style={{ width: '14rem' }}
          >
            <Card.Img variant="top" src={getImage(ev.e_image)} />
            {/*<Card.Header>{ev.e_title}</Card.Header>*/}
            <Card.Body>
              <Card.Title>{ev.e_title}</Card.Title>
              <Card.Text>
                {ev.e_description.substr(0, 40) + ' ...'}<br />
                    At {ev.e_venue}<br />
                    Date: {makeDate(ev.e_start_date, ev.e_start_time).txt} <br />
              </Card.Text>
              {evalDate(ev.e_start_date) ?
               <div>
                  <Button variant="primary" onClick={() => { setShowBook(true) }}>Book/Buy Ticket</Button>
                  <ModalBookEvent
                    event={ev}
                    show={showBook}
                    onHide={() => { setShowBook(false) }}
                  />
               </div>
              : ()=>{} }
              
            </Card.Body>
          </Card>
        )) : <h4>No Events to Display</h4>}
      </CardColumns>
     
  );
}


export default UpEvents;