import {
  POPUP_CLOSE,
  POPUP_OPEN,
  ASSESSEE_SIGN_ON,
  ASSOCIATE_SIGN_ON,
  SET_NEXT_POPUP,
  PREVIOUS_POPUP,
  SET_POPUP_STATE,
  SET_GRID_COLUMN_COUNT_VALUE,
  SET_SECONDARY_OPTION_VALUE
} from '../actionType';

const initialState = {
  isPopUpOpen: false,
  isPopUpValue: '',
  prevPopUpValue: '',
  popupMode: '',
  popupHeaderOne: '',
  popupHeaderOneBadgeOne: '',
  popupContentArrValue: '',
  popupOpenType: '',
  gridColumnCountValue: 0,
  secondaryOptionCheckValue: ''
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
        popupOpenType: action.payload.popupOpenType,
        popupContentArrValue: action.payload.popupContentArrValue,
        popupHeaderOne: action.payload.popupHeaderOne,
        popupHeaderOneBadgeOne: action.payload.popupHeaderOneBadgeOne,
        secondaryOptionCheckValue: action.payload.secondaryOptionCheckValue
      };
    case SET_GRID_COLUMN_COUNT_VALUE:
      return {
        ...istate,
        gridColumnCountValue: action.payload
      };
    case SET_SECONDARY_OPTION_VALUE:
      return {
        ...istate,
        secondaryOptionCheckValue: action.payload
      };

    default:
      return istate;
  }
};

export default PopUpReducer;
