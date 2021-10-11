import { SET_CLUSTER_REDUCER_STATE,CLEAR_CLUSTER_REDUCER_STATE } from "../actionType";
const initialState = {
  clusterInformation: {
    informationBasic: {
      assessmentClusterName: "",
      assessmentClusterNameVerification: false,
      assessmentClusterDescription: "",
      assessmentClusterPicture: "",
      assessmentClusterPictureVerification: false,
      assessmentClusterFlag: false,
      assessmentClusterReference: "",
    },
  },
};

const ClusterReducer = (
  istate = JSON.parse(JSON.stringify(initialState)),
  action
) => {
  switch (action.type) {
    case SET_CLUSTER_REDUCER_STATE:
      return {
        ...istate,
        clusterInformation: {
          ...istate.clusterInformation,
          informationBasic: action.payload,
        },
      };
    case CLEAR_CLUSTER_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default ClusterReducer;
