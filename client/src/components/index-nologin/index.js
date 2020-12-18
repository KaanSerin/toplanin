import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Index.module.css';
import SearchBar from './SearchBar/SearchBar';
import publicIp from 'public-ip';
import axios from 'axios';
import EventCardCarousel from '../EventCarousel/EventCardCarousel';
import EventCategories from '../EventCategories/EventCategories';

const IndexNoLogin = () => {
  const [searchText, setSearchText] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [userInfo, setUserInfo] = useState({});

  const [eventCategories, setEventCategories] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      try {
        // Get user ip
        const ip = await publicIp.v4();
        setUserInfo({ ...userInfo, ip });

        // Get user city and country by their ip
        const { data } = await axios.get(
          `http://localhost:5000/api/client/getInfo/${ip}`
        );

        setSearchLocation(`${data.data.city}, ${data.data.country_code}`);
      } catch (error) {
        console.log(error);
      }
    }

    getUserInfo();

    async function getEventCategories() {
      const { data } = await axios.get(
        'http://localhost:5000/api/events/eventcategories'
      );

      setEventCategories(data.data);
    }

    getEventCategories();
  }, []);

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

      <div className={classes.Main}>
        <div className={classes.Ctarea}>
          <div className={classes.Cta}>
            <div className={classes.text}>
              Discover events for all the things you love
            </div>
            <Link to='/register'>Join Meetup</Link>
          </div>
          <img
            src='./index-svg/online-call.svg'
            alt=''
            className={classes.OnlineCall}
          />
        </div>

        <div className={classes.Events}>
          <SearchBar
            searchText={searchText}
            onSearchChange={setSearchText}
            searchLocation={searchLocation}
            onLocationChange={setSearchLocation}
          ></SearchBar>

          <p className={classes.Subheading}>Events near {searchLocation}</p>
          <EventCardCarousel></EventCardCarousel>

          <p className={classes.Subheading}>Career & Business</p>
          <EventCardCarousel></EventCardCarousel>

          <p className={classes.Subheading}>Outdoors & Adventure</p>
          <EventCardCarousel></EventCardCarousel>

          <p className={classes.Subheading}>Learning</p>
          <EventCardCarousel></EventCardCarousel>

          <p className={classes.Subheading}>Tech</p>
          <EventCardCarousel></EventCardCarousel>

          <p className={classes.Subheading}>Social</p>
          <EventCardCarousel></EventCardCarousel>

          <p className={classes.Subheading}>Browse events by category</p>
          <EventCategories categories={eventCategories}></EventCategories>
        </div>
      </div>

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
    </Fragment>
  );
};

export default IndexNoLogin;
