import { combineReducers } from 'redux';
import PopUpReducer from './PopUpReducer';
import UserReducer from './UserReducer';
import AssesseeCreateReducer from './AssesseeCreateReducer';
import AssociateCreateReducer from './AssociateCreateReducer';
import FilterReducer from './FilterReducer';
import assessmentReducer from './assessmentReducer';
import DisplayPaneTwoReducer from './DisplayPaneTwoReducer';
import AssignmentReducer from './AssignmentReducer';
import IgaugeReducer from './IgaugeReducer';
import LoaderReducer from './LoaderReducer';
import DisplayPaneThreeReducer from './DisplayPaneThreeReducer';
import RoleCreateReducer from './RoleCreateReducer';
import GroupCreateReducer from './GroupCreateReducer';
import TypeCreateReducer from './TypeCreateReducer';

export default combineReducers({
  PopUpReducer,
  UserReducer,
  AssesseeCreateReducer,
  AssociateCreateReducer,
  FilterReducer,
  assessmentReducer,
  DisplayPaneTwoReducer,
  AssignmentReducer,
  IgaugeReducer,
  LoaderReducer,
  DisplayPaneThreeReducer,
  RoleCreateReducer,
  GroupCreateReducer,
  TypeCreateReducer
});
