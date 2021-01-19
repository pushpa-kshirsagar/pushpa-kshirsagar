import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import LogInPage from './Pages/LogInPage/LogInPage';
// import Card from './Molecules/Card/Card';
// import PersonIcon from '@material-ui/icons/Person';
// import Accordian from './Molecules/KeyCard/KeyCard';
// import { Keyboard } from '@material-ui/icons';
// import Verified from './images/verified.svg';
// import TelephoneVerified from './images/telephone_verified.svg';
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="/signIn" component={LogInPage} exact={true} />
          <Route path="/dashboard" component={DashboardPage} exact={true} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
