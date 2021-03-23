import { combineReducers } from 'redux';
import PopUpReducer from './PopUpReducer';
import UserReducer from './UserReducer';
import AssesseeCreateReducer from './AssesseeCreateReducer';
import AssociateCreateReducer from './AssociateCreateReducer';
import FilterReducer from './FilterReducer';
import assessmentReducer from './assessmentReducer';
import DisplayPaneReducer from './DisplayPaneReducer';
import AssignmentReducer from './AssignmentReducer';
import IgaugeReducer from './IgaugeReducer';
import LoaderReducer from './LoaderReducer';
import DisplayPaneThreeReducer from './DisplayPaneThreeReducer';

export default combineReducers({
  PopUpReducer,
  UserReducer,
  AssesseeCreateReducer,
  AssociateCreateReducer,
  FilterReducer,
  assessmentReducer,
  DisplayPaneReducer,
  AssignmentReducer,
  IgaugeReducer,
  LoaderReducer,
  DisplayPaneThreeReducer
});
