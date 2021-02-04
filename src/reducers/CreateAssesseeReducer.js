import {
  UPDATE_ASSESSEE_INFO,
  UPDATE_ASSESSEE_BASIC_INFO,
  CLEAR_ASSESSEE_INFO,
  UPDATE_ASSESSEE_MOBILE_INFO,
  UPDATE_ASSESSEE_PERSONAL_INFO
} from '../actionType';

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
  mobileTelephone:{
    mobileNumber:'',
    countryCode:'',
    communication:false,
    verification:false
  },
  personalInfo:{
    gender: '',
    birthDate: '',
    birthPlace: '',
  },
  postcode: '',
  address: '',
  stateCode: '',
  cityCode: '',
  tagprimary: '',
  tagsecondary: '',
  tenurestart: getLocalTime(),
  tenureend: '1970-00-00T00:00',
};

const CreateAssesseeReducer = (istate = initialState, action) => {
  console.log('IN assessee create REDUCER====>', action.payload);
  switch (action.type) {
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
    case UPDATE_ASSESSEE_INFO:
      return {
        ...istate,
        ...action.payload
      };
    case CLEAR_ASSESSEE_INFO:
      return {
        basicInfo: {
          namePrefix: '',
          nameFirst: '',
          nameOther: '',
          nameLast: '',
          nameSuffix: '',
          isNameVerified: false
        },
        emailAddressPrimary: '',
        emailAddressSecondary: '',
        communication: '',
        signIn: '',
        mobileTelephone:{
          mobileNumber:'',
          countryCode:'',
          communication:false,
          verification:false
        },
        personalInfo:{
          gender: '',
          birthDate: '',
          birthPlace: '',
        },
        email: '',
        postcode: '',
        address: '',
        stateCode: '',
        cityCode: '',
        tagprimary: '',
        tagsecondary: '',
        tenurestart: getLocalTime(),
        tenureend: '1970-00-00T00:00',
      };
    default:
      return istate;
  }
};

export default CreateAssesseeReducer;
