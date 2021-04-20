import {
  POPUP_CLOSE,
  POPUP_OPEN,
  ASSESSEE_SIGN_ON,
  ASSOCIATE_SIGN_ON,
  SET_NEXT_POPUP,
  PREVIOUS_POPUP,
  SET_POPUP_STATE,
  SET_GRID_COLUMN_COUNT_VALUE,
  SET_SECONDARY_OPTION_VALUE,
  SET_SECONDARY_CREATE_OPTION_VALUE,
  SET_POPUP_VALUE,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  CLEAR_POPUP_INFO,
  SET_POPUP_SINGLE_STATE
} from '../actionType';
import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import CalculatorIcon from '@material-ui/icons/Keyboard';
import {
  ALLOCATE_POPUP,
  ARCHIVE_POPUP,
  ASSIGNMENT_DISTINCT_POPUP,
  DELETE_POPUP,
  FLAG_PUPUP,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP,
  SELECT_PUPUP,
  SUSPEND_PUPUP,
  TERMINATE_PUPUP,
  SELECT_OPTION_PUPUP,
  ASSESSEE_REVIEW_REVISE_POPUP,
  GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
  REVIEW_DISTINCT_POPUP_OPTION,
  CREATE_INFORMATION_POPUP,
  PUBLISH_PUPUP
} from '../PopUpConfig';

const initialState = {
  isPopUpOpen: false,
  isPopUpValue: '',
  prevPopUpValue: '',
  popupMode: '',
  popupHeaderOne: '',
  primaryArrOprion: [],
  duplicateBadgeOne: '',
  duplicateHeaderOne: '',
  popupHeaderOneBadgeOne: '',
  popupHeaderOneBadgeTwo: '',
  popupContentArrValue: [
    { lable: 'basic', dataValue: 'basic', Icon: CalculatorIcon },
    { lable: 'buisness', dataValue: 'buisness', Icon: CalculatorIcon },
    { lable: 'financial', dataValue: 'financial', Icon: CalculatorAdvancedIcon },
    { lable: 'scientific', dataValue: 'scientific', Icon: CalculatorAdvancedIcon }
  ],
  popupOpenType: '',
  gridColumnCountValue: 0,
  secondaryOptionCheckValue: '',
  whichReviewList: '',
  selectedTagValue: '',
  currentPopUpOption: [],
  secondaryPopUpOptions: {
    allocate: ALLOCATE_POPUP,
    archive: ARCHIVE_POPUP,
    delete: DELETE_POPUP,
    flag: FLAG_PUPUP,
    publish: PUBLISH_PUPUP,
    select: SELECT_PUPUP,
    suspend: SUSPEND_PUPUP,
    terminate: TERMINATE_PUPUP,
    review: REVIEW_REVISE_POPUP,
    reviewKey: CREATE_INFORMATION_POPUP,
    reviseKey: CREATE_INFORMATION_POPUP,
    revise: REVIEW_REVISE_POPUP,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP,
    reviewDistinct: REVIEW_POPUP_OPTIONS,
    selection: SELECT_OPTION_PUPUP,
    create: ASSESSEE_REVIEW_REVISE_POPUP,
    assessees: REVIEW_DISTINCT_POPUP_OPTION,
    assessments: REVIEW_DISTINCT_POPUP_OPTION,
    assignments: ASSIGNMENT_DISTINCT_POPUP,
    associates: REVIEW_DISTINCT_POPUP_OPTION
  }
};

