import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import SignInPage from './Pages/SignInPage/SignInPage';
import store from './store';

function App() {
  return (
    // <Provider store={store}>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signIn" />} />
          <Route path="/signIn" component={SignInPage} exact={true} />
          <Route path="/dashboard" component={DashboardPage} exact={true} />
        </Switch>
      </div>
    </Router>
    // </Provider>
  );
}

export default App;
