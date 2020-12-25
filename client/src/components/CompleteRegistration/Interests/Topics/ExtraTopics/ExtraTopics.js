import React from 'react';
import classes from '../Topics.module.css';
import hobbies from '../../../../../hobbies.json/hobbies.json';
/**
 * @Todo  Fetch extra topics from the server and display them
 */
const ExtraTopics = () => {
  console.log(hobbies);
  return (
    <div className={classes.ExtraTopics}>
      <label htmlFor='extra-topics'>Anything else?</label>
      <input type='text' name='extra-topics' id='extra-topics' />
    </div>
  );
};

export default ExtraTopics;
