import React, { useState } from 'react';
import classes from '../Register.module.css';
import cities from 'cities.json';

const LocationSearch = (props) => {
  const [locations, setLocations] = useState([]);

  const onInputChange = (e) => {
    const value = e.target.value;
    const valueLength = value.length;
    if (value.length < 2) return;

    let filteredCities = cities
      .filter(
        (city) =>
          city.name.slice(0, valueLength).toLowerCase() === value.toLowerCase()
      )
      .splice(0, 5);

    setLocations(filteredCities);
  };

  return (
    <div className={classes.LocationSearch}>
      <input onChange={onInputChange} type='text' name='location_search' />
      <ul className={classes.SearchResults}>
        {locations.map((location) => (
          <li
            onClick={() => props.onLocationChange(location)}
            key={`${location.name}.${location.lat}`}
          >{`${location.name}, ${location.country}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearch;
