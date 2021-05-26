import {
  SET_TYPE_REDUCER_STATE,
  CLEAR_TYPE_REDUCER_STATE,
  SET_ASSESSEE_TYPE_REDUCER_STATE,
  SET_ASSESSMENT_TYPE_REDUCER_STATE,
  SET_ASSIGNMENT_TYPE_REDUCER_STATE,
  SET_ASSOCIATE_TYPE_REDUCER_STATE
} from '../actionType';

const initialState = {
  typeInformation: {
    informationBasic: {
      typeName: '',
      typeNameVerification: false,
      typeDescription: '',
      typePicture: '',
      typePictureVerification: false
    }
  },
  assesseeType: {
    informationBasic: {
      assesseeTypeName: '',
      assesseeTypeNameVerification: false,
      assesseeTypeDescription: '',
      assesseeTypePicture: '',
      assesseeTypePictureVerification: false,
      assesseeTypeFlag: false
    }
  },
  assessmentType: {
    informationBasic: {
      assessmentTypeName: '',
      assessmentTypeNameVerification: false,
      assessmentTypeDescription: '',
      assessmentTypePicture: '',
      assessmentTypePictureVerification: false,
      assessmentTypeFlag: false
    }
  },
  assignmentType: {
    informationBasic: {
      assignmentTypeName: '',
      assignmentTypeNameVerification: false,
      assignmentTypeDescription: '',
      assignmentTypePicture: '',
      assignmentTypePictureVerification: false,
      assignmentTypeFlag: false
    }
  },
  associateType: {
    informationBasic: {
      associateTypeName: '',
      associateTypeNameVerification: false,
      associateTypeDescription: '',
      associateTypePicture: '',
      associateTypePictureVerification: false,
      associateTypeFlag: false
    }
  }
};

const TypeCreateReducer = (istate = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_TYPE_REDUCER_STATE:
      return {
        ...istate,
        typeInformation: {
          ...istate.typeInformation,
          informationBasic: action.payload
        }
      };
    case SET_ASSESSEE_TYPE_REDUCER_STATE:
      return {
        ...istate,
        assesseeType: {
          ...istate.assesseeType,
          informationBasic: action.payload
        }
      };
    case SET_ASSESSMENT_TYPE_REDUCER_STATE:
      return {
        ...istate,
        assessmentType: {
          ...istate.assessmentType,
          informationBasic: action.payload
        }
      };
    case SET_ASSIGNMENT_TYPE_REDUCER_STATE:
      return {
        ...istate,
        assignmentType: {
          ...istate.assignmentType,
          informationBasic: action.payload
        }
      };
    case SET_ASSOCIATE_TYPE_REDUCER_STATE:
      return {
        ...istate,
        associateType: {
          ...istate.associateType,
          informationBasic: action.payload
        }
      };
    case CLEAR_TYPE_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default TypeCreateReducer;
