import { SET_ASSESSEE_PERMISSION, SET_USER, SET_SIGN_IN_STATUS } from '../actionType';

const initialState = {
  userData: null,
  assesseeSignInStatus: '',
  assesseePermission: ''
};

const UserReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...istate,
        userData: action.payload
      };
    case SET_SIGN_IN_STATUS:
      return {
        ...istate,
        assesseeSignInStatus: action.payload || ''
      };
    case SET_ASSESSEE_PERMISSION:
      return {
        ...istate,
        assesseePermission: action.payload
      };
    default:
      return istate;
  }
};

export default UserReducer;
