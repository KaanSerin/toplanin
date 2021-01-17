import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classes from '../Register.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import LocationSearch from './LocationSearch';
import axios from 'axios';

const EmailForm = withRouter(({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLocation, setUserLocation] = useState({});

  const [captchaDone, setCaptchaDone] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  useEffect(() => {
    // If exists, fetch stored user data
    let user_data = localStorage.getItem('user_data');

    if (user_data !== null || user_data !== '') {
      user_data = JSON.parse(user_data);

      setUserLocation({
        country: user_data.location.country,
        name: user_data.location.city,
        lat: user_data.location.latitude,
        lng: user_data.location.longitude,
      });
    }
  }, []);

  const onLocationSelect = (location) => {
    setUserLocation(location);
    setShowLocationSearch(false);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!captchaDone) return;

    sendRegisterRequest();

    console.log('Submitted');
  };

  const sendRegisterRequest = async () => {
    const newUser = {
      name,
      email,
      password,
      location: `${userLocation.lat}, ${userLocation.lng}`,
    };

    console.log(newUser);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        newUser,
        {
          withCredentials: true,
          credentials: 'include',
        }
      );
      console.log(res);

      if (res.data.success && res.data.success === true)
        history.push(`/almost-done?email=${email}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onCaptchaSubmit = (value) => {
    setCaptchaDone(true);
    console.log(`Captcha value: ${value}`);
  };

  return (
    <div className={classes.EmailSignup}>
      <form onSubmit={onFormSubmit}>
        <div className={classes.FormGroup}>
          <label htmlFor='name'>Your name</label>
          <input
            required={true}
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.FormGroup}>
          <label htmlFor='email'>Email address</label>
          <input
            required={true}
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.FormGroup}>
          <label htmlFor='password'>Password</label>
          <input
            required={true}
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className={classes.Location}>
          <i className='fas fa-map-marker-alt'></i>
          {`${userLocation.name}, ${userLocation.country}`}
          <span onClick={() => setShowLocationSearch(!showLocationSearch)}>
            (change)
          </span>
        </p>

        {showLocationSearch ? (
          <LocationSearch onLocationChange={onLocationSelect}></LocationSearch>
        ) : null}

        <ReCAPTCHA
          onExpired={() => setCaptchaDone(false)}
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
});

export default EmailForm;
