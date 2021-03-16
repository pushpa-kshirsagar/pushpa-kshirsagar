import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './UserPool';

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  let result = {};
                  for (let attr of attributes) {
                    const { Name, Value } = attr;
                    result[Name] = Value;
                  }
                  resolve(result);
                }
              });
            });
            resolve({ user, ...session, ...attributes });
          }
        });
      } else {
        reject();
      }
    });
  };
  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('OnSuccess===>', data);
          resolve(data);
        },
        onFailure: (err) => {
          console.log('onFailure===>', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired===>', data);
          resolve(data);
        }
      });
    });
  };

  const signOut = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, signOut }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
