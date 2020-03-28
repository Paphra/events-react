import React, {useState} from 'react';
import {Form, Button, Modal, Col} from 'react-bootstrap';
import {makeId} from '../Custom/Functions';

//import axios from 'axios';
//import { Redirect } from 'react-router-dom';

const ModalBookEvent = (props) => {
  const event = props.event;

  const discounted = (price) => {
    return price - Math.ceil((price / 100) * event.e_discount);
  }

  //const [redirect, setRedirect] = useState(false);
  const [amount, setAmount] = useState(discounted(event.e_price));
  const [tickets, setTickets] = useState(1);

  const calcAmount=(ev)=>{
    let tkts = ev.target.value;
    let unitP = event.e_price;

    if(tkts > 0){
      setTickets(tkts);
      unitP = discounted(unitP);
      setAmount(tkts * unitP);
    }
  }

  const handleBookEvent = (e) => {
    e.preventDefault();
    
    let f = e.target;
    let fields = {
      b_id: makeId(),
      b_event_id: event.e_id,
      b_type: 'MERCHANT',
      b_reference: makeId(15),
      b_first_name: f.b_first_name.value,
      b_last_name: f.b_last_name.value,
      b_unit_price: event.e_price,
      b_discount: event.e_discount,
      b_tickets: tickets,
      b_amount: amount,
      b_email: f.b_email.value,
      b_phone: f.b_phone.value,
    };
    let data = new FormData();
    Object.keys(fields).map(f => data.append(f, fields[f]));
    alert("Booking Event \n"+ event.e_title);
    /*
    axios.post("http://localhost:9000/bookings", data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        if (res.statusText === 'OK') {
          setRedirect(true);
        }
      })
      )*/
    
    props.onHide();
  }

  /*
  const redirectToEvents = () => {
    if (redirect) return <Redirect to='/events' />
  }
  */

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/*redirectToEvents()*/}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Book/Pay Ticket for: {event.e_title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleBookEvent}>
          <Form.Row>
            <Form.Group as={Col} controlId="b_first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" required />
            </Form.Group>

            <Form.Group as={Col} controlId="b_last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" required />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="b_email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Email Address" required />
            </Form.Group>

            <Form.Group as={Col} controlId="b_phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Phone Number" required />
            </Form.Group>
          </Form.Row>
          <Form.Label><h5>Tickets</h5></Form.Label>
          <Form.Row>
            <Form.Group as={Col} controlId="b_tickets">
              <Form.Label>Number Of Tickets</Form.Label>
              <Form.Control type='number' min='1' max={event.e_tickets}
                value={tickets}
                required onChange={calcAmount}/>
            </Form.Group>
            <Form.Group as={Col} controlId="b_tickets">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control type='number' value={event.e_price} 
                required readOnly/>
            </Form.Group>

            <Form.Group as={Col} controlId="b_discount">
              <Form.Label>Discount [%]</Form.Label>
              <Form.Control type='number' value={event.e_discount} readOnly />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="b_amount">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type='number' required value={amount} readOnly />
          </Form.Group>
          <Form.Group controlId="b_action">
            <Form.Label>Action</Form.Label>
            <Form.Control as="select" required>
              <option value='Pay'>Pay Ticket</option>
              <option value='Book'>Book Ticket</option>
            </Form.Control>
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">Book/Buy Ticket</Button>
            <Button variant='danger' onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalBookEvent;