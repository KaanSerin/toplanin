import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Groups.module.scss';
import axios from 'axios';
import GroupModal from './GroupModal/GroupModal';

const Groups = ({ history, updateGroups }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      const res = await axios.get('http://localhost:5000/api/groups/popular');

      setGroups(res.data.groups.map((group) => ({ ...group, joined: false })));
    };

    fetchGroupData();
  }, []);

  const onClickJoinBtn = (id) => {
    const newGroups = groups.map((group) => {
      if (group.group_id === id) {
        group.joined = !group.joined;
      }
      return group;
    });

    setGroups(newGroups);
  };

  const onClickGroup = (id) => {
    if (showGroupModal) return;
    setSelectedGroups(groups.find((group) => group.group_id === id));
    setShowGroupModal(true);
  };

  const onClickNext = () => {
    updateGroups(groups.filter((group) => group.joined));
    history.push('/complete/events');
  };

  return (
    <div className={classes.Groups}>
      <h1>Find a group to join</h1>
      <p>
        Join groups to start meeting up and get suggestions based on what you
        join.
      </p>

      {showGroupModal ? (
        <GroupModal
          group={selectedGroups}
          onClickJoin={onClickJoinBtn}
          onClickClose={() => setShowGroupModal(false)}
        />
      ) : null}

      <div className={classes.GroupsList}>
        {groups.map((group) => (
          <div key={group.group_id} className={classes.Group}>
            <div
              onClick={() => onClickGroup(group.group_id)}
              className={classes.Details}
            >
              <h3>{group.name}</h3>
              <p>
                {group.no_of_members} Members •{' '}
                {group.public ? 'Public' : 'Private'} Group
              </p>
            </div>
            <div className={classes.Join}>
              <div
                onClick={() => onClickJoinBtn(group.group_id)}
                className={`${classes.JoinBtn} ${
                  group.joined ? classes.Joined : null
                }`}
              >
                +
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onClickNext}>Next</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateGroups: (groups) =>
      dispatch({ type: 'registration/updateGroups', payload: groups }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Groups));
