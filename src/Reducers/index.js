import { combineReducers } from 'redux';
import PopUpReducer from './PopUpReducer';
import UserReducer from './UserReducer';
import AssesseeCreateReducer from './AssesseeCreateReducer';
import AssociateCreateReducer from './AssociateCreateReducer';
import FilterReducer from './FilterReducer';
import assessmentReducer from './assessmentReducer';
import DisplayPaneReducer from './DisplayPaneReducer';

export default combineReducers({
  PopUpReducer,
  UserReducer,
  AssesseeCreateReducer,
  AssociateCreateReducer,
  FilterReducer,
  assessmentReducer,
  DisplayPaneReducer
});
