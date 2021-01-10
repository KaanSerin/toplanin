import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Interests.module.css';
import axios from 'axios';

const Interests = ({ setInterests, history }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    const getInterests = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/events/eventcategories'
      );

      const formattedData = res.data.data.map((interest) => ({
        ...interest,
        selected: false,
      }));

      setSelectedInterests(formattedData);
    };

    getInterests();
  }, []);

  const onInterestSelect = (id) => {
    const newInterests = selectedInterests.map((interest) => {
      if (interest.category_id === id) interest.selected = !interest.selected;

      return interest;
    });

    setSelectedInterests(newInterests);
  };

  const onClickNext = () => {
    setInterests(
      selectedInterests.filter((interest) => interest.selected === true)
    );
    history.push('/complete/topics');
  };

  return (
    <div className={classes.Interests}>
      <h1>Get started by picking a few interests</h1>
      <div className={classes.InterestList}>
        {selectedInterests.map((interest) => (
          <div
            onClick={() => onInterestSelect(interest.category_id)}
            className={`${classes.Interest} ${
              selectedInterests.find(
                (i) => i.category_id === interest.category_id
              ).selected
                ? `${classes.Selected}`
                : null
            }`}
            key={interest.category_id}
          >
            <p>{interest.category_name}</p>
          </div>
        ))}
      </div>

      <button onClick={onClickNext}>Next</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInterests: (interests) =>
      dispatch({ type: 'registration/updateInterests', payload: interests }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Interests));
