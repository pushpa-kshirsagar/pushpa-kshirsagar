import { combineReducers } from 'redux';
import popUpReducer from './popUpReducer';
import userReducer from './userReducer';

export default combineReducers({
  popUpReducer,
  userReducer
});
