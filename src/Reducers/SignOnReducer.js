import { SET_SIGN_ON_SINGLE_STATE, CLEAR_SIGN_ON_SINGLE_STATE } from '../actionType';

const initialState = {
  associateAssent: false,
  assesseeAssent: false,
  signInCredential: '',
  currentPassword: '',
  revisedPassword: ''
};

const SignOnReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_SIGN_ON_SINGLE_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
    case CLEAR_SIGN_ON_SINGLE_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default SignOnReducer;
