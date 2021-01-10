import React, { Fragment, useState } from 'react';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import classes from './CompleteRegistration.module.css';
import Events from './Events/Events';
import Groups from './Groups/Groups';
import Interests from './Interests/Interests';
import Topics from './Interests/Topics/Topics';
import Reason from './Reason/Reason';

import Welcome from './Welcome/Welcome';

const CompleteRegistration = () => {
  let match = useRouteMatch();

  const [interests, setInterests] = useState(null);
  const [topics, setTopics] = useState(null);
  const [groups, setGroups] = useState(null);

  return (
    <Fragment>
      <nav className={classes.Nav}>
        <Link to='/'>
          <img src='../register/logo2.svg' alt='Meetup logo' />
        </Link>
      </nav>
      <div className={classes.Main}>
        <Switch>
          <Route path={`${match.path}/reason`} component={Reason} />
          <Route path={`${match.path}/interests`} component={Interests} />
          <Route path={`${match.path}/topics`} component={Topics} />
          <Route path={`${match.path}/groups`} component={Groups} />
          <Route path={`${match.path}/events`} render={(props) => <Events />} />
          <Route path={`${match.path}/`} component={Welcome} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default CompleteRegistration;
