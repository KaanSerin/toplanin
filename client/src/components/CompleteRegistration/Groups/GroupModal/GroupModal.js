import React, { Fragment } from 'react';
import classes from './GroupModal.module.scss';

const GroupModal = ({ group, onClickJoin, onClickClose }) => (
  <Fragment>
    <div onClick={onClickClose} className={classes.Background}></div>

    <div className={classes.Modal}>
      <div className={classes.Header}>
        <div onClick={onClickClose} className={classes.Close}>
          <i className='fas fa-times'></i>
        </div>
        <h1>{group.name}</h1>
        <p>{group.no_of_members} Members • Public Group</p>
      </div>
      <section className={classes.Main}>
        <div className={classes.Organizer}>
          <div className={classes.Details}>
            <i className='far fa-user'></i>
            <div>
              <p>Organized by</p>
              <p>{group.creator}</p>
            </div>
          </div>
          {group.joined ? (
            <div className={classes.Joined}>
              <p>
                <i className='fas fa-check'></i> Welcome
              </p>
            </div>
          ) : (
            <div className={classes.Join}>
              <button onClick={() => onClickJoin(group.group_id)}>
                Add Me
              </button>
            </div>
          )}
        </div>
        <div className={classes.About}>
          <h2>About us</h2>
          <p>{group.about}</p>
        </div>
        <div className={classes.GroupInfo}>
          <h2>{group.public ? 'Public' : 'Private'} group</h2>
          <p>This group's content ...</p>
        </div>
      </section>
    </div>
  </Fragment>
);

export default GroupModal;
