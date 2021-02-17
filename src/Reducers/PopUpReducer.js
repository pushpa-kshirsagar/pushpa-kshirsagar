import {
  POPUP_CLOSE,
  POPUP_OPEN,
  ASSESSEE_SIGN_ON,
  ASSOCIATE_SIGN_ON,
  SET_NEXT_POPUP,
  PREVIOUS_POPUP,
  SET_POPUP_STATE,
  SET_GRID_COLUMN_COUNT_VALUE
} from '../actionType';

const initialState = {
  isPopUpOpen: false,
  isPopUpValue: '',
  prevPopUpValue: '',
  popupMode: '',
  popupHeaderOne: '',
  popupHeaderOneDuplicate: '',
  popupHeaderOneBadgeOne: '',
  popupHeaderOneBadgeOneDuplicate: '',
  popupContentArrValue: '',
  isSecondaryPopup: false,
  gridColumnCountValue: 0
};

const PopUpReducer = (istate = initialState, action) => {
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
        ...istate,
        isPopUpOpen: false,
        isPopUpValue: '',
        popupMode: '',
        popupContentArrValue: ''
      };
    case ASSESSEE_SIGN_ON:
      return {
        isPopUpOpen: true,
        isPopUpValue: action.payload.isPopUpValue,
        popupMode: action.payload.popupMode
      };
    case ASSOCIATE_SIGN_ON:
      return {
        ...istate,
        isPopUpOpen: true,
        isPopUpValue: action.payload.isPopUpValue,
        popupMode: action.payload.popupMode
      };
    case SET_NEXT_POPUP:
      return {
        ...istate,
        isPopUpValue: action.payload.isPopUpValue
      };
    case PREVIOUS_POPUP:
      return {
        ...istate,
        prevPopUpValue: action.payload.prevPopUpValue
      };
    case SET_POPUP_STATE:
      return {
        ...istate,
        isPopUpValue: action.payload.isPopUpValue,
        isSecondaryPopup: action.payload.isSecondaryPopup,
        popupContentArrValue: action.payload.popupContentArrValue,
        popupHeaderOne: action.payload.popupHeaderOne,
        popupHeaderOneDuplicate: action.payload.popupHeaderOneDuplicate,
        popupHeaderOneBadgeOne: action.payload.popupHeaderOneBadgeOne
      };
    case SET_GRID_COLUMN_COUNT_VALUE:
      return {
        ...istate,
        gridColumnCountValue: action.payload
      };

    default:
      return istate;
  }
};

export default PopUpReducer;
