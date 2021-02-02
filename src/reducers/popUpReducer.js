import {
  POPUP_CLOSE,
  POPUP_OPEN,
  ASSESSEE_SIGN_ON,
  ASSOCIATE_SIGN_ON,
  SET_NEXT_POPUP
} from '../actionType';

const initialState = {
  isPopUpOpen: false,
  isPopUpValue: '',
  popupMode: ''
};

const popUpReducer = (istate = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case POPUP_OPEN:
      return {
        ...istate,
        isPopUpOpen: true,
        isPopUpValue: action.payload
      };
    case POPUP_CLOSE:
      return {
        isPopUpOpen: false,
        isPopUpValue: '',
        popupMode: ''
      };
    case ASSESSEE_SIGN_ON:
      return {
        isPopUpOpen: true,
        isPopUpValue: action.payload.isPopUpValue,
        popupMode: action.payload.popupMode
      };
    case ASSOCIATE_SIGN_ON:
      return {
        isPopUpOpen: true,
        isPopUpValue: action.payload.isPopUpValue,
        popupMode: action.payload.popupMode
      };
    case SET_NEXT_POPUP:
      return {
        ...istate,
        isPopUpValue: action.payload.isPopUpValue
      };

    default:
      return istate;
  }
};

export default popUpReducer;
