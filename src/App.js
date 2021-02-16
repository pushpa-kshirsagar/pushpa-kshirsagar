import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DisplayPageOne from './Pages/DisplayPageOne/DisplayPageOne';
import DisplayPageSignOn from './Pages/DisplayPageSignOn/DisplayPageSignOn';
import DisplayPageSignIn from './Pages/DisplayPageSignIn/DisplayPageSignIn';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signIn" />} />
          <Route path="/signIn" component={DisplayPageSignIn} exact={true} />
          <Route path="/dashboard" component={DisplayPageOne} exact={true} />
          <Route path="/signOn" component={DisplayPageSignOn} exact={true} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
