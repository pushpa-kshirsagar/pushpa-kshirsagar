import { SET_USER } from '../actionType';

const initialState = {
  userData: null
};

const userReducer = (istate = initialState, action) => {
  console.log('IN USER REDUCER====>', action);
  switch (action.type) {
    case SET_USER:
      return {
        userData: action.payload
      };
    default:
      return istate;
  }
};

export default userReducer;
