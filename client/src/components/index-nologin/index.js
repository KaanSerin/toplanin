import React, { Fragment } from 'react';
import classes from './index.module.css';
const IndexNoLogin = () => {
  return (
    <Fragment>
      <img
        src='./index-svg/blob-left.svg'
        alt=''
        className={classes.blobLeft}
      />
      <img
        src='./index-svg/blob-right.svg'
        alt=''
        className={classes.blobRight}
      />
      <header>
        <nav className={classes.Nav}>
          <img src='./logo.svg' alt='Meetup logo' />
          <div className={classes.links}>
            <a href='https://www.google.com'>Log in</a>
            <a href='https://www.google.com'>Sign up</a>
          </div>
        </nav>
        <img
          src='./index-svg/blob-top.svg'
          alt=''
          className={classes.blobTop}
        />

        <img
          src='./index-svg/blob-bottom-right.svg'
          alt=''
          className={classes.blobBottomRight}
        />
      </header>
      <div className={classes.Ctarea}>
        <div className={classes.Cta}>
          <div className={classes.text}>
            Discover events for all the things you love
          </div>
          <a href='https://www.google.com'>Join Meetup</a>
        </div>
        <img
          src='./index-svg/online-call.svg'
          alt=''
          className={classes.OnlineCall}
        />
      </div>
    </Fragment>
  );
};

export default IndexNoLogin;