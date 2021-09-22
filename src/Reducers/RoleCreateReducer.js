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
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'all'
        },
        assesseeAssesseeGroupPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssesseeManagerPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssesseeRolePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssesseeTypePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentDistinctPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentGroupPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentManagerPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssessmentTypePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentDistinctPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentGroupPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentManagerPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentReportPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssignmentTypePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateDistinctPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateGroupPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateManagerPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateNodePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateRolePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeAssociateTypePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticDistinctPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticGroupPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticManagerPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeiGuruAnalyticTypePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeItemDistinctPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeItemGroupPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeItemManagerPermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        },
        assesseeItemTypePermission: {
          create: true,
          delete: true,
          review: true,
          revise: true,
          share: true,
          assesseePermissionInformation: 'key'
        }
      },
    
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
