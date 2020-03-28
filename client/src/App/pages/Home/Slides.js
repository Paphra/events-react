import React, {useState} from 'react';
import { countDown, getImage, checkDate } from '../Custom/Functions.js';
import {Carousel, Button} from 'react-bootstrap';

import ModalBookEvent from '../Events/ModalBook.js';

const Slides = (props) => {

  const [showBook, setShowBook] = useState(false);
  const events = props.events;
  
  return (
    <div>
      <Carousel>
        {events.map((ev, index) =>
        checkDate(ev.e_start_date) ?
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={getImage(ev.e_image)}
              alt={ev.e_title}
            />

            <Carousel.Caption>
              <div className='bg-dark Slide-caption'>
                <h3>{ev.e_title}</h3>
                <h4>{ev.e_tickets} Tickets Left.</h4>
                <h5>{countDown(ev.e_start_date, ev.e_start_time)}</h5>
                <p>{ev.e_description}</p>
              </div><br />
              <Button variant="primary" onClick={() => { setShowBook(true) }}>Book/Buy Ticket</Button>
              <ModalBookEvent
                event={ev}
                show={showBook}
                onHide={() => { setShowBook(false) }}
              />
            </Carousel.Caption>
          </Carousel.Item>
        : ()=>{}
        )}
      </Carousel>
    </div> 
  );
}

export default Slides;