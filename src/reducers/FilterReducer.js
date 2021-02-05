import { FILTERMODE } from '../actionType';

const initialState = {
  FilterModeEnable: true,
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

    default:
      return istate;
  }
};

export default FilterReducer;
