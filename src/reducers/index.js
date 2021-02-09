import { combineReducers } from 'redux';
import PopUpReducer from './PopUpReducer';
import userReducer from './userReducer';
import AssesseeCreateReducer from './AssesseeCreateReducer';
import AssociateCreateReducer from './AssociateCreateReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
  PopUpReducer,
  userReducer,
  AssesseeCreateReducer,
  AssociateCreateReducer,
  FilterReducer
});
