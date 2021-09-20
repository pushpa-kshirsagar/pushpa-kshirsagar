import {
  ASSIGNMENT_POPUP_OPEN,
  CLEAR_ASSIGNMENT_INFO,
  SET_ASSIGNMENT_BASIC_REDUCER_STATE,
  SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
  SET_ASSIGNMENT_NEXT_POPUP,
  SET_ASSIGNMENT_PREVIOUS_POPUP,
  SET_ASSIGNMENT_SECONDARY_OPTION_VALUE,
  SET_ASSIGNMENT_SECONDARY_POPUP
} from '../actionType';
import {
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP
} from '../PopUpConfig';

const initialState = {
  assignmentsHeaderOne: '',
  assignmentsPopUpType: 'primary',
  currentPopUpOption: '',
  assignmentsPopUpActive: false,
  isBackToSectionPopUp: false,
  assignmentsHeaderOneBadgeOne: '',
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  secondaryPopUpOptions: {
    create: REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP
  },
  secondaryOptionCheckValue: '',
  informationBasic: {
    assignmentName: '',
    assignmentNameVerification: false,
    assignmentDescription: '',
    assignmentPicture: '',
    assignmentPictureVerification: false,
    assignmentFlag: false
  },
  informationAlliance: {
    assignmentCollaborator: {
      assignmentCollaboratorPrimary: [],
      assignmentCollaboratorSecondary: []
    }
  },
  informationAllocation: {
    assignmentGroup: {
      assignmentGroupPrimary: [],
      assignmentGroupSecondary: []
    },
    assignmentManager: {
      assignmentManagerPrimary: [],
      assignmentManagerSecondary: []
    },
    assignmentNode: {
      assignmentNodePrimary: [],
      assignmentNodeSecondary: []
    },
    assignmentType: {
      assignmentTypePrimary: [],
      assignmentTypeSecondary: []
    }
  }
};

const AssignmentReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case ASSIGNMENT_POPUP_OPEN:
      return {
        ...istate,
        assignmentsHeaderOne: 'assignments',
        assignmentsPopUpType: 'primary',
        currentPopUpOption: istate.primaryPopUpOptions,
        assignmentsPopUpActive: true
      };
    case SET_ASSIGNMENT_NEXT_POPUP:
      if (istate.assignmentsPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            assignmentsPopUpActive: true,
            assignmentsHeaderOne: action.payload,
            assignmentsHeaderOneBadgeOne: 'review',
            assignmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            assignmentsPopUpActive: true,
            assignmentsHeaderOne: 'assignments',
            assignmentsHeaderOneBadgeOne: action.payload,
            assignmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: action.payload === 'create' ? 'all' : 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSIGNMENT_SECONDARY_POPUP:
      if (istate.assignmentsPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            assignmentsPopUpActive: true,
            isBackToSectionPopUp: true,
            assignmentsHeaderOne: action.payload,
            assignmentsHeaderOneBadgeOne: 'review',
            assignmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            assignmentsPopUpActive: true,
            isBackToSectionPopUp: true,
            assignmentsHeaderOne: 'assignments',
            assignmentsHeaderOneBadgeOne: action.payload,
            assignmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSIGNMENT_PREVIOUS_POPUP:
      if (istate.assignmentsPopUpType === 'primary') {
        return {
          ...istate,
          currentPopUpOption: [],
          assignmentsPopUpActive: false
        };
      } else if (istate.assignmentsPopUpType === 'secondary') {
        return {
          ...istate,
          currentPopUpOption: istate.primaryPopUpOptions,
          assignmentsHeaderOne: 'assignments',
          assignmentsHeaderOneBadgeOne: '',
          assignmentsPopUpType: 'primary',
          secondaryOptionCheckValue: 'active'
        };
      } else {
        return istate;
      }
    case SET_ASSIGNMENT_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };
    case SET_ASSIGNMENT_BASIC_REDUCER_STATE:
      return {
        ...istate,
        informationBasic: action.payload
      };
    case SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE:
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
    case CLEAR_ASSIGNMENT_INFO:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default AssignmentReducer;
