import {
  SET_TYPE_REDUCER_STATE,
  CLEAR_ITEM_REDUCER_STATE,
  SET_ITEM_DYNAMIC_SINGLE_STATE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  ADD_ITEM_OPTION_OBJECT,
  REMOVE_ITEM_OPTION_OBJECT,
  SET_ITEM_FRAMWORK_TYPE,
} from '../actionType';

const optionLabel =
  "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
const responseChoiceDescription =
  "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>description</span>&nbsp;";
const itemLabel = '<span>item</span>&nbsp';
const itemLabelText =
  "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
const itemDescription =
  "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>description</span>&nbsp;";
const responseDescription =
  "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>description</span>&nbsp;";

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
    },
    informationFramework: {
      itemFrameworkOne: {
        itemFrameworkOneAlignment: '',
        itemFrameworkOneClassification: [
          {
            itemGroupClassificationLabel: '',
            itemGroupClassificationPolarity: ''
          }
        ],
        itemFrameworkOneBlank: '',
        itemFrameworkOneExplanation: {
          itemFrameworkOneExplanationDisplay: false,
          itemFrameworkOneExplanation: ''
        }, //itemDescription,
        itemFrameworkOneLabel: { itemFrameworkOneLabelDisplay: false, itemFrameworkOneLabel: '' },
        itemFrameworkOneGroup: [],
        itemFrameworkOneMedia: '', //itemLabel,
        itemFrameworkOnePolarity: '',
        itemFrameworkOneResponse: '',
        itemFrameworkOneResponseAlignment: '',
        itemFrameworkOneResponseAttachment: '',
        itemFrameworkOneResponseCorrect: [],
        itemFrameworkOneResponseChoice: [
          {
            itemFrameworkOneResponseChoice: '1',
            itemFrameworkOneResponseChoiceColumnMatch: '',
            itemFrameworkOneResponseChoiceExplanation: {
              itemFrameworkOneReponseChoiceExplanation: '',
              itemFrameworkOneReponseChoiceExplanationDisplay: false
            }, //responseChoiceDescription,
            itemFrameworkOneResponseChoiceMedia: '', //optionLabel,
            itemFrameworkOneResponseChoiceWeightage: '',
            itemFrameworkOneResponseChoiceScore: '',
            itemFrameworkOneResponseChoicePolarity: ''
          },
          {
            itemFrameworkOneResponseChoice: '2',
            itemFrameworkOneResponseChoiceColumnMatch: '',
            itemFrameworkOneResponseChoiceExplanation: {
              itemFrameworkOneReponseChoiceExplanation: '',
              itemFrameworkOneReponseChoiceExplanationDisplay: false
            }, //responseChoiceDescription,
            itemFrameworkOneResponseChoiceMedia: '', //optionLabel,
            itemFrameworkOneResponseChoiceWeightage: '',
            itemFrameworkOneResponseChoiceScore: '',
            itemFrameworkOneResponseChoicePolarity: ''
          },
          {
            itemFrameworkOneResponseChoice: '3',
            itemFrameworkOneResponseChoiceColumnMatch: '',
            itemFrameworkOneResponseChoiceExplanation: {
              itemFrameworkOneReponseChoiceExplanation: '',
              itemFrameworkOneReponseChoiceExplanationDisplay: false
            }, //responseChoiceDescription,
            itemFrameworkOneResponseChoiceMedia: '', //optionLabel,
            itemFrameworkOneResponseChoiceWeightage: '',
            itemFrameworkOneResponseChoiceScore: '',
            itemFrameworkOneResponseChoicePolarity: ''
          },
          {
            itemFrameworkOneResponseChoice: '4',
            itemFrameworkOneResponseChoiceColumnMatch: '',
            itemFrameworkOneResponseChoiceExplanation: {
              itemFrameworkOneReponseChoiceExplanation: '',
              itemFrameworkOneReponseChoiceExplanationDisplay: false
            }, //responseChoiceDescription,
            itemFrameworkOneResponseChoiceMedia: '', //optionLabel,
            itemFrameworkOneResponseChoiceWeightage: '',
            itemFrameworkOneResponseChoiceScore: '',
            itemFrameworkOneResponseChoicePolarity: ''
          }
        ],
        itemFrameworkOneResponseLabel: {
          itemFrameworkOneReponseLabelDisplay: false,
          itemFrameworkOneReponseLabel: ''
        },
        itemFrameworkOneResponseExplanation: {
          itemFrameworkOneReponseExplanationDisplay: false,
          itemFrameworkOneReponseExplanation: ''
        }, //responseDescription,
        itemFrameworkOneScale: [
          {
            itemGroupScaleLabel: '',
            itemGroupScaleScore: '',
            itemGroupScaleWeightage: ''
          }
        ],
        itemFrameworkOneScore: '',
        itemFrameworkOneSection: [],
        itemFrameworkOneSequence: '',
        itemFrameworkOneTime: '',
        itemFrameworkOneType: '',
        itemFrameworkOneWord: {
          itemFrameworkOneWordMaximum: '',
          itemFrameworkOneWordMinimum: ''
        },
        itemFrameworkOneWeightage: ''
      },
      itemTypeList: []
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
    case SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE:
      return {
        ...istate,
        itemInformation: {
          ...istate.itemInformation,
          informationFramework: {
            ...istate.itemInformation.informationFramework,
            itemFrameworkOne: {
              ...istate.itemInformation.informationFramework.itemFrameworkOne,
              [action.payload.stateName]: action.payload.value
            }
          }
        }
      };
    case SET_ITEM_FRAMWORK_TYPE:
      return {
        ...istate,
        itemInformation: {
          ...istate.itemInformation,
          informationFramework: {
            ...istate.itemInformation.informationFramework,
            itemTypeList: action.payload 
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
