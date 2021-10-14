import { SET_CLUSTER_REDUCER_STATE, CLEAR_CLUSTER_REDUCER_STATE } from '../actionType';
const initialState = {
  clusterInformation: {
    assessmentClusterOneName: '',
    assessmentClusterOneDescription: '',
    assessmentClusterOneSequence: null,
    assessmentClusterOneOneLabel: '',
    assessmentClusterOneOneDescription: '',
    assessmentClusterOneOneExplanation: '',
    assessmentClusterOneOnePolarity: '',
    assessmentClusterOneTwoLabel: '',
    assessmentClusterOneTwoDescription: '',
    assessmentClusterOneTwoExplanation: '',
    assessmentClusterOneTwoPolarity: ''
  }
};

const ClusterReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case SET_CLUSTER_REDUCER_STATE:
      return {
        ...istate,
        clusterInformation: action.payload
      };
    case CLEAR_CLUSTER_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default ClusterReducer;
