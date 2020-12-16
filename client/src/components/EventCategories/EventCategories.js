import React from 'react';
import classes from './EventCategories.module.css';

const EventCategories = (props) => {
  const sampleData = [];

  // Pushing placeholder data
  for (let i = 0; i < 24; i++) {
    sampleData.push(
      <div className={classes.EventCategory}>
        <img
          src='https://hikeitbaby.com/wp-content/uploads/2020/06/StephanieJacobson.jpg'
          alt=''
        />
        <p>Outdoors & Adventure</p>
      </div>
    );
  }

  return (
    <div className={classes.EventCategories}>
      <div className={classes.Row}>{sampleData}</div>
    </div>
  );
};

export default EventCategories;
