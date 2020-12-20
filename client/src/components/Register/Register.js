import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import EmailForm from './EmailForm/EmailForm';
import classes from './Register.module.css';

const Register = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);

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

          {showEmailForm ? <EmailForm></EmailForm> : null}
        </div>

        <p>
          Already a member? <Link to='/login'>Log in</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
