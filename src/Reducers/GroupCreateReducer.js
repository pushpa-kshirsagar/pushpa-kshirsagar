import {
  CLEAR_GROUP_REDUCER_STATE,
  SET_ASSESSEE_GROUP_REDUCER_STATE,
  SET_ASSESSMENT_GROUP_REDUCER_STATE,
  SET_ASSIGNMEMT_GROUP_REDUCER_STATE,
  SET_ASSOCIATE_GROUP_REDUCER_STATE,
  SET_CULTURE_GROUP_REDUCER_STATE,
  SET_ITEM_GROUP_REDUCER_STATE,
  SET_JOB_GROUP_REDUCER_STATE,
  SET_GROUP_ALLOCATION_STATE,
  SET_GROUP_SETUP_STATE,
  SET_ASSESSEE_CLASSIFICAION_STATE,
  SET_ASSESSMENT_CLASSIFICAION_STATE,
  SET_ASSIGNMENT_CLASSIFICAION_STATE,
  SET_ASSOCIATE_CLASSIFICAION_STATE,
  SET_CULTUREPROFILE_CLASSIFICAION_STATE,
  SET_JOBPROFILE_CLASSIFICAION_STATE,
  SET_ITEM_CLASSIFICAION_STATE
} from '../actionType';

const initialState = {
  groupInformation: {
    informationBasic: {
      groupName: '',
      groupNameVerification: false,
      groupDescription: '',
      groupPicture: '',
      groupPictureVerification: false
    }
  },
  assesseeGroup: {
    informationBasic: {
      assesseeGroupName: '',
      assesseeGroupNameVerification: false,
      assesseeGroupDescription: '',
      assesseeGroupPicture: '',
      assesseeGroupPictureVerification: false
    },
    informationAllocation: {
      assesseeGroupManager: {
        assesseeGroupManagerPrimary: []
      },
      assesseeGroupNode: {
        assesseeGroupNodePrimary: [],
        assesseeGroupNodeSecondary: []
      },
      assesseeGroupType: {
        assesseeGroupTypePrimary: []
      }
    },
    informationSetup: {
      assesseeGroupClassification: {
        assesseeGroupClassificationPrimary: '',
        // assesseeGroupClassificationSecondary: ''
      }
    }
  },
  assessmentGroup: {
    informationBasic: {
      assessmentGroupName: '',
      assessmentGroupNameVerification: false,
      assessmentGroupDescription: '',
      assessmentGroupPicture: '',
      assessmentGroupPictureVerification: false
    },
    informationAllocation: {
      assessmentGroupManager: {
        assessmentGroupManagerPrimary: ['60ab6eea45fbc840ff3f4140']
      },
      assessmentGroupNode: {
        assessmentGroupNodePrimary: [],
        assessmentGroupNodeSecondary: []
      },
      assessmentGroupType: {
        assessmentGroupTypePrimary: []
      }
    },
    informationSetup: {
      assessmentGroupClassification: {
        assessmentGroupClassificationPrimary: '',
        // assessmentGroupClassificationSecondary: ''
      }
    }
  },
  assignmentGroup: {
    informationBasic: {
      assignmentGroupName: '',
      assignmentGroupNameVerification: false,
      assignmentGroupDescription: '',
      assignmentGroupPicture: '',
      assignmentGroupPictureVerification: false
    },
    informationAllocation: {
      assignmentGroupManager: {
        assignmentGroupManagerPrimary: ['60ab6eea45fbc840ff3f4140']
      },
      assignmentGroupNode: {
        assignmentGroupNodePrimary: [],
        assignmentGroupNodeSecondary: []
      },
      assignmentGroupType: {
        assignmentGroupTypePrimary: []
      }
    },
    informationSetup: {
      assignmentGroupClassification: {
        assignmentGroupClassificationPrimary: '',
        // assignmentGroupClassificationSecondary: ''
      }
    }
  },
  associateGroup: {
    informationBasic: {
      associateGroupName: '',
      associateGroupNameVerification: false,
      associateGroupDescription: '',
      associateGroupPicture: '',
      associateGroupPictureVerification: false
    },
    informationAllocation: {
      associateGroupManager: {
        associateGroupManagerPrimary: []
      },
      associateGroupNode: {
        associateGroupNodePrimary: [],
        associateGroupNodeSecondary: []
      },
      associateGroupType: {
        associateGroupTypePrimary: []
      }
    },
    informationSetup: {
      associateGroupClassification: {
        associateGroupClassificationPrimary: '',
        // associateGroupClassificationSecondary: ''
      }
    }
  },
  itemGroup: {
    informationBasic: {
      itemGroupName: '',
      itemGroupNameVerification: false,
      itemGroupDescription: '',
      itemGroupPicture: '',
      itemGroupPictureVerification: false
    },
    informationAllocation: {
      itemGroupManager: {
        itemGroupManagerPrimary: []
      },
      itemGroupNode: {
        itemGroupNodePrimary: [],
        itemGroupNodeSecondary: []
      },
      itemGroupType: {
        itemGroupTypePrimary: []
      }
    },
    informationSetup: {
      itemGroupClassification: {
        itemGroupClassificationPrimary: '',
        // itemGroupClassificationSecondary: ''
      }
    }
  },
  cultureProfileGroup: {
    informationBasic: {
      cultureProfileGroupName: '',
      cultureProfileGroupNameVerification: false,
      cultureProfileGroupDescription: '',
      cultureProfileGroupPicture: '',
      cultureProfileGroupPictureVerification: false
    },
    informationAllocation: {
      cultureProfileGroupManager: {
        cultureProfileGroupManagerPrimary: []
      },
      cultureProfileGroupNode: {
        cultureProfileGroupNodePrimary: [],
        cultureProfileGroupNodeSecondary: []
      },
      cultureProfileGroupType: {
        cultureProfileGroupTypePrimary: []
      }
    },
    informationSetup: {
      cultureProfileGroupClassification: {
        cultureProfileGroupClassificationPrimary: '',
      }
    }
  },
  jobProfileGroup: {
    informationBasic: {
      jobProfileGroupName: '',
      jobProfileGroupNameVerification: false,
      jobProfileGroupDescription: '',
      jobProfileGroupPicture: '',
      jobProfileGroupPictureVerification: false
    },
    informationAllocation: {
      jobProfileGroupManager: {
        jobProfileGroupManagerPrimary: []
      },
      jobProfileGroupNode: {
        jobProfileGroupNodePrimary: [],
        jobProfileGroupNodeSecondary: []
      },
      jobProfileGroupType: {
        jobProfileGroupTypePrimary: []
      }
    },
    informationSetup: {
      jobProfileGroupClassification: {
        jobProfileGroupClassificationPrimary: '',
        // jobProfileGroupClassificationSecondary: ''
      }
    }
  }
};

const GroupCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  // console.log(action);
  switch (action.type) {
    case SET_ASSESSEE_GROUP_REDUCER_STATE:
      return {
        ...istate,
        assesseeGroup: {
          ...istate.assesseeGroup,
          informationBasic: action.payload
        }
      };
    case SET_ASSESSMENT_GROUP_REDUCER_STATE:
      return {
        ...istate,
        assessmentGroup: {
          ...istate.assessmentGroup,
          informationBasic: action.payload
        }
      };
    case SET_ASSIGNMEMT_GROUP_REDUCER_STATE:
      return {
        ...istate,
        assignmentGroup: {
          ...istate.assignmentGroup,
          informationBasic: action.payload
        }
      };
    case SET_ASSOCIATE_GROUP_REDUCER_STATE:
      return {
        ...istate,
        associateGroup: {
          ...istate.associateGroup,
          informationBasic: action.payload
        }
      };
    case SET_ITEM_GROUP_REDUCER_STATE:
      return {
        ...istate,
        itemGroup: {
          ...istate.itemGroup,
          informationBasic: action.payload
        }
      };
    case SET_CULTURE_GROUP_REDUCER_STATE:
      return {
        ...istate,
        cultureProfileGroup: {
          ...istate.cultureProfileGroup,
          informationBasic: action.payload
        }
      };
    case SET_JOB_GROUP_REDUCER_STATE:
      return {
        ...istate,
        jobProfileGroup: {
          ...istate.jobProfileGroup,
          informationBasic: action.payload
        }
      };
    case SET_GROUP_ALLOCATION_STATE:
      return {
        ...istate,
        [action.payload.objectName]: {
          ...istate[action.payload.objectName],
          informationAllocation: {
            ...istate[action.payload.objectName].informationAllocation,
            [action.payload.stateName]: {
              ...istate[action.payload.objectName].informationAllocation[action.payload.stateName],
              [action.payload.actualStateName]: action.payload.value
            }
          }
        }
      };
    case SET_GROUP_SETUP_STATE:
      return {
        ...istate,
        [action.payload.objectName]: {
          ...istate[action.payload.objectName],
          informationSetup: {
            ...istate[action.payload.objectName].informationSetup,
            [action.payload.stateName]: {
              ...istate[action.payload.objectName].informationSetup[action.payload.stateName],
              [action.payload.actualStateName]: action.payload.value
            }
          }
        }
      };
    case SET_ASSESSEE_CLASSIFICAION_STATE:
      return {
        ...istate,
        assesseeGroup: {
          ...istate.assesseeGroup,
          informationSetup: {
            ...istate.assesseeGroup.informationSetup,
            assesseeGroupClassification: action.payload
          }
        }
      };
    case SET_ASSESSMENT_CLASSIFICAION_STATE:
      return {
        ...istate,
        assessmentGroup: {
          ...istate.assessmentGroup,
          informationSetup: {
            ...istate.assessmentGroup.informationSetup,
            assessmentGroupClassification: action.payload
          }
        }
      };
    case SET_ASSIGNMENT_CLASSIFICAION_STATE:
      return {
        ...istate,
        assignmentGroup: {
          ...istate.assignmentGroup,
          informationSetup: {
            ...istate.assignmentGroup.informationSetup,
            assignmentGroupClassification: action.payload
          }
        }
      };
    case SET_ASSOCIATE_CLASSIFICAION_STATE:
      return {
        ...istate,
        associateGroup: {
          ...istate.associateGroup,
          informationSetup: {
            ...istate.associateGroup.informationSetup,
            associateGroupClassification: action.payload
          }
        }
      };
    case SET_CULTUREPROFILE_CLASSIFICAION_STATE:
      return {
        ...istate,
        cultureProfileGroup: {
          ...istate.cultureProfileGroup,
          informationSetup: {
            ...istate.cultureProfileGroup.informationSetup,
            cultureProfileGroupClassification: action.payload
          }
        }
      };
    case SET_JOBPROFILE_CLASSIFICAION_STATE:
      return {
        ...istate,
        jobProfileGroup: {
          ...istate.jobProfileGroup,
          informationSetup: {
            ...istate.jobProfileGroup.informationSetup,
            jobProfileGroupClassification: action.payload
          }
        }
      };
    case SET_ITEM_CLASSIFICAION_STATE:
      return {
        ...istate,
        itemGroup: {
          ...istate.itemGroup,
          informationSetup: {
            ...istate.itemGroup.informationSetup,
            itemGroupClassification: action.payload
          }
        }
      };
    case CLEAR_GROUP_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default GroupCreateReducer;
