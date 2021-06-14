import {
  CLEAR_GROUP_REDUCER_STATE,
  SET_ASSESSEE_GROUP_REDUCER_STATE,
  SET_ASSESSMENT_GROUP_REDUCER_STATE,
  SET_ASSIGNMEMT_GROUP_REDUCER_STATE,
  SET_ASSOCIATE_GROUP_REDUCER_STATE,
  SET_CULTURE_GROUP_REDUCER_STATE,
  SET_ITEM_GROUP_REDUCER_STATE,
  SET_JOB_GROUP_REDUCER_STATE
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
        assesseeGroupManagerPrimary: ['607d9470248db70ca6fe4e7a']
      },
      assesseeGroupNode: {
        assesseeGroupNodeSecondary: []
      },
      assesseeGroupType: {
        assesseeGroupTypePrimary: []
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
        assessmentGroupManagerPrimary: ['607d9470248db70ca6fe4e7a']
      },
      assessmentGroupNode: {
        assessmentGroupNodeSecondary: []
      },
      assessmentGroupType: {
        assessmentGroupTypePrimary: []
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
        assignmentGroupManagerPrimary: ['607d9470248db70ca6fe4e7a']
      },
      assignmentGroupNode: {
        assignmentGroupNodeSecondary: []
      },
      assignmentGroupType: {
        assignmentGroupTypePrimary: []
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
        associateGroupManagerPrimary: ['607d9470248db70ca6fe4e7a']
      },
      associateGroupNode: {
        associateGroupNodeSecondary: []
      },
      associateGroupType: {
        associateGroupTypePrimary: []
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
        itemGroupManagerPrimary: ['607d9470248db70ca6fe4e7a']
      },
      itemGroupNode: {
        itemGroupNodeSecondary: []
      },
      itemGroupType: {
        itemGroupTypePrimary: []
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
        cultureProfileGroupManagerPrimary: ['607d9470248db70ca6fe4e7a']
      },
      cultureProfileGroupNode: {
        cultureProfileGroupNodeSecondary: []
      },
      cultureProfileGroupType: {
        cultureProfileGroupTypePrimary: []
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
        jobProfileGroupManagerPrimary: ['607d9470248db70ca6fe4e7a']
      },
      jobProfileGroupNode: {
        jobProfileGroupNodeSecondary: []
      },
      jobProfileGroupType: {
        jobProfileGroupTypePrimary: []
      }
    }
  }
};

const GroupCreateReducer = (istate = initialState, action) => {
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
    case CLEAR_GROUP_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default GroupCreateReducer;
