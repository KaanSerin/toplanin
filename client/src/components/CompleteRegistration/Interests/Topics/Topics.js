import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Topics.module.css';
import CustomCheckmark from '../../../CustomCheckmark/CustomCheckmark';
import ExtraTopics from './ExtraTopics/ExtraTopics';

const Topics = ({ interests }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      const reqData = {
        interests: interests.map((interest) => interest.category_id),
      };

      try {
        const res = await axios.post(
          'http://localhost:5000/api/events/subcategories',
          reqData
        );

        const newTopics = res.data.data.map((topic) => ({
          ...topic,
          selected: false,
        }));

        setTopics(newTopics);
      } catch (error) {
        console.log(error);
      }
    };

    getTopics();

    // eslint-disable-next-line
  }, []);

  const onCheckboxChecked = (id) => {
    const newTopic = topics.map((topic) => {
      if (topic.subcategory_id === id) {
        topic.selected = !topic.selected;
      }

      return topic;
    });

    setTopics(newTopic);
  };

  return (
    <div className={classes.Topics}>
      <h1>Now narrow it down</h1>
      {interests.map((interest) => (
        <div key={interest.category_id} className={classes.Topic}>
          <h2>{interest.category_name}</h2>
          <ul className={classes.Interests}>
            {topics
              .filter((topic) => topic.category_id === interest.category_id)
              .map((topic) => (
                <li key={topic.subcategory_id} className={classes.Interest}>
                  <CustomCheckmark
                    onChecked={() => onCheckboxChecked(topic.subcategory_id)}
                    id={topic.subcategory_id}
                  />
                  {topic.subcategory_name}
                </li>
              ))}
          </ul>
        </div>
      ))}

      <ExtraTopics />
      <button className={classes.Next}>Next</button>
    </div>
  );
};

export default Topics;
