// CalendarView.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import 'react-calendar/dist/Calendar.css'; 
import Loading from './Loading';

const CalendarView = () => {
  
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
   
    const mount = async () => {
      try {
        const token = Cookies.get('authToken');
        console.log(token);
        const response = await fetch(`${process.env.REACT_APP_URL}/user/data/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
        if (!response.ok) console.log("Failed To fetch Events !!!");
        else {
          const data = await response.json();
          console.log(data);
          setEvents(data);
          console.log("setting events");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    mount();
  }, []);

  return (
    <div>
      {loader ? (
        <Loading />
      ) : (
        <>
          <Navbar />

          <div className="container_001">
            {events.length > 0 ? (
              events.map((element, index) => (
                <div className="card" key={index}>
                  <img
                    className="card-img-top"
                    src="https://cdn1.vectorstock.com/i/1000x1000/63/75/event-planning-logotype-vector-48806375.jpg"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                    <p className="card-venue">{element.venue}</p>
                    <p className="card-text">{element.description}</p>
                    <p className="card-date">{element.eventDate.slice(0, 10)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>No Events Available Now</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarView;
