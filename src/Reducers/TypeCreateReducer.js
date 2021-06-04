import {
  SET_TYPE_REDUCER_STATE,
  CLEAR_TYPE_REDUCER_STATE,
  SET_ASSESSEE_TYPE_REDUCER_STATE,
  SET_ASSESSMENT_TYPE_REDUCER_STATE,
  SET_ASSIGNMENT_TYPE_REDUCER_STATE,
  SET_ASSOCIATE_TYPE_REDUCER_STATE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_ITEM_TYPE_REDUCER_STATE
} from '../actionType';

const initialState = {
  assesseeType: {
    informationBasic: {
      assesseeTypeName: '',
      assesseeTypeNameVerification: false,
      assesseeTypeDescription: '',
      assesseeTypePicture: '',
      assesseeTypePictureVerification: false,
      assesseeTypeFlag: false
    },
    informationAllocation: {
      assesseeTypeGroup: ''
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
    },
    informationAllocation: {
      assessmentTypeGroup: ''
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
    },
    informationAllocation: {
      assignmentTypeGroup: ''
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
    },
    informationAllocation: {
      associateTypeGroup: ''
    }
  },
  itemType: {
    informationBasic: {
      itemTypeName: '',
      itemTypeNameVerification: false,
      itemTypeDescription: '',
      itemTypePicture: '',
      itemTypePictureVerification: false,
      itemTypeFlag: false
    },
    informationAllocation: {
      itemTypeGroup: ''
    }
  }
};

const TypeCreateReducer = (istate = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_TYPE_GROUP_ALLOCATION:
      return {
        ...istate,
        [action.payload.objectName]: {
          ...istate[action.payload.objectName],
          informationAllocation: {
            ...istate[action.payload.objectName].informationAllocation,
            [action.payload.stateName]: action.payload.value
          }
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
    case SET_ITEM_TYPE_REDUCER_STATE:
      return {
        ...istate,
        itemType: {
          ...istate.itemType,
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
