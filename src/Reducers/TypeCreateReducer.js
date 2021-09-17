import {
  SET_TYPE_REDUCER_STATE,
  CLEAR_TYPE_REDUCER_STATE,
  SET_ASSESSEE_TYPE_REDUCER_STATE,
  SET_ASSESSMENT_TYPE_REDUCER_STATE,
  SET_ASSIGNMENT_TYPE_REDUCER_STATE,
  SET_ASSOCIATE_TYPE_REDUCER_STATE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_ITEM_TYPE_REDUCER_STATE,
  SET_CULTURE_TYPE_REDUCER_STATE,
  SET_JOB_TYPE_REDUCER_STATE,
  SET_ASSESSEE_TYPE_CLASSIFICAION_STATE,
  SET_ASSESSMENT_TYPE_CLASSIFICAION_STATE,
  SET_ASSIGNMENT_TYPE_CLASSIFICAION_STATE,
  SET_ASSOCIATE_TYPE_CLASSIFICAION_STATE,
  SET_CULTUREPROFILE_TYPE_CLASSIFICAION_STATE,
  SET_JOBPROFILE_TYPE_CLASSIFICAION_STATE,
  SET_ITEM_TYPE_CLASSIFICAION_STATE
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
    },
    informationSetup: {
      assesseeTypeClassification: {
        assesseeTypeClassificationPrimary: '',
        assesseeTypeClassificationSecondary: ''
      }
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
    },
    informationSetup: {
      assessmentTypeClassification: {
        assessmentTypeClassificationPrimary: '',
        assessmentTypeClassificationSecondary: ''
      }
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
    },
    informationSetup: {
      assignmentTypeClassification: {
        assignmentTypeClassificationPrimary: '',
        assignmentTypeClassificationSecondary: ''
      }
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
    },
    informationSetup: {
      associateTypeClassification: {
        associateTypeClassificationPrimary: '',
        associateTypeClassificationSecondary: ''
      }
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
    },
    informationSetup: {
      itemTypeClassification: {
        itemTypeClassificationPrimary: '',
        itemTypeClassificationSecondary: ''
      }
    }
  },
  cultureProfileType: {
    informationBasic: {
      cultureProfileTypeName: '',
      cultureProfileTypeNameVerification: false,
      cultureProfileTypeDescription: '',
      cultureProfileTypePicture: '',
      cultureProfileTypePictureVerification: false,
      cultureProfileTypeFlag: false
    },
    informationAllocation: {
      cultureProfileTypeGroup: ''
    },
    informationSetup: {
      cultureProfileTypeClassification: {
        cultureProfileTypeClassificationPrimary: '',
        cultureProfileTypeClassificationSecondary: ''
      }
    }
  },
  jobProfileType: {
    informationBasic: {
      jobProfileTypeName: '',
      jobProfileTypeNameVerification: false,
      jobProfileTypeDescription: '',
      jobProfileTypePicture: '',
      jobProfileTypePictureVerification: false,
      jobProfileTypeFlag: false
    },
    informationAllocation: {
      jobProfileTypeGroup: ''
    },
    informationSetup: {
      jobProfileTypeClassification: {
        jobProfileTypeClassificationPrimary: '',
        jobProfileTypeClassificationSecondary: ''
      }
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
    case SET_CULTURE_TYPE_REDUCER_STATE:
      return {
        ...istate,
        cultureProfileType: {
          ...istate.cultureProfileType,
          informationBasic: action.payload
        }
      };
    case SET_JOB_TYPE_REDUCER_STATE:
      return {
        ...istate,
        jobProfileType: {
          ...istate.jobProfileType,
          informationBasic: action.payload
        }
      };
      case SET_ASSESSEE_TYPE_CLASSIFICAION_STATE:
      return {
        ...istate,
        assesseeType: {
          ...istate.assesseeType,
          informationSetup: {
            ...istate.assesseeType.informationSetup,
            assesseeTypeClassification: action.payload
          }
        }
      };
    case SET_ASSESSMENT_TYPE_CLASSIFICAION_STATE:
      return {
        ...istate,
        assessmentType: {
          ...istate.assessmentType,
          informationSetup: {
            ...istate.assessmentType.informationSetup,
            assessmentTypeClassification: action.payload
          }
        }
      };
    case SET_ASSIGNMENT_TYPE_CLASSIFICAION_STATE:
      return {
        ...istate,
        assignmentType: {
          ...istate.assignmentType,
          informationSetup: {
            ...istate.assignmentType.informationSetup,
            assignmentTypeClassification: action.payload
          }
        }
      };
    case SET_ASSOCIATE_TYPE_CLASSIFICAION_STATE:
      return {
        ...istate,
        associateType: {
          ...istate.associateType,
          informationSetup: {
            ...istate.associateType.informationSetup,
            associateTypeClassification: action.payload
          }
        }
      };
    case SET_CULTUREPROFILE_TYPE_CLASSIFICAION_STATE:
      return {
        ...istate,
        cultureProfileType: {
          ...istate.cultureProfileType,
          informationSetup: {
            ...istate.cultureProfileType.informationSetup,
            cultureProfileTypeClassification: action.payload
          }
        }
      };
    case SET_JOBPROFILE_TYPE_CLASSIFICAION_STATE:
      return {
        ...istate,
        jobProfileType: {
          ...istate.jobProfileType,
          informationSetup: {
            ...istate.jobProfileType.informationSetup,
            jobProfileTypeClassification: action.payload
          }
        }
      };
    case SET_ITEM_TYPE_CLASSIFICAION_STATE:
      return {
        ...istate,
        itemType: {
          ...istate.itemType,
          informationSetup: {
            ...istate.itemType.informationSetup,
            itemTypeClassification: action.payload
          }
        }
      };
    case CLEAR_TYPE_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default TypeCreateReducer;
