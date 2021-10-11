import{SET_SCALE_REDUCER_STATE,CLEAR_SCALE_REDUCER_STATE} from '../actionType'
const initialState = {
  scaleInformation: {
    informationBasic: {
      assessmentScaleName: "",
      assessmentScaleNameVerification: false,
      assessmentScaleDescription: "",
      assessmentScalePicture: "",
      assessmentScalePictureVerification: false,
      assessmentScaleFlag: false,
      assessmentScaleReference: "",
    },
  },
};

const ScaleCreateReducer = (
  istate = JSON.parse(JSON.stringify(initialState)),
  action
) => {
  switch (action.type) {
    case SET_SCALE_REDUCER_STATE:
      return {
        ...istate,
        scaleInformation: {
          ...istate.scaleInformation,
          informationBasic: action.payload,
        },
      };
    case CLEAR_SCALE_REDUCER_STATE:
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default ScaleCreateReducer;
