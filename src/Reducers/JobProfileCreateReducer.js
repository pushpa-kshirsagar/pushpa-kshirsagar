import {
  SET_JOB_REDUCER_STATE,
  CLEAR_JOB_REDUCER_STATE,
  SET_JOB_DYNAMIC_SINGLE_STATE,
  SET_JOB_DYNAMIC_ARRAY_STATE,
  SET_JOB_SIFTLIST_STATE,
  SET_WEIGHTAGE_JOB_PROFILE
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
    },
    informationFramework: {
      jobProfileJobDomain: [],
      jobProfileJobFunction: [],
      jobProfileJobRole: [],
      jobProfileJobCompetencyCore: [],
      jobProfileJobCompetencyCoreTags: [],
      jobProfileJobCompetencyCoreObj: [],
      jobProfileJobCompetencyShortlisted: [],
      jobProfileJobCompetencySiftList: [],
      jobProfileJobCompetencySifted: [
        {
          jobProfileJobCompetencySift: 'indispensable',
          jobProfileJobCompetencyTag: []
        },
        {
          jobProfileJobCompetencySift: 'desirable',
          jobProfileJobCompetencyTag: []
        },
        {
          jobProfileJobCompetencySift: 'probable',
          jobProfileJobCompetencyTag: []
        },
        {
          jobProfileJobCompetencySift: 'removable',
          jobProfileJobCompetencyTag: []
        }
      ]
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
    case SET_JOB_DYNAMIC_ARRAY_STATE:
      console.log('action.payload', action);
      return {
        ...istate,
        [action.payload.objectName]: {
          ...istate[action.payload.objectName],
          [action.payload.stateName]: action.payload.value
        }
      };
    case SET_JOB_SIFTLIST_STATE:
      return {
        ...istate,
        jobProfileInformation: {
          ...istate.jobProfileInformation,
          informationFramework: action.payload
        }
      };
    case SET_WEIGHTAGE_JOB_PROFILE:
      let tempArr =
        istate?.jobProfileInformation?.informationFramework?.jobProfileJobCompetencyCoreObj || [];
      tempArr.forEach((element) => {
        if (element.jobProfileJobCompetencyTag === action.payload.jobProfileJobCompetencyTag) {
          element.jobProfileJobCompetencyWeightage =
            action.payload.jobProfileJobCompetencyWeightage;
        }
      });
      return {
        ...istate,
        jobProfileInformation: {
          ...istate.jobProfileInformation,
          informationFramework: {
            ...istate.jobProfileInformation.informationFramework,
            jobProfileJobCompetencyCoreObj: tempArr
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
