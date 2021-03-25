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
  SET_POPUP_VALUE,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_MIDDLEPANE_PREVIOUS_POPUP
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
  REVIEW_LIST_POPUP_OPTION,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP,
  SELECT_PUPUP,
  SUSPEND_PUPUP,
  TERMINATE_PUPUP,
  SELECT_OPTION_PUPUP,
  TRIPPLE_DOT_POPUP_OPTION,
  ASSESSEE_REVIEW_REVISE_POPUP
} from '../PopUpConfig';

const initialState = {
  isPopUpOpen: false,
  isPopUpValue: '',
  prevPopUpValue: '',
  popupMode: '',
  popupHeaderOne: '',
  previousPopupHeaderOne: '',
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
  selectedTagValue:'',
  secondaryPopUpOptions: {
    allocate: ALLOCATE_POPUP,
    archive: ARCHIVE_POPUP,
    delete: DELETE_POPUP,
    flag: FLAG_PUPUP,
    select: SELECT_PUPUP,
    suspend: SUSPEND_PUPUP,
    terminate: TERMINATE_PUPUP,
    review: REVIEW_REVISE_POPUP,
    revise: REVIEW_REVISE_POPUP,
    assignments: ASSIGNMENT_DISTINCT_POPUP,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP,
    reviewDistinct: REVIEW_POPUP_OPTIONS,
    selection: SELECT_OPTION_PUPUP,
    create: ASSESSEE_REVIEW_REVISE_POPUP
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
        popupHeaderOne: action.payload.popupHeaderOne,
        previousPopupHeaderOne: action.payload.previousPopupHeaderOne || '',
        popupHeaderOneBadgeOne: action.payload.popupHeaderOneBadgeOne,
        popupHeaderOneBadgeTwo: action.payload.popupHeaderOneBadgeTwo,
        secondaryOptionCheckValue: action.payload.secondaryOptionCheckValue,
        popupMode: action.payload.popupMode,
        selectedTagValue: action.payload.selectedTagValue
        
      };
    case SET_GRID_COLUMN_COUNT_VALUE:
      return {
        ...istate,
        gridColumnCountValue: action.payload
      };
    case SET_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };
    case SET_MIDDLEPANE_SECONDARY_OPTION: {
      if (istate.popupOpenType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            isPopUpOpen: true,
            popupHeaderOne: action.payload,
            popupHeaderOneBadgeOne: 'review',
            popupOpenType: 'secondary',
            popupContentArrValue: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            popupHeaderOne: 'assessees',
            isPopUpOpen: true,
            popupHeaderOneBadgeOne: action.payload,
            popupOpenType: 'secondary',
            popupContentArrValue: istate.secondaryPopUpOptions[action.payload]
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
          popupContentArrValue: istate.popupHeaderOne==='assessee' ?REVIEW_LIST_POPUP_OPTION :TRIPPLE_DOT_POPUP_OPTION,
          popupHeaderOneBadgeOne: '',
          popupOpenType: 'primary'
        };
      } else {
        return istate;
      }

    default:
      return istate;
  }
};

export default PopUpReducer;
