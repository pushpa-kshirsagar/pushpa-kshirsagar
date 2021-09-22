import {
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  CLEAR_ROLE_REDUCER_STATE,
  SET_ROLE_DYNAMIC_STATE,
  SET_SETUP_PERMISSION,
  SET_ROLE_REDUCER_STATE,
  SET_ASSESSEE_ROLE_CLASSIFICAION_STATE,
  SET_ASSOCIATE_ROLE_CLASSIFICAION_STATE
} from '../actionType';

const initialState = {
  assesseeRole: {
    informationBasic: {
      assesseeRoleName: '',
      assesseeRoleNameVerification: false,
      assesseeRoleDescription: '',
      assesseeRolePicture: '',
      assesseeRolePictureVerification: false
    },
    informationAllocation: {
      assesseeRoleGroup: []
    },
    informationSetup: {
      assesseeRolePermission: {
        assesseeAssesseeDistinctPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'all'
        },
        assesseeAssesseeGroupPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssesseeManagerPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssesseeRolePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssesseeTypePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentDistinctPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentGroupPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentManagerPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentTypePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentDistinctPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentGroupPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentManagerPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentReportPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentTypePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateDistinctPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateGroupPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateManagerPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateNodePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateRolePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateTypePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticDistinctPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticGroupPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticManagerPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticTypePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeItemDistinctPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeItemGroupPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeItemManagerPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        },
        assesseeItemTypePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false,
          assesseePermissionInformation: 'key'
        }
      },
      assesseeRoleClassification: {
        assesseeRoleClassificationPrimary: [],
        assesseeRoleClassificationSecondary: []
      }
    }
  },
  associateRole: {
    informationBasic: {
      associateRoleName: '',
      associateRoleNameVerification: false,
      associateRoleDescription: '',
      associateRolePicture: '',
      associateRolePictureVerification: false
    },
    informationAllocation: {
      associateRoleGroup: []
    },
    informationSetup: {
      associateRolePermission: {
        associateAssesseePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false
        },
        associateAssessmentPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false
        },
        associateAssignmentPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false
        },
        associateAssociatePermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false
        },
        associateiGuruAnalyticPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false
        },
        associateItemPermission: {
          create: false,
          delete: false,
          review: false,
          revise: false,
          share: false
        }
      },
      associateRoleClassification: {
        associateRoleClassificationPrimary: [],
        associateRoleClassificationSecondary: []
      }
    }
  }
};

const RoleCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case SET_ASSESSEE_ROLE_REDUCER_STATE:
      return {
        ...istate,
        assesseeRole: {
          ...istate.assesseeRole,
          informationBasic: action.payload
        }
      };
    case SET_ASSOCIATE_ROLE_REDUCER_STATE:
      return {
        ...istate,
        associateRole: {
          ...istate.associateRole,
          informationBasic: action.payload
        }
      };
    case SET_ROLE_REDUCER_STATE:
      return {
        ...istate,
        [action.payload.objectName]: {
          ...istate[action.payload.objectName],
          [action.payload.stateName]: action.payload.value
        }
      };
    case SET_SETUP_PERMISSION:
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
    case SET_ROLE_DYNAMIC_STATE:
      return {
        ...istate,
        [action.payload.objectName]: {
          ...istate[action.payload.objectName],
          [action.payload.stateName]: {
            ...istate[action.payload.objectName][action.payload.stateName],
            [action.payload.actualStateName]: action.payload.value
          }
        }
      };
    case SET_ASSESSEE_ROLE_CLASSIFICAION_STATE:
      return {
        ...istate,
        assesseeRole: {
          ...istate.assesseeRole,
          informationSetup: {
            ...istate.assesseeRole.informationSetup,
            assesseeRoleClassification: action.payload
          }
        }
      };
    case SET_ASSOCIATE_ROLE_CLASSIFICAION_STATE:
      return {
        ...istate,
        associateRole: {
          ...istate.associateRole,
          informationSetup: {
            ...istate.associateRole.informationSetup,
            associateRoleClassification: action.payload
          }
        }
      };
    case CLEAR_ROLE_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default RoleCreateReducer;
