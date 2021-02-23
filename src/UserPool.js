import config from './config.json';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: config.cognito.USER_POOL_ID, // Your user pool id here
  ClientId: config.cognito.APP_CLIENT_ID // Your client id here
};

export default new CognitoUserPool(poolData);
