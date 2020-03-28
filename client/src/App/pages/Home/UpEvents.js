import React, { useState, useEffect } from 'react';
import { makeDate, getImage, checkDate, getPartners } from '../Custom/Functions.js';
import { Button } from 'react-bootstrap';
import ModalDetails from '../Events/ModalDetails';
import ModalBookEvent from '../Events/ModalBook';

const UpEvents =(props)=>{

  const [showBook, setShowBook] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [partners, setPartners] = useState([]);
  const events = props.events;
  
  useEffect(()=>{
    getPartners(setPartners);
    /*
    $('#upcoming').on('slide.bs.carousel', function (e) {
      /*
          CC 2.0 License Iatek LLC 2018 - Attribution required
      
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 5;
      var totalItems = $('.carousel-item').length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
          // append slides to end
          if (e.direction == "left") {
            $('.carousel-item').eq(i).appendTo('.carousel-inner');
          }
          else {
            $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
        }
      }
    });

    $('#finished').on('slide.bs.carousel', function (e) {
      /*
          CC 2.0 License Iatek LLC 2018 - Attribution required
      
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 5;
      var totalItems = $('.carousel-item').length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
          // append slides to end
          if (e.direction == "left") {
            $('.carousel-item').eq(i).appendTo('.carousel-inner');
          }
          else {
            $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
        }
      }
    });
    */
  }, []);

  return (
    <div>
      <div className="top-content">
        <div className="container-fluid">
          <div id="upcoming" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner row w-100 mx-auto Pad-events" role="listbox">

              {events.length ? events.map((ev, idx) => {
                return (
                  checkDate(ev.e_start_date) ?
                    <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active event-carousel-item" 
                      key={idx}>
                      <img src={getImage(ev.e_image)} alt={ev.e_title} className="img-fluid mx-auto d-block" />
                      <h3>{ev.e_title}</h3>
                      <p>{ev.e_description.substr(0, 50) + ' ...'}</p>
                      <p>At {ev.e_venue} | Date: <i>{makeDate(ev.e_start_date, ev.e_start_time).txt}</i> 
                        Upto: <i>{makeDate(ev.e_end_date, ev.e_end_time).txt}</i></p>
                      <Button variant="primary" onClick={() => { setShowBook(true) }} width='100%'>
                        Book/Buy Ticket</Button>
                      <ModalBookEvent
                        event={ev}
                        show={showBook}
                        onHide={() => { setShowBook(false) }}
                      />
                    </div>
                    : () => { }
                )
              }) : <h4>No Upcoming Events Found!</h4>}
            </div>
            <a className="carousel-control-prev" href="#upcoming" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#upcoming" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <hr/>
      <h3>Finished Events</h3>
      <div className="top-content">
        <div className="container-fluid">
          <div id="finished" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner row w-100 mx-auto Pad-events" role="listbox">
              
                {events.length ? events.map((ev, idx) => {
                  return (
                    !checkDate(ev.e_start_date) ?
                      <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active event-carousel-item"
                        key={idx}>
                        <img src={getImage(ev.e_image)} alt={ev.e_title} className="img-fluid mx-auto d-block" />
                        <a className="btn btn-danger"
                          href="#EventDetails" width='100%'
                          onClick={() => { setShowDetails(true) }}>Read More</a>
                        <h4>{ev.e_title} </h4>
                        <div className="posted-date">{makeDate(ev.e_start_date, ev.e_start_time).txt}</div>
                        <ModalDetails
                          show={showDetails}
                          onHide={() => { setShowDetails(false) }}
                          event={ev}
                        />
                      </div>
                    : () => { }
                  )
                }) : <p>No Events Found!</p>}
            </div>
            <a className="carousel-control-prev" href="#finished" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#finished" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      <div className="events-partners">
        <header className="entry-header">
          <h4>Partners</h4>
        </header>

        <div className="events-partners-logos flex flex-wrap justify-content-between align-items-center">
          {partners ? partners.map((p, idx) => {
            return <div className="event-partner-logo" key={idx}>
              <a href="#partner">
                <img src={getImage(p.p_logo, 'partners')} alt="" />
              </a>
            </div>
          }) : <p>No Partners Found!</p>}
        </div>
      </div>
    </div>
  );
}

export default UpEvents;