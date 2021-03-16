import {
  SECTION_POPUP_OPEN,
  SECTION_POPUP_CLOSE,
  SET_SECTION_HEADER_ONE,
  CLEAR_IGAUGE_REDUCER,
  SET_SECTION_HEADER_ONE_BADGE_ONE,
  SET_SECTION_TWO_SECONDARY_OPTION_VALUE,
  SET_PREVIOUS_SECTION_POPUP
} from '../actionType';
import { GROUP_NODE_ROLE_TYPE_POPUP_OPTION } from '../PopUpConfig';

const initialState = {
  sectionHeaderOne: '',
  sectionHeaderOneBadgeOne: '',
  sectionPopUpActive: false,
  currentPopUpOption: GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
  sectionPopUpType: 'primary',
  secondaryOptionCheckValue: ''
};

const IgaugeReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SECTION_POPUP_OPEN:
      return {
        ...istate,
        sectionPopUpActive: true,
        sectionHeaderOne: action.payload.headerOne,
        sectionHeaderOneBadgeOne: action.payload.headerOneBadgeOne
      };
    case SET_PREVIOUS_SECTION_POPUP:
      return {
        ...istate,
        sectionPopUpActive: true
      };
    case SECTION_POPUP_CLOSE:
      return {
        ...istate,
        sectionPopUpActive: false,
        secondaryOptionCheckValue: '',
        currentPopUpOption: GROUP_NODE_ROLE_TYPE_POPUP_OPTION
      };
    case SET_SECTION_HEADER_ONE:
      return {
        ...istate,
        sectionHeaderOne: action.payload
      };
    case SET_SECTION_HEADER_ONE_BADGE_ONE:
      return {
        ...istate,
        sectionHeaderOneBadgeOne: action.payload
      };
    case SET_SECTION_TWO_SECONDARY_OPTION_VALUE:
      if (action.payload === '') {
        return {
          ...istate,
          secondaryOptionCheckValue: action.payload,
          currentPopUpOption: GROUP_NODE_ROLE_TYPE_POPUP_OPTION
        };
      } else {
        let tempArr = [];
        GROUP_NODE_ROLE_TYPE_POPUP_OPTION.forEach((element) => {
          tempArr.push({ ...element, disabled: false });
        });
        return {
          ...istate,
          secondaryOptionCheckValue: action.payload,
          currentPopUpOption: tempArr
        };
      }
    case CLEAR_IGAUGE_REDUCER:
      return initialState;
    default:
      return istate;
  }
};

export default IgaugeReducer;
