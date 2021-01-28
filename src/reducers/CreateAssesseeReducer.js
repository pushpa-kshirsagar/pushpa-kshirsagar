import { UPDATE_ASSESSEE_INFO, CLEAR_ASSESSEE_INFO } from '../actionType';

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
  cityCode: ''
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
