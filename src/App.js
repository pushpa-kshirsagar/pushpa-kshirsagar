import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DisplayPageOne from './Pages/DisplayPageOne/DisplayPageOne';
import DisplayPageSignOn from './Pages/DisplayPageSignOn/DisplayPageSignOn';
import DisplayPageSignIn from './Pages/DisplayPageSignIn/DisplayPageSignIn';
import userPool from './UserPool';

// Aimplify.configure({
//   Auth: {
//     mandatorySignIn: true,
//     region: config.cognito.REGION,
//     userPoolId: config.cognito.USER_POOL_ID,
//     userPoolWebClientId: config.cognito.APP_CLIENT_ID
//   }
// });

function App() {
  useEffect(() => {
    console.log(userPool);
    //for SIGNUP
    // userPool.signUp('shivam.s@boppotechnologies.com', 'BoppoTech@123', [], null, (error, data) => {
    //   console.log('DATA===>', data);
    //   console.log('ERROR===>', error);
    // });
  }, []);

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
