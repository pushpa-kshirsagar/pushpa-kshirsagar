import { SET_TYPE_REDUCER_STATE, CLEAR_TYPE_REDUCER_STATE } from '../actionType';

const initialState = {
  typeInformation: {
    informationBasic: {
      typeName: '',
      typeNameVerification: false,
      typeDescription: '',
      typePicture: '',
      typePictureVerification: false
    }
  }
};

const TypeCreateReducer = (istate = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_TYPE_REDUCER_STATE:
      return {
        ...istate,
        typeInformation: {
          ...istate.typeInformation,
          informationBasic: action.payload
        }
      };
    case CLEAR_TYPE_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default TypeCreateReducer;
