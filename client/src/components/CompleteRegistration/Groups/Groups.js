import React, { useState, useEffect } from 'react';
import classes from './Groups.module.scss';
import axios from 'axios';

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      const res = await axios.get('http://localhost:5000/api/groups/popular');

      setGroups(res.data.groups);
    };

    fetchGroupData();
  }, []);

  return (
    <div className={classes.Groups}>
      <h1>Find a group to join</h1>
      <p>
        Join groups to start meeting up and get suggestions based on what you
        join.
      </p>
      <div className={classes.GroupsList}>
        {groups.map((group) => (
          <div key={group.group_id} className={classes.Group}>
            <div className={classes.Details}>
              <h3>{group.name}</h3>
              <p>X Members • Public Group</p>
            </div>
            <div className={classes.Join}>
              <div className={classes.JoinBtn}>+</div>
            </div>
          </div>
        ))}
      </div>

      <button>Next</button>
    </div>
  );
};

export default Groups;
