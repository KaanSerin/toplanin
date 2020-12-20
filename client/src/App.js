import IndexNoLogin from './components/Index-NoLogin/Index';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/Register/Register';
import AlmostDone from './components/AlmostDone/AlmostDone';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <IndexNoLogin></IndexNoLogin>
        </Route>
        <Route exact path='/register'>
          <Register></Register>
        </Route>
        <Route path='/almost-done' component={AlmostDone}></Route>
        <Route path='/welcome' component={Welcome}></Route>
        <Route exact path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
