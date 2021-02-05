import { combineReducers } from 'redux';
import PopUpReducer from './PopUpReducer';
import userReducer from './userReducer';
import AssesseeCreateReducer from './AssesseeCreateReducer';
import AssociateCreateReducer from './AssociateCreateReducer';

export default combineReducers({
  PopUpReducer,
  userReducer,
  AssesseeCreateReducer,
  AssociateCreateReducer
});
