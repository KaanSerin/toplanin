import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmailForm from './EmailForm/EmailForm';
import classes from './Register.module.css';

const Register = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    // If exists, fetch stored user data
    let user_data = localStorage.getItem('user_data');

    if (user_data !== null || user_data !== '') {
      user_data = JSON.parse(user_data);

      setUserLocation({
        country: user_data.location.country,
        name: user_data.location.city,
        latitude: user_data.location.latitude,
        longitude: user_data.location.longitude,
      });
    }
  }, []);

  return (
    <Fragment>
      <nav className={classes.Nav}>
        <Link to='/'>
          <img src='/register/logo2.svg' alt='Meetup.com Logo' />
        </Link>
      </nav>

      <section className={classes.Main}>
        <div className={classes.Inner}>
          <p className={classes.Cta}>Sign up</p>

          <div className={`${classes.SignUpOption} ${classes.Facebook}`}>
            <i className='fab fa-facebook-f'></i>
            <p>Continue with Facebook</p>
          </div>
          <div className={[classes.SignUpOption]}>
            <i className='fab fa-google'></i>
            <p>Continue with Google</p>
          </div>
          <div className={[classes.SignUpOption]}>
            <i className='fab fa-apple'></i>
            <p>Continue with Apple</p>
          </div>

          {!showEmailForm ? (
            <p
              className={classes.FormLink}
              onClick={() => setShowEmailForm(true)}
            >
              Or sign up with email
            </p>
          ) : null}

          {showEmailForm ? (
            <EmailForm
              onLocationChange={setUserLocation}
              userLocation={userLocation}
            ></EmailForm>
          ) : null}
        </div>

        <p>
          Already a member? <Link to='/login'>Log in</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
