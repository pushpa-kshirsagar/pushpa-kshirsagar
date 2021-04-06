import { CLEAR_GROUP_REDUCER_STATE, SET_GROUP_REDUCER_STATE } from '../actionType';

const initialState = {
  groupInformation: {
    informationBasic: {
      groupName: '',
      groupNameVerification: false,
      groupDescription: '',
      groupPicture: '',
      groupPictureVerification: false
    }
  }
};

const GroupCreateReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_GROUP_REDUCER_STATE:
      return {
        ...istate,
        groupInformation: {
          ...istate.groupInformation,
          informationBasic: action.payload
        }
      };
    case CLEAR_GROUP_REDUCER_STATE:
      return istate;
    default:
      return istate;
  }
};

export default GroupCreateReducer;
