import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './AlmostDone.module.css';

const AlmostDone = (props) => {
  const email = props.location.search.split('=')[1];

  return (
    <div className={classes.Page}>
      <nav className={classes.Nav}>
        <Link to='/'>
          <img src='./logo.svg' alt='Meetup logo' />
        </Link>
        <div className={classes.links}>
          <a href='https://www.google.com'>Log in</a>
          <a href='https://www.google.com'>Sign up</a>
        </div>
      </nav>

      <section className={classes.Main}>
        <div className={classes.AlmostDone}>
          <div className={classes.Section}>
            <h1>Almost Done...</h1>
          </div>
          <div className={classes.Section}>
            <p>
              We just sent an email to {email} to verify your email address.
            </p>
            <p>
              You must <strong>click the link in that email</strong> to finish
              signing up.
            </p>
          </div>

          <p>
            If you <strong>do not</strong> receive the message in the next hour,
            you can <a href='#'>request another verification email.</a>
          </p>
        </div>
      </section>

      <footer>
        <div className={classes.Inner}>
          <div className={classes.Cta}>
            <p>Create your own Meetup group.</p>
            <a href='http://www.google.com'>Get Started</a>
          </div>

          <div className={classes.Links}>
            <div className={classes.LinkGroup}>
              <p>Your Account</p>
              <a href='http://www.google.com.tr'>Sign up</a>
              <a href='http://www.google.com.tr'>Log in</a>
              <a href='http://www.google.com.tr'>Help</a>
            </div>
            <div className={classes.LinkGroup}>
              <p>Discover</p>
              <a href='http://www.google.com.tr'>Groups</a>
              <a href='http://www.google.com.tr'>Calendar</a>
              <a href='http://www.google.com.tr'>Topics</a>
              <a href='http://www.google.com.tr'>Cities</a>
            </div>
            <div className={classes.LinkGroup}>
              <p>Meetup</p>
              <a href='http://www.google.com.tr'>About</a>
              <a href='http://www.google.com.tr'>Blog</a>
              <a href='http://www.google.com.tr'>Meetup Pro</a>
              <a href='http://www.google.com.tr'>Careers</a>
              <a href='http://www.google.com.tr'>Apps</a>
            </div>
          </div>
          <div className={classes.FollowUs}>
            <div className={classes.Socials}>
              <p>Follow Us</p>
              <div className={classes.Icons}>
                <a href='http://www.google.com.tr'>
                  <i className='fab fa-facebook'></i>
                </a>
                <a href='http://www.google.com.tr'>
                  <i className='fab fa-twitter'></i>
                </a>
                <a href='http://www.google.com.tr'>
                  <i className='fab fa-youtube'></i>
                </a>
                <a href='http://www.google.com.tr'>
                  <i className='fab fa-instagram'></i>
                </a>
              </div>
            </div>
            <div className={classes.Apps}>
              <img src='./index-svg/google-play-badge.png' alt='' />
              <img src='./index-svg/app-store-badge.png' alt='' />
            </div>
          </div>

          <div className={classes.Policy}>
            <p>© 2020 Toplanın</p>
            <a href='http://www.google.com.tr'>Terms of Service</a>
            <a href='http://www.google.com.tr'>Privacy Policy</a>
            <a href='http://www.google.com.tr'>Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlmostDone;
