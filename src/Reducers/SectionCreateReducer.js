import { SET_SECTION_REDUCER_STATE, CLEAR_SECTION_REDUCER_STATE } from '../actionType';
const initialState = {
  sectionInformation: {
    informationBasic: {
      assessmentSectionName: '',
      assessmentSectionNameVerification: false,
      assessmentSectionDescription: '',
      assessmentSectionPicture: '',
      assessmentSectionPictureVerification: false,
      assessmentSectionFlag: false,
      assessmentSectionReference: ''
    }
  }
};

const SectionCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case SET_SECTION_REDUCER_STATE:
      return {
        ...istate,
        sectionInformation: {
          ...istate.sectionInformation,
          informationBasic: action.payload
        }
      };
    case CLEAR_SECTION_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default SectionCreateReducer;
