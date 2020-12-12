import React, { useState } from 'react';
import classes from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={classes.SearchBar}>
      <div className={classes.Inputs}>
        <div className={classes.Keywords}>
          <i className='fas fa-search'></i>
          <input type='text' placeholder='Find your next event' />
        </div>
        <div className={classes.Location}>
          <i className='fas fa-map-marker-alt'></i>
          <input type='text' placeholder='Istanbul, TR' />
        </div>
      </div>
      <button className='Search' href='http://www.google.com'>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
