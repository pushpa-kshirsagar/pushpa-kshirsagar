import {
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  CLEAR_ROLE_REDUCER_STATE
} from '../actionType';

const initialState = {
  assesseeRole: {
    informationBasic: {
      assesseeRoleName: '',
      assesseeRoleNameVerification: false,
      assesseeRoleDescription: '',
      assesseeRolePicture: '',
      assesseeRolePictureVerification: false
    }
  },
  associateRole: {
    informationBasic: {
      associateRoleName: '',
      associateRoleNameVerification: false,
      associateRoleDescription: '',
      associateRolePicture: '',
      associateRolePictureVerification: false
    }
  }
};

const RoleCreateReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_ASSESSEE_ROLE_REDUCER_STATE:
      return {
        ...istate,
        assesseeRole: {
          ...istate.assesseeRole,
          informationBasic: action.payload
        }
      };
    case SET_ASSOCIATE_ROLE_REDUCER_STATE:
      return {
        ...istate,
        associateRole: {
          ...istate.associateRole,
          informationBasic: action.payload
        }
      };
    case CLEAR_ROLE_REDUCER_STATE:
      return istate;
    default:
      return istate;
  }
};

export default RoleCreateReducer;
