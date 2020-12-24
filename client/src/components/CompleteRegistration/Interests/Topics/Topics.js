import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Topics.module.css';
import CustomCheckmark from '../../../CustomCheckmark/CustomCheckmark';

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

        setTopics(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTopics();
  }, []);

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
                  <CustomCheckmark id={topic.subcategory_id} />
                  {topic.subcategory_name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Topics;
