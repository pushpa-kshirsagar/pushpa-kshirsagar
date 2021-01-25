import { POPUP_CLOSE, POPUP_OPEN } from '../actionType';

const initialState = {
  isPopUpOpen: false,
  isPopUpValue: ''
};

const popUpReducer = (istate = initialState, action) => {
  switch (action.type) {
    case POPUP_OPEN:
      return {
        ...istate,
        isPopUpOpen: true,
        isPopUpValue: action.payload
      };
    case POPUP_CLOSE:
      return {
        isPopUpOpen: false
      };
    default:
      return istate;
  }
};

export default popUpReducer;
