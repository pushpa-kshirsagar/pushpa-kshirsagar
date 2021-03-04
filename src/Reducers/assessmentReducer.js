import {
  ASSESSMENT_POPUP_OPEN,
  CLEAR_ASSESSMENT_INFO,
  SET_ASSESSMENT_NEXT_POPUP,
  SET_ASSESSMENT_PREVIOUS_POPUP,
  SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
  SET_DISPLAY_PANE_FOUR_SHOW
} from '../actionType';
import {
  ASSESSEE_REVIEW_REVISE_POPUP,
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS
} from '../PopUpConfig';

const initialState = {
  isDisplayPaneFourShow: true,
  assessmentsHeaderOne: '',
  assessmentsPopUpType: '',
  currentPopUpOption: '',
  assessmentsPopUpActive: false,
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  secondaryPopUpOptions: {
    create: ASSESSEE_REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP
  },
  secondaryOptionCheckValue: ''
};

const assessmentReducer = (istate = initialState, action) => {
  console.log(action.type);
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
            assessmentsHeaderOne: action.payload,
            assessmentsHeaderOneBadgeOne: 'review',
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            assessmentsHeaderOne: 'assessments',
            assessmentsHeaderOneBadgeOne: action.payload,
            assessmentsPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSMENT_PREVIOUS_POPUP:
      if (istate.assessmentsPopUpType === 'primary') {
        return {
          ...istate,
          currentPopUpOption: [],
          assessmentsPopUpActive: false,
          assessmentsPopUpType: ''
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
        isDisplayPaneFourShow: action.payload
      };
    case CLEAR_ASSESSMENT_INFO:
      return initialState;
    default:
      return istate;
  }
};

export default assessmentReducer;
