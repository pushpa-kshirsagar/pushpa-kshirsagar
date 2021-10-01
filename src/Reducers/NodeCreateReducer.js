import {
  SET_NODE_REDUCER_STATE,
  CLEAR_NODE_REDUCER_STATE,
  SET_NODE_DYNAMIC_SINGLE_STATE,
  SET_ASSOCIATE_NODE_CLASSIFICAION_STATE,
  SET_ASSOCIATE_NODE_PARENT_STATE
} from '../actionType';

const initialState = {
  nodeInformation: {
    informationBasic: {
      associateNodeName: '',
      associateNodeNameVerification: false,
      associateNodeDescription: '',
      associateNodePicture: '',
      associateNodePictureVerification: false,
      associateNodeFlag: false,
      associateNodeReference: ''
    },
    informationAllocation: {
      associateNodeManager: {
        associateNodeManagerPrimary: [],
        associateNodeManagerSecondary: []
      }
    },
    informationFramework: {
      associateNodeAscendantPrimary: ''
    },
    informationSetup: {
      associateNodeClassification: {
        associateNodeClassificationPrimary: ''
      }
    }
  }
};

const NodeCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_NODE_REDUCER_STATE:
      return {
        ...istate,
        nodeInformation: {
          ...istate.nodeInformation,
          informationBasic: action.payload
        }
      };
    case SET_NODE_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        nodeInformation: {
          ...istate.nodeInformation,
          [action.payload.objectName]: {
            ...istate.nodeInformation[action.payload.objectName],
            [action.payload.stateName]: {
              ...istate.nodeInformation[action.payload.objectName][action.payload.stateName],
              [action.payload.actualStateName]: action.payload.value
            }
          }
        }
      };
    case SET_ASSOCIATE_NODE_CLASSIFICAION_STATE:
      return {
        ...istate,
        nodeInformation: {
          ...istate.nodeInformation,
          informationSetup: {
            ...istate.nodeInformation.informationSetup,
            associateNodeClassification: action.payload
          }
        }
      };
    case SET_ASSOCIATE_NODE_PARENT_STATE:
      return {
        ...istate,
        nodeInformation: {
          ...istate.nodeInformation,
          informationFramework: {
            ...istate.nodeInformation.informationFramework,
            associateNodeAscendantPrimary: action.payload
          }
        }
      };
    case CLEAR_NODE_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default NodeCreateReducer;
