import {
  SET_ASSESSEE_PERMISSION,
  SET_USER,
  SET_SIGN_IN_STATUS,
  SET_USER_STATE,
  SET_BRAND_LOGO_TYPE
} from '../actionType';

const initialState = {
  userData: null,
  assesseeSignInStatus: '',
  assesseeConfirmStatus: '',
  assesseePermission: '',
  loginUserName: '',
  brandLogoType: 'iGuru'
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
    case SET_USER_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value || ''
      };
    case SET_ASSESSEE_PERMISSION:
      return {
        ...istate,
        assesseePermission: action.payload
      };
    case SET_BRAND_LOGO_TYPE:
      return {
        ...istate,
        brandLogoType: action.payload
      };
    default:
      return istate;
  }
};

export default UserReducer;
