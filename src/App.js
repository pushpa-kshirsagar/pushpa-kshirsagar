import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DisplayPageOne from './Pages/DisplayPageOne/DisplayPageOne';
import DisplayPageSignOn from './Pages/DisplayPageSignOn/DisplayPageSignOn';
import DisplayPageSignIn from './Pages/DisplayPageSignIn/DisplayPageSignIn';
import decode from 'jwt-decode';
import userPool from './UserPool';
import { AccountContext } from './Account';
import DisplayPageConfirmUser from './Pages/DisplayPageConfirmUser/DisplayPageConfirmUser';

function App() {
  // const { getSession } = useContext(AccountContext);
  // useEffect(() => {
  //   console.log(userPool);
  //   getSession()
  //     .then((session) => {
  //       console.log('USER THEN SESSION=====>', session);
  //     })
  //     .catch((err) => {
  //       console.log('USER THEN SESSION=====>', err);
  //     });
  //   //for SIGNUP
  //   // userPool.signUp('shivam.s@boppotechnologies.com', 'BoppoTech@123', [], null, (error, data) => {
  //   //   console.log('DATA===>', data);
  //   //   console.log('ERROR===>', error);
  //   // });
  // }, []);
  document.addEventListener(
    'deviceready',
    function () {
      document.addEventListener('backbutton', null, false);
    },
    false
  );
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }
    // try {
    //   const { exp } = decode(refreshToken);
    //   console.log("EXP Time", exp);
    //   console.log("new Date().getTime() / 1000", new Date().getTime() / 1000);
    //   alert(exp);
    //   if (exp < new Date().getTime() / 1000) {
    //     return false;
    //   }
    //   alert("after===>");
    // } catch (e) {
    //   alert("IN CATCH ");
    //   return false;
    // }

    return true;
  };

  const AuthRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: '/signIn' }} />
        }
      />
    );
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signIn" />} />
          <Route path="/signIn" component={DisplayPageSignIn} exact={true} />
          <Route path="/confirm/:id" component={DisplayPageConfirmUser} exact={true} />
          <AuthRoute path="/dashboard" component={DisplayPageOne} exact={true} />
          <Route path="/signOn" component={DisplayPageSignOn} exact={true} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
