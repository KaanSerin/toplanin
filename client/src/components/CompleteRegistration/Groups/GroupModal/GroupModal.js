import React from 'react';
import classes from './GroupModal.module.scss';

const GroupModal = ({ onClickClose }) => {
  return (
    <div className={classes.GroupModal}>
      <div className={classes.Modal}>
        <div className={classes.Header}>
          <div onClick={onClickClose} className={classes.Close}>
            <i className='fas fa-times'></i>
          </div>
          <h1>RSM Accountants</h1>
          <p>26 Members • Public Group</p>
        </div>
        <section className={classes.Main}>
          <div className={classes.Organizer}>
            <div className={classes.Details}>
              <i className='far fa-user'></i>
              <div>
                <p>Organized by</p>
                <p>Bari Rosenberg</p>
              </div>
            </div>
            <div className={classes.Join}>
              <button>Add Me</button>
            </div>
          </div>
          <div className={classes.About}>
            <h2>About us</h2>
            <p>This group is about ...</p>
          </div>
          <div className={classes.GroupInfo}>
            <h2>Public group</h2>
            <p>This group's content ...</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroupModal;
