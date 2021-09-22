import {
  SET_NODE_REDUCER_STATE,
  CLEAR_NODE_REDUCER_STATE,
  SET_NODE_DYNAMIC_SINGLE_STATE
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
    informationEngagement: {
      associateNodeStatus: '',
      associateNodeTag: {
        associateNodeTagPrimary: '',
        associateNodeTagSecondary: ''
      },
      associateNodeTenure: {
        associateNodeTenureDateTimeStart: '',
        associateNodeTenureDateTimeEnd: ''
      }
    },
    informationFramework: {
      associateNodeAscendant: {
        associateNodeAscendantPrimary: [],
        associateNodeAscendantSecondary: []
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
        nodeInformation:{
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
    case CLEAR_NODE_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default NodeCreateReducer;
