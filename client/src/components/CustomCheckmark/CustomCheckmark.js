import React from 'react';
import classes from './CustomCheckmark.module.css';

const CustomCheckmark = (props) => (
  <div className={classes.Wrapper}>
    <input
      defaultChecked={props.defaultChecked}
      checked={props.checked}
      onChange={props.onChecked}
      type='checkbox'
      className={classes.Checkbox}
      id={props.id}
      hidden
    />
    <label className={classes.Checkmark} htmlFor={props.id}></label>
  </div>
);

export default CustomCheckmark;
