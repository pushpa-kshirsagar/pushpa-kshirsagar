import {
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_WORKADDRESS_INFO,
  UPDATE_ASSOCIATE_WORKTELEPHONE_INFO,
  UPDATE_ASSOCIATE_ADMIN_BASIC_INFO,
  UPDATE_ASSOCIATE_ADMIN_MOBILE_INFO,
  UPDATE_ASSOCIATE_ADMIN_PERSONAL_INFO,
  CLEAR_ASSOCIATE_INFO,
  UPDATE_ASSOCIATE_INFO
} from '../actionType';

const initialState = {
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
    case UPDATE_ASSOCIATE_INFO:
      return {
        ...istate,
        ...action.payload
      };
    case UPDATE_ASSOCIATE_WORKADDRESS_INFO:
      return {
        ...istate,
        workAddressInfo: action.payload
      };
    case UPDATE_ASSOCIATE_WORKTELEPHONE_INFO:
      return {
        ...istate,
        workTeleponeInfo: action.payload
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
        basicInfo: action.payload
      };
    case CLEAR_ASSOCIATE_INFO:
      return {
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
    default:
      return istate;
  }
};

export default AssociateCreateReducer;
