import { SET_SCALE_REDUCER_STATE, CLEAR_SCALE_REDUCER_STATE } from '../actionType';
const initialState = {
  scaleInformation: {
    assessmentScaleOneName: '',
    assessmentScaleOneDescription: '',
    assessmentScaleOneScore: '',
    assessmentScaleOneWeightage: ''
  }
};

const ScaleCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  switch (action.type) {
    case SET_SCALE_REDUCER_STATE:
      return {
        ...istate,
        scaleInformation: action.payload
      };
    case CLEAR_SCALE_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default ScaleCreateReducer;
