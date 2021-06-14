import {
  SET_JOB_REDUCER_STATE,
  CLEAR_JOB_REDUCER_STATE,
  SET_JOB_DYNAMIC_SINGLE_STATE
} from '../actionType';

const initialState = {
  jobProfileInformation: {
    informationBasic: {
      jobProfileName: '',
      jobProfileNameVerification: false,
      jobProfileDescription: '',
      jobProfilePicture: '',
      jobProfilePictureVerification: false
    },
    informationAllocation: {
      jobProfileGroup: {
        jobProfileGroupPrimary: [],
        jobProfileGroupSecondary: []
      },
      jobProfileManager: {
        jobProfileManagerPrimary: [],
        jobProfileManagerSecondary: []
      },
      jobProfileNode: {
        jobProfileNodePrimary: [],
        jobProfileNodeSecondary: []
      },
      jobProfileType: {
        jobProfileTypePrimary: [],
        jobProfileTypeSecondary: []
      }
    }
  }
};

const JobProfileCreateReducer = (istate = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_JOB_REDUCER_STATE:
      return {
        ...istate,
        jobProfileInformation: {
          ...istate.jobProfileInformation,
          informationBasic: action.payload
        }
      };
    case SET_JOB_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        jobProfileInformation: {
          ...istate.jobProfileInformation,
          [action.payload.objectName]: {
            ...istate.jobProfileInformation[action.payload.objectName],
            [action.payload.stateName]: {
              ...istate.jobProfileInformation[action.payload.objectName][action.payload.stateName],
              [action.payload.actualStateName]: action.payload.value
            }
          }
        }
      };
    case CLEAR_JOB_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default JobProfileCreateReducer;
