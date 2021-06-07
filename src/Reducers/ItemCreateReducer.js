import {
  SET_TYPE_REDUCER_STATE,
  CLEAR_ITEM_REDUCER_STATE,
  SET_ITEM_DYNAMIC_SINGLE_STATE
} from '../actionType';

const initialState = {
  itemInformation: {
    informationBasic: {
      itemName: '',
      itemNameVerification: false,
      itemDescription: '',
      itemPicture: '',
      itemPictureVerification: false
    },
    informationAllocation: {
      itemGroup: {
        itemGroupPrimary: [],
        itemGroupSecondary: []
      },
      itemManager: {
        itemManagerPrimary: [],
        itemManagerSecondary: []
      },
      itemNode: {
        itemNodePrimary: [],
        itemNodeSecondary: []
      },
      itemType: {
        itemTypePrimary: [],
        itemTypeSecondary: []
      }
    }
  }
};

const ItemCreateReducer = (istate = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_TYPE_REDUCER_STATE:
      return {
        ...istate,
        itemInformation: {
          ...istate.itemInformation,
          informationBasic: action.payload
        }
      };
    case SET_ITEM_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        itemInformation: {
          ...istate.itemInformation,
          [action.payload.objectName]: {
            ...istate.itemInformation[action.payload.objectName],
            [action.payload.stateName]: {
              ...istate.itemInformation[action.payload.objectName][action.payload.stateName],
              [action.payload.actualStateName]: action.payload.value
            }
          }
        }
      };
    case CLEAR_ITEM_REDUCER_STATE:
      return initialState;
    default:
      return istate;
  }
};

export default ItemCreateReducer;
