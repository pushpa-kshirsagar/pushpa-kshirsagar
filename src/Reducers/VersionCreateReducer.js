import { SET_VERSION_REDUCER_STATE, CLEAR_VERSION_REDUCER_STATE } from '../actionType';
const initialState = {
  versionInformation: {
    assessmentVersionName: '',
    assessmentVersionVerification: false,
    assessmentVersionDescription: '',
    assessmentVersionItemDistinct: []
  }
};

const VersionReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case SET_VERSION_REDUCER_STATE:
      return {
        ...istate,
        versionInformation: action.payload
      };
    case CLEAR_VERSION_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default VersionReducer;
