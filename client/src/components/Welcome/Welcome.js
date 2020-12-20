import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import classes from './Welcome.module.css';

const Welcome = () => {
  return (
    <Fragment>
      <nav className={classes.Nav}>
        <Link to='/'>
          <img src='./register/logo2.svg' alt='Meetup logo' />
        </Link>
      </nav>

      <div className={classes.Main}>
        <section className={classes.Inner}>
          <h1>Welcome</h1>
          <p>Add a photo so other members know who you are.</p>
          <i className='far fa-user'></i>
          <button className={classes.Upload}>Upload a photo</button>

          <div className={classes.Or}>
            <span className={classes.Line}></span>{' '}
            <span className={classes.Inner}>OR</span>
            <span className={classes.Line}></span>
          </div>

          <div className={[classes.SignUpOption]}>
            <i className='fab fa-facebook'></i>
            <p>Continue with Google</p>
          </div>

          <p className={classes.Skip}>Skip for now</p>
        </section>
      </div>
    </Fragment>
  );
};

export default Welcome;
