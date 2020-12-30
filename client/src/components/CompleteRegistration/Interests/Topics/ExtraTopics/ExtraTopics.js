import React, { useState } from 'react';
import classes from '../Topics.module.css';
import hobbies from '../../../../../hobbies.json/hobbies.json';

const ExtraTopics = ({ onSelectExtraTopic }) => {
  const [extraTopics, setExtraTopics] = useState([]);

  const onInputChange = (e) => {
    const value = e.target.value;
    const valueLength = value.length;
    if (value.length < 2) return;

    let filteredHobbies = hobbies
      .filter(
        (hobby) =>
          hobby.title.slice(0, valueLength).toLowerCase() ===
          value.toLowerCase()
      )
      .splice(0, 5);

    setExtraTopics(filteredHobbies);
  };

  const onTopicClick = (event, topic) => {
    onSelectExtraTopic(topic);

    /** @Todo Remove the suggested topic from suggestions */
  };

  return (
    <div className={classes.ExtraTopics}>
      <div className={classes.TopicsArea}>
        {extraTopics.map((topic) => (
          <div
            onClick={(event) => onTopicClick(event, topic)}
            className={classes.Topic}
            key={`${topic.title}_${topic.category}_${topic.subCategory}`}
          >{`${topic.title} (${topic.category})`}</div>
        ))}
      </div>
      <label htmlFor='extra-topics'>Anything else?</label>
      <input
        onChange={(e) => onInputChange(e)}
        type='text'
        name='extra-topics'
        id='extra-topics'
      />
    </div>
  );
};

export default ExtraTopics;
