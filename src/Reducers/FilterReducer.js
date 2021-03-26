import { FILTERMODE, NAVIGATOR_MODE, FILTERMODE_ENABLE } from '../actionType';

const initialState = {
  FilterModeEnable: true,
  navigatorIcon: true,
  FilterMode: ''
};

const FilterReducer = (istate = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case FILTERMODE:
      return {
        ...istate,
        FilterMode: action.payload.FilterMode,
        FilterModeEnable: true
      };
    case FILTERMODE_ENABLE:
      return {
        ...istate,
        FilterModeEnable: !istate.FilterModeEnable
      };
    case NAVIGATOR_MODE:
      return {
        ...istate,
        navigatorIcon: !istate.navigatorIcon
      };
    default:
      return istate;
  }
};

export default FilterReducer;
