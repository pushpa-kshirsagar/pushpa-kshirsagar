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
  SET_ASSOCIATE_SECONDARY_OPTION_VALUE,
  SET_ASSOCIATE_SECONDARY_POPUP,
  ASSOCIATE_CREATE_INFO,
  SET_ASSOCIATE_INFORMATION,
  SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
  UPDATE_ASSOCIATE_SETUP_INFO,
  UPDATE_ASSOCIATE_WEBSITE_PRIMARY_INFO,
  UPDATE_ASSOCIATE_WEBSITE_SECONDARY_INFO,
  UPDATE_ASSOCIATE_INFO_CONTACT_INFO,
  UPDATE_ASSOCIATE_WORKTELEPHONE_SECONDARY_INFO,
  UPDATE_ASSOCIATE_WORKADDRESS_SECONDARY_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
  SET_IGURU_NODE_DYNAMIC_SINGLE_STATE,
  SET_SINGLE_ASSOCIATE_INFORMATION,
  SET_BRAND_LOGO_TYPE
} from '../actionType';
import {
  MODULE_POPUP_OPTION,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_POPUP_OPTIONS,
  REVIEW_REVISE_POPUP
} from '../PopUpConfig';

const initialState = {
  associatesPopUpActive: false,
  associatesPopUpType: 'primary',
  isBackToSectionPopUp: false,
  associatesHeaderOne: '',
  parentAssociateId: '',
  associatesHeaderOneBadgeOne: '',
  primaryPopUpOptions: MODULE_POPUP_OPTION,
  associateInfomationData: '',
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
    associateAddressWebsitePrimary: {
      associateAddressWebsite: '',
      associateAddressWebsiteVerification: false
    },
    associateAddressWebsiteSecondary: {
      associateAddressWebsite: '',
      associateAddressWebsiteVerification: false
    },
    associateAddressWorkPrimary: {
      associateAddressCountryRegion: '',
      associateAddressProvinceState: '',
      associateAddressPostcode: '',
      associateAddressCity: '',
      associateAddress: '',
      associateAddressCommunication: false,
      associateAddressVerification: false
    },
    associateAddressWorkSecondary: {
      associateAddressCountryRegion: '',
      associateAddressProvinceState: '',
      associateAddressPostcode: '',
      associateAddressCity: '',
      associateAddress: '',
      associateAddressCommunication: false,
      associateAddressVerification: false
    },
    associateTelephoneWorkPrimary: {
      associateTelephoneCountryRegion: '',
      associateTelephoneAreaCity: '',
      associateTelephoneNumber: '',
      associateTelephoneExtension: '',
      associateTelephoneCommunication: false,
      associateTelephoneVerification: false
    },
    associateTelephoneWorkSecondary: {
      associateTelephoneCountryRegion: '',
      associateTelephoneAreaCity: '',
      associateTelephoneNumber: '',
      associateTelephoneExtension: '',
      associateTelephoneCommunication: false,
      associateTelephoneVerification: false
    }
  },
  informationSetup: {
    assessee: {
      assesseeNameFormat: '',
      assesseeRoleCreate: false,
      assesseeRoleShare: false,
      assesseeRoleShared: true
    },
    assessment: null,
    assignment: null,
    associate: {
      associateDateFormat: '',
      associateDictionary: '',
      associateLanguage: '',
      associateRoleCreate: false,
      associateRoleShare: false,
      associateRoleShared: true,
      associateTimeFormat: ''
    }
  },
  informationFramework: {
    associateAscendant: {
      associateAscendantPrimary: [],
      associateAscendantSecondary: [],
      associateAscendantAll: []
    },
    associateDescendant: {
      associateDescendantPrimary: [],
      associateDescendantSecondary: [],
      associateDescendantAll: []
    }
  },
  // informationSetup: {
  //   associateDateFormat: '',
  //   associateDictionary: '',
  //   associateLanguage: '',
  //   assesseeNameFormat: '',
  //   associateTimeFormat: ''
  // },
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
    case ASSOCIATE_CREATE_INFO:
      return {
        ...istate,
        associatesPopUpActive: false
      };
    case SET_ASSOCIATE_NEXT_POPUP:
      if (istate.associatesPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            associatesPopUpActive: true,
            associatesHeaderOne: action.payload,
            associatesHeaderOneBadgeOne: 'review',
            associatesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread'
          };
        } else {
          return {
            ...istate,
            associatesPopUpActive: true,
            associatesHeaderOne: 'associates',
            associatesHeaderOneBadgeOne: action.payload,
            associatesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: action.payload === 'create' ? 'all' : 'active'
          };
        }
      } else {
        return istate;
      }
    case SET_ASSOCIATE_SECONDARY_POPUP:
      if (istate.associatesPopUpType === 'primary') {
        if (action.payload === 'notifications' || action.payload === 'reports') {
          return {
            ...istate,
            associatesPopUpActive: true,
            associatesHeaderOne: action.payload,
            associatesHeaderOneBadgeOne: 'review',
            associatesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'unread',
            isBackToSectionPopUp: true
          };
        } else {
          return {
            ...istate,
            associatesPopUpActive: true,
            associatesHeaderOne: 'associates',
            associatesHeaderOneBadgeOne: action.payload,
            associatesPopUpType: 'secondary',
            currentPopUpOption: istate.secondaryPopUpOptions[action.payload],
            secondaryOptionCheckValue: 'active',
            isBackToSectionPopUp: true
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
          associatesPopUpActive: false
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
    case UPDATE_ASSOCIATE_INFO_CONTACT_INFO:
      let contactObj = istate.informationContact;
      for (const [key, value] of Object.entries(action.payload)) {
        console.log(`${key}: ${value}`);
        if (value !== null) {
          contactObj = { ...contactObj, [key]: value };
        }
      }
      console.log('final object contact', contactObj);
      return {
        ...istate,
        informationContact: contactObj
      };
    case UPDATE_ASSOCIATE_WORKADDRESS_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateAddressWorkPrimary: action.payload
        }
      };
    case UPDATE_ASSOCIATE_WORKADDRESS_SECONDARY_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateAddressWorkSecondary: action.payload
        }
      };
    case UPDATE_ASSOCIATE_WEBSITE_PRIMARY_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateAddressWebsitePrimary: action.payload
        }
      };
    case UPDATE_ASSOCIATE_WEBSITE_SECONDARY_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateAddressWebsiteSecondary: action.payload
        }
      };
    case UPDATE_ASSOCIATE_WORKTELEPHONE_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateTelephoneWorkPrimary: action.payload
        }
      };
    case UPDATE_ASSOCIATE_WORKTELEPHONE_SECONDARY_INFO:
      return {
        ...istate,
        informationContact: {
          ...istate.informationContact,
          associateTelephoneWorkSecondary: action.payload
        }
      };
    case SET_ASSOCIATE_DYNAMIC_SINGLE_STATE:
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
    case UPDATE_ASSOCIATE_SETUP_INFO:
      return {
        ...istate,
        informationSetup: {
          ...istate.informationSetup,
          associate: action.payload
        }
      };
    case UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO:
      return {
        ...istate,
        informationSetup: {
          ...istate.informationSetup,
          assessee: action.payload
        }
      };
    case SET_ASSOCIATE_INFORMATION:
      return {
        ...istate,
        associateInfomationData: action.payload
      };
    case SET_SINGLE_ASSOCIATE_INFORMATION:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
    case SET_IGURU_NODE_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        // nodeInformation:{
        // ...istate.nodeInformation,
        [action.payload.objectName]: {
          ...istate[action.payload.objectName],
          [action.payload.stateName]: {
            ...istate[action.payload.objectName][action.payload.stateName],
            [action.payload.actualStateName]: action.payload.value
          }
        }
        // }
      };
    case CLEAR_ASSOCIATE_INFO:
      return initialState;
    default:
      return istate;
  }
};

export default AssociateCreateReducer;
