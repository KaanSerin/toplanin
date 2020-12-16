import React, { Fragment, useState, useEffect } from 'react';
import classes from './index.module.css';
import SearchBar from './SearchBar/SearchBar';
import publicIp from 'public-ip';
import axios from 'axios';
import EventCardCarousel from '../EventCarousel/EventCardCarousel';
import EventCategories from '../EventCategories/EventCategories';

const IndexNoLogin = () => {
  const [searchText, setSearchText] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [userInfo, setUserInfo] = useState({});

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
            <a href='https://www.google.com'>Join Meetup</a>
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
          <EventCategories></EventCategories>
        </div>
      </div>
    </Fragment>
  );
};

export default IndexNoLogin;
