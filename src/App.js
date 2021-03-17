import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DisplayPageOne from './Pages/DisplayPageOne/DisplayPageOne';
import DisplayPageSignOn from './Pages/DisplayPageSignOn/DisplayPageSignOn';
import DisplayPageSignIn from './Pages/DisplayPageSignIn/DisplayPageSignIn';
import userPool from './UserPool';
import { AccountContext } from './Account';
import DisplayPageConfirmUser from './Pages/DisplayPageConfirmUser/DisplayPageConfirmUser';

// Aimplify.configure({
//   Auth: {
//     mandatorySignIn: true,
//     region: config.cognito.REGION,
//     userPoolId: config.cognito.USER_POOL_ID,
//     userPoolWebClientId: config.cognito.APP_CLIENT_ID
//   }
// });

function App() {
  const { getSession } = useContext(AccountContext);
  useEffect(() => {
    console.log(userPool);
    getSession()
      .then((session) => {
        console.log('USER THEN SESSION=====>', session);
      })
      .catch((err) => {
        console.log('USER THEN SESSION=====>', err);
      });
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
          <Route path="/confirm/:id" component={DisplayPageConfirmUser} exact={true} />
          <Route path="/dashboard" component={DisplayPageOne} exact={true} />
          <Route path="/signOn" component={DisplayPageSignOn} exact={true} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
