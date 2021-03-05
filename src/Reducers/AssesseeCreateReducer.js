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
  UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO,
  UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
  SET_ASSESSEE_SECONDARY_OPTION_VALUE
} from '../actionType';
import {
  ASSESSEE_REVIEW_REVISE_POPUP,
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS
} from '../PopUpConfig';

// const getLocalTime = () => {
//   let date = new Date();
//   var finalDate =
//     date.getFullYear() +
//     '-' +
//     ('0' + (date.getMonth() + 1)).slice(-2) +
//     '-' +
//     ('0' + date.getDate()).slice(-2) +
//     'T' +
//     new Date().getHours() +
//     ':' +
//     new Date().getMinutes();
//   return finalDate;
// };
const initialState = {
  assesseesPopUpActive: false,
  assesseesPopUpType: '',
  assesseesHeaderOne: '',
  assesseesHeaderOneBadgeOne: '',
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  secondaryOptionCheckValue: '',
  currentPopUpOption: [],
  secondaryPopUpOptions: {
    create: ASSESSEE_REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP
  },
  informationBasic: {
    assesseeNamePrefix: '',
    assesseeNameFirst: '',
    assesseeNameOther: '',
    assesseeNameLast: '',
    assesseeNameSuffix: '',
    assesseeNameVerification: false,
    assesseeAlias: '',
    assesseePicture: '',
    assesseePictureVerification: false
  },
  informationContact: {
    assesseeAddressEmailPrimary: {
      assesseeAddressEmail: '',
      assesseeAddressEmailCommunication: false,
      assesseeAddressEmailVerification: false
    },
    assesseeAddressEmailSecondary: {
      assesseeAddressEmail: '',
      assesseeAddressEmailCommunication: false,
      assesseeAddressEmailVerification: false
    },
    assesseeTelephoneMobilePrimary: {
      assesseeTelephoneCountryRegion: '',
      assesseeTelephoneNumber: '',
      assesseeTelephoneCommunication: false,
      assesseeTelephoneVerification: false
    }
  },
  informationSetup: {
    assesseeSignIn: ''
  },
  informationPersonal: {
    assesseeGender: ''
  }
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
        informationBasic: action.payload
      };
    case UPDATE_ASSESSEE_MOBILE_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          assesseeTelephoneMobilePrimary: action.payload
        }
        // mobileTelephone: action.payload
      };
    case UPDATE_ASSESSEE_PERSONAL_INFO:
      return {
        ...istate,
        informationPersonal: action.payload
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
    case UPDATE_ASSESSEE_ADDRESS_EMAIL_PRIMARY_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          assesseeAddressEmailPrimary: action.payload
        }
      };

    case UPDATE_ASSESSEE_SETUP_PRIMARY_INFO:
      return {
        ...istate,
        informationSetup: action.payload
      };
    case CLEAR_ASSESSEE_INFO:
      return initialState;
    default:
      return istate;
  }
};

export default AssesseeCreateReducer;
