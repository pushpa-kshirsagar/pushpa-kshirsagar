import { UPDATE_ASSESSEE_INFO, CLEAR_ASSESSEE_INFO } from '../actionType';

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
  namePrefix: '',
  nameFirst: '',
  nameOther: '',
  nameLast: '',
  nameSuffix: '',
  isNameVerified: false,
  email: '',
  postcode: '',
  address: '',
  countryCode: '',
  stateCode: '',
  cityCode: '',
  tagprimary: '',
  tagsecondary: '',
  tenurestart: getLocalTime(),
  tenureend: '1970-00-00T00:00',
  birthdate:'',
};

const CreateAssesseeReducer = (istate = initialState, action) => {
  console.log('IN assessee create REDUCER====>', action);
  switch (action.type) {
    case UPDATE_ASSESSEE_INFO:
      return {
        ...istate,
        ...action.payload
      };
    case CLEAR_ASSESSEE_INFO:
      return {
        namePrefix: '',
        nameFirst: '',
        nameOther: '',
        nameLast: '',
        nameSuffix: '',
        isNameVerified: false
      };
    default:
      return istate;
  }
};

export default CreateAssesseeReducer;
