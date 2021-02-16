import { FILTERMODE, NAVIGATOR_MODE } from '../actionType';

const initialState = {
  FilterModeEnable: true,
  navigatorIcon: true,
  FilterMode: ''
};

const FilterReducer = (istate = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case FILTERMODE:
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
