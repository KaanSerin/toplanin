import IndexNoLogin from './components/index-nologin';
import { Route, Switch, Redirect } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <IndexNoLogin></IndexNoLogin>
        </Route>
        <Route exact path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
