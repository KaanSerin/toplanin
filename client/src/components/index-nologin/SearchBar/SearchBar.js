import React from 'react';
import classes from './SearchBar.module.css';

const SearchBar = (props) => {
  const {
    searchText,
    searchLocation,
    onSearchChange,
    onLocationChange,
  } = props;

  return (
    <div className={classes.SearchBar}>
      <div className={classes.Inputs}>
        <div className={classes.Keywords}>
          <i className='fas fa-search'></i>
          <input
            type='text'
            placeholder='Find your next event'
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className={classes.Location}>
          <i className='fas fa-map-marker-alt'></i>
          <input
            type='text'
            placeholder='Istanbul, TR'
            value={searchLocation}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>
      </div>
      <button className='Search' href='http://www.google.com'>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
