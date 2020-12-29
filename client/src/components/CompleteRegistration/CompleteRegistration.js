import React, { Fragment, useState } from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import classes from './CompleteRegistration.module.css';
import Groups from './Groups/Groups';
import Interests from './Interests/Interests';
import Topics from './Interests/Topics/Topics';
import Reason from './Reason/Reason';

import Welcome from './Welcome/Welcome';

const CompleteRegistration = () => {
  let match = useRouteMatch();

  const [avatar, setAvatar] = useState(null);
  const [reason, setReason] = useState(null);
  const [interests, setInterests] = useState(null);
  const [topics, setTopics] = useState(null);
  const [groups, setGroups] = useState(null);

  // Will process the avatar inside the function
  const onAvatarUpload = (avatar) => {
    // avatar is a base64 file
    setAvatar(avatar);
  };

  return (
    <Fragment>
      <nav className={classes.Nav}>
        <Link to='/'>
          <img src='../register/logo2.svg' alt='Meetup logo' />
        </Link>
      </nav>
      <div className={classes.Main}>
        <Switch>
          <Route
            path={`${match.path}/reason`}
            render={(props) => <Reason {...props} setReason={setReason} />}
          />
          <Route
            path={`${match.path}/interests`}
            render={(props) => (
              <Interests {...props} setInterests={setInterests} />
            )}
          />
          <Route
            path={`${match.path}/topics`}
            render={(props) => (
              <Topics
                {...props}
                interests={interests}
                onSetTopics={setTopics}
              />
            )}
          />
          <Route
            path={`${match.path}/groups`}
            render={(props) => <Groups setGroups={setGroups} />}
          />
          <Route
            path={`${match.path}/`}
            render={(props) => (
              <Welcome {...props} setAvatar={onAvatarUpload} />
            )}
          />
        </Switch>
      </div>
    </Fragment>
  );
};

export default CompleteRegistration;
