import {
  ASSESSMENT_POPUP_OPEN,
  CLEAR_ASSESSMENT_INFO,
  SET_ASSESSMENT_NEXT_POPUP,
  SET_ASSESSMENT_PREVIOUS_POPUP,
  SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
  SET_DISPLAY_PANE_FOUR_SHOW,
  SET_ASSESSMENT_SECONDARY_POPUP,
  SET_ASSESSMENT_BASIC_REDUCER_STATE,
  SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
  SET_ASSESSMENT_FRAMEWORK_STATE,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
  SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE,
  SET_ASSESSMENT_SCORE_FRAMEWORK_STATE,
  SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE
} from '../actionType';
import {
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP
} from '../PopUpConfig';

const initialState = {
  isDisplayPaneSixShow: true,
  assessmentsHeaderOne: '',
  assessmentsPopUpType: 'primary',
  currentPopUpOption: '',
  assessmentsPopUpActive: false,
  isBackToSectionPopUp: false,
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  secondaryPopUpOptions: {
    create: REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP
  },
  secondaryOptionCheckValue: '',
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
  },
  informationFramework: {
    assessmentCommunique: {
      assessmentCommuniquePrimary: null,
      assessmentCommuniqueSecondary: null
    },
    assessmentItem: [],
    assessmentManuscript: {
      assessmentManuscriptPrimary: null,
      assessmentManuscriptSecondary: null
    },
    assessmentItemTotal: null,
    assessmentScore: {
      assessmentScoreMaximum: 0,
      assessmentScoreMinimum: 0
    },
    assessmentTime: 0
  }
};

const AssessmentReducer = (istate = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ASSESSMENT_POPUP_OPEN:
      return {
        ...istate,
        assessmentsHeaderOne: 'assessments',
        assessmentsPopUpType: 'primary',
        currentPopUpOption: istate.primaryPopUpOptions,
        assessmentsPopUpActive: true
      };
    case SET_ASSESSMENT_NEXT_POPUP:
      if (istate.assessmentsPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: action.payload,
            assessmentsHeaderOneBadgeOne: 'review',
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: 'assessments',
            assessmentsHeaderOneBadgeOne: action.payload,
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: action.payload === 'create' ? 'all' : 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSMENT_SECONDARY_POPUP:
      if (istate.assessmentsPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: action.payload,
            assessmentsHeaderOneBadgeOne: 'review',
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread',
            isBackToSectionPopUp: true
          };
        } else {
          return {
            ...istate,
            assessmentsPopUpActive: true,
            assessmentsHeaderOne: 'assessments',
            assessmentsHeaderOneBadgeOne: action.payload,
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'active',
            isBackToSectionPopUp: true
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSMENT_BASIC_REDUCER_STATE:
      return {
        ...istate,
        informationBasic: action.payload
      };
    case SET_ASSESSMENT_PREVIOUS_POPUP:
      if (istate.assessmentsPopUpType === 'primary') {
        return {
          ...istate,
          currentPopUpOption: [],
          assessmentsPopUpActive: false
        };
      } else if (istate.assessmentsPopUpType === 'secondary') {
        return {
          ...istate,
          currentPopUpOption: istate.primaryPopUpOptions,
          assessmentsHeaderOne: 'assessments',
          assessmentsHeaderOneBadgeOne: '',
          assessmentsPopUpType: 'primary',
          secondaryOptionCheckValue: 'active'
        };
      } else {
        return istate;
      }
    case SET_ASSESSMENT_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };
    case SET_DISPLAY_PANE_FOUR_SHOW:
      return {
        isDisplayPaneSixShow: action.payload
      };
    case SET_ASSESSMENT_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        informationAllocation: {
          ...istate.informationAllocation,
          [action.payload.stateName]: {
            ...istate.informationAllocation[action.payload.stateName],
            [action.payload.actualStateName]: action.payload.value
          }
        }
      };
    case SET_ASSESSMENT_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: action.payload
      };
    case SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          [action.payload.stateName]: action.payload.value
        }
      };
    case SET_ASSESSMENT_COMMUNIQUE_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentCommunique: action.payload
        }
      };
    case SET_ASSESSMENT_MANUSCRIPT_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentManuscript: action.payload
        }
      };
    case SET_ASSESSMENT_SCORE_FRAMEWORK_STATE:
      return {
        ...istate,
        informationFramework: {
          ...istate.informationFramework,
          assessmentScore: action.payload
        }
      };
    case CLEAR_ASSESSMENT_INFO:
      return initialState;
    default:
      return istate;
  }
};

export default AssessmentReducer;
