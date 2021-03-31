import { SET_DISPLAY_PANE_THREE_STATE, CLEAR_DISPLAY_PANE_THREE } from '../actionType';

const initialState = {
  isReviewRevise: false,
  headerOne: '',
  headerOneBadgeOne: '',
  headerOneBadgeTwo: '',
  HeaderBadgeThree: '',
  responseObject: {}
};

const DisplayPaneThreeReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_PANE_THREE_STATE:
      return {
        isReviewRevise: true,
        headerOne: action.payload.headerOne,
        headerOneBadgeOne: action.payload.headerOneBadgeOne,
        headerOneBadgeTwo: action.payload.headerOneBadgeTwo,
        headerOneBadgeThree: action.payload.headerOneBadgeThree,
        responseObject: action.payload.responseObject
      };
    case CLEAR_DISPLAY_PANE_THREE:
      return initialState;
    default:
      return istate;
  }
};

export default DisplayPaneThreeReducer;
