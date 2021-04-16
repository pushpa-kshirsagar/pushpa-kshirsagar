import { combineReducers } from 'redux';
import PopUpReducer from './PopUpReducer';
import UserReducer from './UserReducer';
import AssesseeCreateReducer from './AssesseeCreateReducer';
import AssociateCreateReducer from './AssociateCreateReducer';
import FilterReducer from './FilterReducer';
import AssessmentReducer from './AssessmentReducer';
import DisplayPaneTwoReducer from './DisplayPaneTwoReducer';
import AssignmentReducer from './AssignmentReducer';
import IgaugeReducer from './IgaugeReducer';
import LoaderReducer from './LoaderReducer';
import DisplayPaneThreeReducer from './DisplayPaneThreeReducer';
import RoleCreateReducer from './RoleCreateReducer';
import GroupCreateReducer from './GroupCreateReducer';
import TypeCreateReducer from './TypeCreateReducer';
import SignOnReducer from './SignOnReducer';

export default combineReducers({
  PopUpReducer,
  UserReducer,
  AssesseeCreateReducer,
  AssociateCreateReducer,
  FilterReducer,
  AssessmentReducer,
  DisplayPaneTwoReducer,
  AssignmentReducer,
  IgaugeReducer,
  LoaderReducer,
  DisplayPaneThreeReducer,
  RoleCreateReducer,
  GroupCreateReducer,
  TypeCreateReducer,
  SignOnReducer
});
