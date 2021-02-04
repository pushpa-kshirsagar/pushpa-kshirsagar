import { combineReducers } from 'redux';
import popUpReducer from './popUpReducer';
import userReducer from './userReducer';
import CreateAssesseeReducer from './CreateAssesseeReducer';
import CreateAssociateReducer from './CreateAssociateReducer';

export default combineReducers({
  popUpReducer,
  userReducer,
  CreateAssesseeReducer,
  CreateAssociateReducer
});
