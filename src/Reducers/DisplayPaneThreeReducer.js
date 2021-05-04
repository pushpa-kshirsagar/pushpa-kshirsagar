import {
  SET_DISPLAY_PANE_THREE_STATE,
  CLEAR_DISPLAY_PANE_THREE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_REVIEW_LIST_RELATE_DATA
} from '../actionType';

const initialState = {
  isReviewRevise: false,
  headerOne: '',
  headerOneBadgeOne: '',
  headerOneBadgeTwo: '',
  HeaderBadgeThree: '',
  responseObject: {},
  reviewMode: 'review',
  createMode: '',
  relatedReviewListPaneThree: [{}]
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
        responseObject: action.payload.responseObject,
        reviewMode: action.payload.reviewMode || 'review',
        createMode: action.payload.createMode || ''
      };
    case SET_DISPLAY_PANE_THREE_REVIEW_MODE:
      return {
        ...istate,
        reviewMode: action.payload
      };
    case SET_REVIEW_LIST_RELATE_DATA:
      return {
        ...istate,
        relatedReviewListPaneThree: action.payload
      };
    case CLEAR_DISPLAY_PANE_THREE:
      return initialState;
    default:
      return istate;
  }
};

export default DisplayPaneThreeReducer;
