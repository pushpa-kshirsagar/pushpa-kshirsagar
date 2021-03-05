import {
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_WORKADDRESS_INFO,
  UPDATE_ASSOCIATE_WORKTELEPHONE_INFO,
  UPDATE_ASSOCIATE_ADMIN_BASIC_INFO,
  UPDATE_ASSOCIATE_ADMIN_MOBILE_INFO,
  UPDATE_ASSOCIATE_ADMIN_PERSONAL_INFO,
  CLEAR_ASSOCIATE_INFO,
  UPDATE_ASSOCIATE_INFO,
  ASSOCIATE_POPUP_OPEN,
  ASSOCIATE_POPUP_CLOSE,
  SET_ASSOCIATE_NEXT_POPUP,
  SET_ASSOCIATE_PREVIOUS_POPUP,
  SET_ASSOCIATE_SECONDARY_OPTION_VALUE
} from '../actionType';
import {
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP
} from '../PopUpConfig';

const initialState = {
  associatesPopUpActive: false,
  associatesPopUpType: '',
  associatesHeaderOne: '',
  associatesHeaderOneBadgeOne: '',
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  currentPopUpOption: [],
  secondaryPopUpOptions: {
    create: REVIEW_REVISE_POPUP,
    review: REVIEW_POPUP_OPTIONS,
    notifications: NOTIFICATION_REPORT_POPUP,
    reports: NOTIFICATION_REPORT_POPUP
  },
  secondaryOptionCheckValue: '',
  informationBasic: {
    associateName: '',
    associateNameVerification: false,
    associateDescription: '',
    associatePicture: '',
    associatePictureVerification: false
  },
  informationAllocation: {
    associateGroup: {
      associateGroupPrimary: [],
      associateGroupSecondary: []
    },
    associateManager: {
      associateManagerPrimary: [],
      associateManagerSecondary: []
    },
    associateNode: {
      associateNodePrimary: [],
      associateNodeSecondary: []
    },
    associateRole: {
      associateRolePrimary: [],
      associateRoleSecondary: []
    }
  },
  informationContact: {
    associateAddressWorkPrimary: {
      associateAddressCountryRegion: '',
      associateAddressProvinceState: '',
      associateAddressPostcode: '',
      associateAddressCity: '',
      associateAddress: '',
      associateAddressCommunication: '',
      associateAddressVerification: ''
    },
    associateTelephoneWorkPrimary: {
      associateTelephoneCountryRegion: '',
      associateTelephoneAreaCity: '',
      associateTelephoneNumber: '',
      associateTelephoneExtension: '',
      associateTelephoneCommunication: '',
      associateTelephoneVerification: ''
    }
  },
  basicInfo: {
    name: '',
    description: '',
    picture: '',
    isPictureValidate: false
  },
  otherInfo: {
    roleArr: []
  },
  workAddressInfo: {
    countryCode: '',
    stateCode: '',
    postCode: '',
    cityCode: '',
    address: '',
    isCommunication: false,
    isVerification: false
  },
  workTeleponeInfo: {
    countryCode: '',
    cityCode: '',
    telephoneNumber: '',
    extensionNumber: '',
    isCommunication: false,
    isVerification: false
  },
  adminBasicInfo: {
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
  AdminMobileTelephone: {
    mobileNumber: '',
    countryCode: '',
    communication: false,
    verification: false
  },
  AdminPersonalInfo: {
    gender: '',
    birthDate: '',
    birthPlace: ''
  },
  emailAddressPrimary: '',
  communication: '',
  signIn: ''
};

const AssociateCreateReducer = (istate = initialState, action) => {
  switch (action.type) {
    case ASSOCIATE_POPUP_OPEN:
      return {
        ...istate,
        associatesHeaderOne: 'associates',
        associatesPopUpType: 'primary',
        currentPopUpOption: istate.primaryPopUpOptions,
        associatesPopUpActive: true
      };
    case ASSOCIATE_POPUP_CLOSE:
      return {
        ...istate,
        associatesHeaderOne: '',
        associatesHeaderOneBadgeOne: '',
        associatesPopUpActive: false
      };
    case SET_ASSOCIATE_NEXT_POPUP:
      if (istate.associatesPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            associatesHeaderOne: action.payload,
            associatesHeaderOneBadgeOne: 'review',
            associatesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            associatesHeaderOne: 'associates',
            associatesHeaderOneBadgeOne: action.payload,
            associatesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSOCIATE_PREVIOUS_POPUP:
      if (istate.associatesPopUpType === 'primary') {
        return {
          ...istate,
          currentPopUpOption: [],
          associatesPopUpActive: false,
          associatesPopUpType: ''
        };
      } else if (istate.associatesPopUpType === 'secondary') {
        return {
          ...istate,
          currentPopUpOption: istate.primaryPopUpOptions,
          associatesHeaderOne: 'associates',
          associatesHeaderOneBadgeOne: '',
          associatesPopUpType: 'primary'
        };
      } else {
        return istate;
      }
    case SET_ASSOCIATE_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };
    case UPDATE_ASSOCIATE_INFO:
      return {
        ...istate,
        ...action.payload
      };
    case UPDATE_ASSOCIATE_WORKADDRESS_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateAddressWorkPrimary: action.payload
        }
        // workAddressInfo: action.payload
      };
    case UPDATE_ASSOCIATE_WORKTELEPHONE_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateTelephoneWorkPrimary: action.payload
        }
        // workTeleponeInfo: action.payload
      };
    case UPDATE_ASSOCIATE_ADMIN_BASIC_INFO:
      return {
        ...istate,
        adminBasicInfo: action.payload
      };
    case UPDATE_ASSOCIATE_ADMIN_MOBILE_INFO:
      return {
        ...istate,
        AdminMobileTelephone: action.payload
      };
    case UPDATE_ASSOCIATE_ADMIN_PERSONAL_INFO:
      return {
        ...istate,
        AdminPersonalInfo: action.payload
      };
    case UPDATE_ASSOCIATE_BASIC_INFO:
      return {
        ...istate,
        informationBasic: action.payload
      };
    case CLEAR_ASSOCIATE_INFO:
      return initialState;
    default:
      return istate;
  }
};

export default AssociateCreateReducer;
