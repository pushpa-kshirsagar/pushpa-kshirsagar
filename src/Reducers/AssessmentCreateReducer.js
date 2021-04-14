import { SET_ASSESSMENT_BASIC_REDUCER_STATE, CLEAR_ASSESSMENT_REDUCER_STATE } from '../actionType';

const initialState = {
  informationBasic: {
    assessmentName: '',
    assessmentNameVerification: false,
    assessmentDescription: '',
    assessmentPicture: '',
    assessmentPictureVerification: false,
    assessmentFlag: false
  },
  informationAlliance: {
    assessmentAuthor: {
      assessmentAuthorPrimary: [],
      assessmentAuthorSecondary: []
    }
  },
  informationAllocation: {
    assessmentGroup: {
      assessmentGroupPrimary: [],
      assessmentGroupSecondary: []
    },
    assessmentManager: {
      assessmentManagerPrimary: [],
      assessmentManagerSecondary: []
    },
    assessmentNode: {
      assessmentNodePrimary: [],
      assessmentNodeSecondary: []
    },
    assessmentType: {
      assessmentTypePrimary: [],
      assessmentTypeSecondary: []
    }
  }
};

const AssessmentCreateReducer = (istate = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_ASSESSMENT_BASIC_REDUCER_STATE:
      return {
        ...istate,
        informationBasic: action.payload
      };
    // case SET_ASSESSMENT_REDUCER_STATE:
    //   return {
    //     ...istate,
    //     [action.payload.information]: {
    //       ...istate[action.payload.information],
    //       [action.payload.stateName]: action.payload.data
    //     }
    //   };
    case CLEAR_ASSESSMENT_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default AssessmentCreateReducer;
