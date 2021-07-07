import {
  SET_CULTURE_REDUCER_STATE,
  CLEAR_CULTURE_REDUCER_STATE,
  SET_CULTURE_DYNAMIC_SINGLE_STATE,
  SET_CULTURE_DIMENTION_STATE
} from '../actionType';

const initialState = {
  cultureProfileInformation: {
    informationBasic: {
      cultureProfileName: '',
      cultureProfileNameVerification: false,
      cultureProfileDescription: '',
      cultureProfilePicture: '',
      cultureProfilePictureVerification: false
    },
    informationAllocation: {
      cultureProfileGroup: {
        cultureProfileGroupPrimary: [],
        cultureProfileGroupSecondary: []
      },
      cultureProfileManager: {
        cultureProfileManagerPrimary: [],
        cultureProfileManagerSecondary: []
      },
      cultureProfileNode: {
        cultureProfileNodePrimary: [],
        cultureProfileNodeSecondary: []
      },
      cultureProfileType: {
        cultureProfileTypePrimary: [],
        cultureProfileTypeSecondary: []
      }
    },
    informationFramework: {
      cultureProfileCultureDimensionCore: [],
      cultureProfileCultureDimensionWeightage: [],
      cultureProfileCultureDimensionReviseWeightage: []
    }
  }
};

const ItemCreateReducer = (istate = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_CULTURE_REDUCER_STATE:
      return {
        ...istate,
        cultureProfileInformation: {
          ...istate.cultureProfileInformation,
          informationBasic: action.payload
        }
      };
    case SET_CULTURE_DIMENTION_STATE:
      return {
        ...istate,
        cultureProfileInformation: {
          ...istate.cultureProfileInformation,
          informationFramework: action.payload
        }
      };
    case SET_CULTURE_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        cultureProfileInformation: {
          ...istate.cultureProfileInformation,
          [action.payload.objectName]: {
            ...istate.cultureProfileInformation[action.payload.objectName],
            [action.payload.stateName]: {
              ...istate.cultureProfileInformation[action.payload.objectName][
                action.payload.stateName
              ],
              [action.payload.actualStateName]: action.payload.value
            }
          }
        }
      };
    case CLEAR_CULTURE_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default ItemCreateReducer;
