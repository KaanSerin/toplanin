import React, { useState, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toBase64 } from '../../../utility';

import Spinner from '../../Spinner/Spinner';
import classes from './Welcome.module.css';

const Welcome = ({ setAvatar, history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);

  const onClickUpload = () => {
    fileRef.current.click();
  };

  const onFileUploaded = async (e) => {
    const file = e.target.files[0];
    const image = await toBase64(file);
    setAvatar(image);
    history.push('/complete/reason');
  };

  return (
    <div className={classes.Welcome}>
      <h1>Welcome</h1>
      <p>Add a photo so other members know who you are.</p>
      <i className='far fa-user'></i>

      <button onClick={onClickUpload} className={classes.Upload}>
        Upload a photo
      </button>
      <input onChange={onFileUploaded} ref={fileRef} type='file' />

      <div className={classes.Or}>
        <span className={classes.Line}></span>{' '}
        <span className={classes.Inner}>OR</span>
        <span className={classes.Line}></span>
      </div>

      {isLoading ? <Spinner /> : null}

      <div className={[classes.SignUpOption]}>
        <i className='fab fa-facebook'></i>
        <p>Continue with Google</p>
      </div>

      <Link to='/complete/reason' className={classes.Skip}>
        Skip for now
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAvatar: (image) =>
      dispatch({ type: 'registration/updateAvatar', payload: image }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Welcome));
