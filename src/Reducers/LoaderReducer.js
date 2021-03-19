import { LOADER_START, LOADER_STOP } from '../actionType';

const initialState = {
  isLoading: false
};

const LoaderReducer = (istate = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case LOADER_START:
      return {
        ...istate,
        isLoading: true
      };
    case LOADER_STOP:
      return {
        ...istate,
        isLoading: false
      };
    default:
      return istate;
  }
};

export default LoaderReducer;