const PopUpReducer = (istate = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case POPUP_OPEN:
      return {
        ...istate,
        isPopUpOpen: true,
        isPopUpValue: action.payload
      };
    case POPUP_CLOSE:
      return {
        ...istate,
        isPopUpValue: '',
        isPopUpOpen: false,
        popupMode: '',
        popupContentArrValue: '',
        popupHeaderOne: '',
        popupHeaderOneBadgeOne: '',
        popupHeaderOneBadgeTwo: ''
      };
    case ASSESSEE_SIGN_ON:
      return {
        ...istate,
        isPopUpOpen: true,
        isPopUpValue: action.payload.isPopUpValue,
        popupMode: action.payload.popupMode
      };
    case ASSOCIATE_SIGN_ON:
      return {
        ...istate,
        isPopUpOpen: true,
        isPopUpValue: action.payload.isPopUpValue,
        popupMode: action.payload.popupMode
      };
    case SET_POPUP_VALUE:
      return {
        ...istate,
        isPopUpOpen: true,
        isPopUpValue: action.payload.isPopUpValue,
        popupMode: action.payload.popupMode
      };
    case SET_NEXT_POPUP:
      return {
        ...istate,
        isPopUpValue: action.payload.isPopUpValue
      };
    case PREVIOUS_POPUP:
      return {
        ...istate,
        prevPopUpValue: action.payload.prevPopUpValue
      };
    case SET_POPUP_STATE:
      return {
        ...istate,
        isPopUpValue: action.payload.isPopUpValue,
        popupOpenType: action.payload.popupOpenType,
        popupContentArrValue: action.payload.popupContentArrValue,
        primaryArrOprion: action.payload.popupContentArrValue,
        popupHeaderOne: action.payload.popupHeaderOne,
        duplicateHeaderOne: action.payload.popupHeaderOne,
        popupHeaderOneBadgeOne: action.payload.popupHeaderOneBadgeOne,
        duplicateBadgeOne: action.payload.popupHeaderOneBadgeOne,
        popupHeaderOneBadgeTwo: action.payload.popupHeaderOneBadgeTwo,
        secondaryOptionCheckValue: action.payload.secondaryOptionCheckValue,
        popupMode: action.payload.popupMode,
        selectedTagValue: action.payload.selectedTagValue,
        currentPopUpOption: action.payload.currentPopUpOption
      };
    case SET_GRID_COLUMN_COUNT_VALUE:
      return {
        ...istate,
        gridColumnCountValue: action.payload
      };
    case SET_SECONDARY_CREATE_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };
    case SET_SECONDARY_OPTION_VALUE:
      // return {
      //   ...istate,
      //   secondaryOptionCheckValue: action.payload
      // };
      if (
        action.payload !== 'assessees' &&
        action.payload !== 'assessments' &&
        action.payload !== 'assignments' &&
        action.payload !== 'associates'
      ) {
        return {
          ...istate,
          secondaryOptionCheckValue: action.payload,
          currentPopUpOption: REVIEW_DISTINCT_POPUP_OPTION
        };
      } else {
        let tempArr = [];
        GROUP_NODE_ROLE_TYPE_POPUP_OPTION.forEach((element) => {
          tempArr.push({ ...element, disabled: false });
        });
        return {
          ...istate,
          secondaryOptionCheckValue: action.payload,
          currentPopUpOption: tempArr
        };
      }
    case SET_MIDDLEPANE_SECONDARY_OPTION: {
      if (istate.popupOpenType === 'primary') {
        if (
          action.payload.badgeValue === 'notifications' ||
          action.payload.badgeValue === 'assessees' ||
          action.payload.badgeValue === 'assessments' ||
          action.payload.badgeValue === 'assignments' ||
          action.payload.badgeValue === 'associates' ||
          action.payload.badgeValue === 'reports'
        ) {
          return {
            ...istate,
            isPopUpOpen: true,
            popupHeaderOne: action.payload.badgeValue,
            popupHeaderOneBadgeOne: action.payload.keyValue,
            popupHeaderOneBadgeTwo: '',
            popupOpenType: 'secondary',
            popupContentArrValue: istate.secondaryPopUpOptions[action.payload.badgeValue],
            secondaryOptionCheckValue:
              action.payload.badgeValue === 'notifications' ||
              action.payload.badgeValue === 'reports'
                ? 'unread'
                : 'active'
          };
        } else {
          return {
            ...istate,
            popupHeaderOne: istate.popupHeaderOne,
            isPopUpOpen: true,
            popupHeaderOneBadgeOne: istate.popupHeaderOneBadgeOne,
            popupHeaderOneBadgeTwo: action.payload.badgeValue,
            popupOpenType: 'secondary',
            popupContentArrValue: istate.secondaryPopUpOptions[action.payload.keyValue],
            secondaryOptionCheckValue:
              action.payload.keyValue === 'reviseKey' || action.payload.keyValue === 'reviewKey'
                ? 'key'
                : 'all'
          };
        }
      } else {
        return istate;
      }
    }
    case SET_MIDDLEPANE_PREVIOUS_POPUP:
      if (istate.popupOpenType === 'primary') {
        return {
          ...istate,
          isPopUpValue: '',
          isPopUpOpen: false,
          popupContentArrValue: []
        };
      } else if (istate.popupOpenType === 'secondary') {
        return {
          ...istate,
          popupContentArrValue: istate.primaryArrOprion,
          popupHeaderOne: istate.duplicateHeaderOne,
          popupHeaderOneBadgeOne: istate.duplicateBadgeOne,
          popupHeaderOneBadgeTwo: '',
          popupOpenType: 'primary'
        };
      } else {
        return istate;
      }
    case SET_POPUP_SINGLE_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
    case CLEAR_POPUP_INFO:
      return istate;
    default:
      return istate;
  }
};

export default PopUpReducer;
