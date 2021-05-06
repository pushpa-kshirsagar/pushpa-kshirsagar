import {
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  CLEAR_ROLE_REDUCER_STATE,
  SET_ROLE_DYNAMIC_STATE
} from '../actionType';

const initialState = {
  assesseeRole: {
    informationBasic: {
      assesseeRoleName: '',
      assesseeRoleNameVerification: false,
      assesseeRoleDescription: '',
      assesseeRolePicture: '',
      assesseeRolePictureVerification: false
    },
    informationAllocation: {
      assesseeRoleGroup: []
    }
  },
  associateRole: {
    informationBasic: {
      associateRoleName: '',
      associateRoleNameVerification: false,
      associateRoleDescription: '',
      associateRolePicture: '',
      associateRolePictureVerification: false
    },
    informationAllocation: {
      associateRoleGroup: []
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
    case SET_ROLE_DYNAMIC_STATE:
      return {
        ...istate,
        assesseeRole: {
          ...istate[action.payload.objectName],
          [action.payload.stateName]: {
            ...istate[action.payload.objectName][action.payload.stateName],
            [action.payload.actualStateName]: action.payload.value
          }
        }
      };
    case CLEAR_ROLE_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default RoleCreateReducer;
