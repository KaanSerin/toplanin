import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Reason.module.css';

const Reason = ({ setReason, history }) => {
  const reasons = [
    'Develop a skill',
    'Find activities I enjoy',
    'Meet people like me',
    'Explore a new place',
    'Be more active',
    'Something else',
  ];

  const onSelectReason = (reason) => {
    setReason(reason);
    history.push('/complete/interests');
  };

  return (
    <div className={classes.Reasons}>
      <h1>What's your main reason for joining Meetup?</h1>
      <p>This will help us make good recommendations for you.</p>
      <ul className={classes.ReasonList}>
        {reasons.map((reason) => (
          <li
            onClick={() => onSelectReason(reason)}
            key={reason}
            className={classes.Reason}
          >
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(Reason);
