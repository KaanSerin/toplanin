import React from 'react';
import classes from './EventCard.module.css';

const EventCard = (props) => {
  return (
    <div className={classes.EventCard}>
      <div className={classes.OnlineEvent}>
        <i class='fas fa-video'></i>
        <p>Online Event</p>
      </div>
      <img
        src='https://secure.meetupstatic.com/photos/event/c/8/3/e/highres_492831262.jpeg'
        alt=''
      />
      <div className={classes.Details}>
        <div className={classes.DueDate}>Mon, Dec 14, 7:00 PM GMT+2</div>
        <p className={classes.EventName}>
          BA 0.6 - Agile Leadership for Innovation and Serving Others (ONLINE)
        </p>
        <p className={classes.EventDescription}>
          Business Agility Meetup Berlin
        </p>
        <div className={classes.Participents}>
          <div className={classes.Pics}>
            <img src='https://i.pravatar.cc/150' alt='' />
            <img src='https://i.pravatar.cc/150' alt='' />
            <img src='https://i.pravatar.cc/150' alt='' />
          </div>
          <p>100</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
