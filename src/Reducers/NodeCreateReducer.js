import { SET_NODE_REDUCER_STATE, CLEAR_NODE_REDUCER_STATE } from '../actionType';

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
        associateNodeAscendantPrimary: '608bab71a8eac62ab2de85db',
        associateNodeAscendantSecondary: []
      }
    }
  }
};

const NodeCreateReducer = (istate = initialState, action) => {
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
    case CLEAR_NODE_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default NodeCreateReducer;
