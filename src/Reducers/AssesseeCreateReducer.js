import {
  UPDATE_ASSESSEE_INFO,
  UPDATE_ASSESSEE_BASIC_INFO,
  CLEAR_ASSESSEE_INFO,
  UPDATE_ASSESSEE_MOBILE_INFO,
  UPDATE_ASSESSEE_HOMEADDRESS_INFO,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  ASSESSEE_POPUP_OPEN,
  ASSESSEE_POPUP_CLOSE,
  SET_ASSESSEE_NEXT_POPUP,
  SET_ASSESSEE_PREVIOUS_POPUP,
  SET_ASSESSEE_SECONDARY_OPTION_VALUE
} from '../actionType';
import {
  ASSESSEE_REVIEW_REVISE_POPUP,
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS
} from '../PopUpConfig';

const getLocalTime = () => {
  let date = new Date();
  var finalDate =
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2) +
    'T' +
    new Date().getHours() +
    ':' +
    new Date().getMinutes();
  return finalDate;
};
const initialState = {
  assesseesPopUpActive: false,
  assesseesPopUpType: '',
  assesseesHeaderOne: '',
  assesseesHeaderOneBadgeOne: '',
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  currentPopUpOption: [],
  secondaryPopUpOptions: {
    create: ASSESSEE_REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP
  },
  secondaryOptionCheckValue: '',
  basicInfo: {
    namePrefix: '',
    nameFirst: '',
    nameOther: '',
    nameLast: '',
    nameSuffix: '',
    isNameVerified: false,
    alias: '',
    picture: '',
    isPicture: false
  },
  emailAddressPrimary: '',
  emailAddressSecondary: '',
  communication: '',
  signIn: '',
  mobileTelephone: {
    mobileNumber: '',
    countryCode: '',
    communication: false,
    verification: false
  },
  personalInfo: {
    gender: '',
    birthDate: '',
    birthPlace: ''
  },
  homeAddressInfo: {
    countryCode: '',
    stateCode: '',
    postCode: '',
    cityCode: '',
    address: '',
    isCommunication: false,
    isVerification: false
  },
  tagprimary: '',
  tagsecondary: '',
  tenurestart: getLocalTime(),
  tenureend: '1970-00-00T00:00'
};

const AssesseeCreateReducer = (istate = initialState, action) => {
  switch (action.type) {
    case ASSESSEE_POPUP_OPEN:
      return {
        ...istate,
        assesseesHeaderOne: 'assessees',
        assesseesPopUpType: 'primary',
        currentPopUpOption: istate.primaryPopUpOptions,
        assesseesPopUpActive: true
      };
    case ASSESSEE_POPUP_CLOSE:
      return {
        ...istate,
        assesseesHeaderOne: '',
        assesseesHeaderOneBadgeOne: '',
        assesseesPopUpActive: false
      };
    case SET_ASSESSEE_NEXT_POPUP:
      if (istate.assesseesPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            assesseesHeaderOne: action.payload,
            assesseesHeaderOneBadgeOne: 'review',
            assesseesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            assesseesHeaderOne: 'assessees',
            assesseesHeaderOneBadgeOne: action.payload,
            assesseesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSESSEE_PREVIOUS_POPUP:
      if (istate.assesseesPopUpType === 'primary') {
        return {
          ...istate,
          currentPopUpOption: [],
          assesseesPopUpActive: false,
          assesseesPopUpType: ''
        };
      } else if (istate.assesseesPopUpType === 'secondary') {
        return {
          ...istate,
          currentPopUpOption: istate.primaryPopUpOptions,
          assesseesHeaderOne: 'assessees',
          assesseesHeaderOneBadgeOne: '',
          assesseesPopUpType: 'primary'
        };
      } else {
        return istate;
      }
    case SET_ASSESSEE_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };
    case UPDATE_ASSESSEE_BASIC_INFO:
      return {
        ...istate,
        basicInfo: action.payload
      };
    case UPDATE_ASSESSEE_MOBILE_INFO:
      return {
        ...istate,
        mobileTelephone: action.payload
      };
    case UPDATE_ASSESSEE_PERSONAL_INFO:
      return {
        ...istate,
        personalInfo: action.payload
      };
    case UPDATE_ASSESSEE_HOMEADDRESS_INFO:
      return {
        ...istate,
        homeAddressInfo: action.payload
      };
    case UPDATE_ASSESSEE_INFO:
      return {
        ...istate,
        ...action.payload
      };
    case CLEAR_ASSESSEE_INFO:
      return initialState;
    default:
      return istate;
  }
};

export default AssesseeCreateReducer;
