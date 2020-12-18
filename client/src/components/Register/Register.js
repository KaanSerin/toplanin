import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Register.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

const Register = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
  };

  const onCaptchaSubmit = (value) => {
    console.log(`Captcha value: ${value}`);
  };

  let emailForm = (
    <div className={classes.EmailSignup}>
      <form onSubmit={onFormSubmit}>
        <div className={classes.FormGroup}>
          <label htmlFor='name'>Your name</label>
          <input type='text' name='name' />
        </div>
        <div className={classes.FormGroup}>
          <label htmlFor='email'>Email address</label>
          <input type='email' name='email' />
        </div>
        <div className={classes.FormGroup}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' />
        </div>

        <ReCAPTCHA
          sitekey='6Leo-gsaAAAAAO9Uxb7HKa3F3_0nMin1bfc6wdpH'
          onChange={onCaptchaSubmit}
        />

        <p className={classes.Disclaimer}>
          Your name is public. We'll use your email address to send you updates,
          and your location to find Meetups near you.
        </p>

        <button type='submit' className={classes.Submit}>
          Continue
        </button>

        <p className={classes.ToS}>
          When you "Continue", you agree to Meetup's{' '}
          <a href='http://www.google.com.tr'>Terms of Service.</a> We will
          manage information about you as described in our{' '}
          <a href='http://www.google.com.tr'>Privacy Policy</a>, and{' '}
          <a href='http://www.google.com.tr'>Cookie Policy.</a>
        </p>
      </form>
    </div>
  );

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

          {showEmailForm ? emailForm : null}
        </div>

        <p>
          Already a member? <Link to='/login'>Log in</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
