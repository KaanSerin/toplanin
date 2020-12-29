import React from 'react';
import classes from './Groups.module.scss';

const Groups = () => {
  return (
    <div className={classes.Groups}>
      <h1>Find a group to join</h1>
      <p>
        Join groups to start meeting up and get suggestions based on what you
        join.
      </p>
      <div className={classes.GroupsList}>
        <div className={classes.Group}>
          <div className={classes.Details}>
            <h3>RSM Accountants</h3>
            <p>21 Members • Public Group</p>
          </div>
          <div className={classes.Join}>
            <div className={classes.JoinBtn}>+</div>
          </div>
        </div>
        <div className={classes.Group}>
          <div className={classes.Details}>
            <h3>RSM Accountants</h3>
            <p>21 Members • Public Group</p>
          </div>
          <div className={classes.Join}>
            <div className={classes.JoinBtn}>+</div>
          </div>
        </div>
        <div className={classes.Group}>
          <div className={classes.Details}>
            <h3>RSM Accountants</h3>
            <p>21 Members • Public Group</p>
          </div>
          <div className={classes.Join}>
            <div className={classes.JoinBtn}>+</div>
          </div>
        </div>
        <div className={classes.Group}>
          <div className={classes.Details}>
            <h3>RSM Accountants</h3>
            <p>21 Members • Public Group</p>
          </div>
          <div className={classes.Join}>
            <div className={classes.JoinBtn}>+</div>
          </div>
        </div>
        <div className={classes.Group}>
          <div className={classes.Details}>
            <h3>RSM Accountants</h3>
            <p>21 Members • Public Group</p>
          </div>
          <div className={classes.Join}>
            <div className={classes.JoinBtn}>+</div>
          </div>
        </div>
        <div className={classes.Group}>
          <div className={classes.Details}>
            <h3>RSM Accountants</h3>
            <p>21 Members • Public Group</p>
          </div>
          <div className={classes.Join}>
            <div className={classes.JoinBtn}>+</div>
          </div>
        </div>
        <div className={classes.Group}>
          <div className={classes.Details}>
            <h3>RSM Accountants</h3>
            <p>21 Members • Public Group</p>
          </div>
          <div className={classes.Join}>
            <div className={classes.JoinBtn}>+</div>
          </div>
        </div>
      </div>

      <button>Next</button>
    </div>
  );
};

export default Groups;
