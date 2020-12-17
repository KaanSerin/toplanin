import React from 'react';
import classes from './EventCategories.module.css';

const EventCategories = (props) => {
  const categories_list = [];

  props.categories.forEach((category) => {
    categories_list.push(
      <div key={category.category_id} className={classes.EventCategory}>
        <img
          src='https://hikeitbaby.com/wp-content/uploads/2020/06/StephanieJacobson.jpg'
          alt=''
        />
        <p>{category.category_name}</p>
      </div>
    );
  });

  return (
    <div className={classes.EventCategories}>
      <div className={classes.Row}>{categories_list}</div>
    </div>
  );
};

export default EventCategories;
