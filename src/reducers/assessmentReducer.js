import { SET_DISPLAY_PANE_FOUR_SHOW } from '../actionType';

const initialState = {
  isDisplayPaneFourShow: true
};

const assessmentReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_PANE_FOUR_SHOW:
      return {
        isDisplayPaneFourShow: action.payload
      };
    default:
      return istate;
  }
};

export default assessmentReducer;
