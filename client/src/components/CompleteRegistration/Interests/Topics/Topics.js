import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import classes from './Topics.module.css';
import CustomCheckmark from '../../../CustomCheckmark/CustomCheckmark';
import ExtraTopics from './ExtraTopics/ExtraTopics';

const Topics = ({ history, interests, onSetTopics }) => {
  const [topics, setTopics] = useState([]);
  const [topicsExtra, setTopicsExtra] = useState([]);

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

  const onExtraTopicsChecked = (id) => {
    const newTopicsExtra = topicsExtra.filter((te) => te.id !== id);

    setTopicsExtra(newTopicsExtra);
  };

  const onSelectExtraTopic = (topic) => {
    const newTopic = {
      id: uuidv4(),
      ...topic,
    };
    const newTopics = [...topicsExtra, newTopic];
    setTopicsExtra(newTopics);
  };

  const onConfirmTopics = () => {
    // Combine the topics and extra topics

    const newTopics = [
      ...topics
        .filter((topic) => topic.selected)
        .map((topic) => topic.subcategory_name),
      ...topicsExtra.map((te) => te.title),
    ];

    onSetTopics(newTopics);

    history.push('/complete/groups');
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

      <ExtraTopics onSelectExtraTopic={onSelectExtraTopic} />

      <ul className={classes.ExtraTopicsList}>
        {topicsExtra.map((te) => (
          <li
            onClick={() => onExtraTopicsChecked(te.id)}
            key={`${te.title}_${te.category}_${te.subCategory}`}
          >
            <CustomCheckmark defaultChecked={true} id={te.id} />
            {`${te.title} (${te.category})`}
          </li>
        ))}
      </ul>

      <button onClick={onConfirmTopics} className={classes.Next}>
        Next
      </button>
    </div>
  );
};

export default withRouter(Topics);
