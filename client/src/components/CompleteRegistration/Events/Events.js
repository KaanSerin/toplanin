import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import classes from './Events.module.scss';

const Events = ({ event, registration }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    completeRegistration();

    const fetchEventData = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/events?long=28.9744&lat=41.0177&limit=1'
      );

      setEvents(res.data.events);
    };

    fetchEventData();

    // eslint-disable-next-line
  }, []);

  const completeRegistration = async () => {
    try {
      const data = {
        ...registration,
        interests: registration.interests.map(
          (interest) => interest.category_id
        ),
        groups: registration.groups.map((group) => group.group_id),
      };

      const res = await axios.post(
        'http://localhost:5000/api/auth/register/complete',
        data,
        { withCredentials: true }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.Events}>
      <h1>Find your first event</h1>
      <p>Explore what's happening based on your groups and interests</p>

      <div className={classes.EventsList}>
        {events.map((event) => (
          <div key={event.event_id} className={classes.Event}>
            <div className={classes.Details}>
              <h2 className={classes.EventName}>{event.event_name}</h2>
              <p className={classes.GroupName}>{event.group_name}</p>
              <p className={classes.Time}>{event.date}</p>
              <p className={classes.Location}>
                {event.online ? 'Online' : event.location}
              </p>
            </div>
            <div className={classes.Going}>
              Going <i className='fas fa-check'></i>
            </div>
            <div className={classes.Participents}>
              <div className={classes.Pics}>
                <img src='https://i.pravatar.cc/150' alt='' />
                <img src='https://i.pravatar.cc/150' alt='' />
                <img src='https://i.pravatar.cc/150' alt='' />
                <img src='https://i.pravatar.cc/150' alt='' />
                <p>{event.attendees} attendees</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button>Next</button>
    </div>
  );
};

const mapStateToProps = (state) => ({ registration: state.registration });

export default connect(mapStateToProps)(withRouter(Events));
