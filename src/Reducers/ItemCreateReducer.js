import {
  SET_TYPE_REDUCER_STATE,
  CLEAR_ITEM_REDUCER_STATE,
  SET_ITEM_DYNAMIC_SINGLE_STATE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  ADD_ITEM_OPTION_OBJECT,
  REMOVE_ITEM_OPTION_OBJECT,
  SET_ITEM_FRAMWORK_TYPE,
  SET_ITEMFRAMEWORK_REDUCER_STATE,
  SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE,
  SET_ITEM_SINGLE_STATE
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
    // informationEngagement: {
    //   itemStatus: '',
    //   itemTag: { itemTagPrimary: '', itemTagSecondary: '' },
    //   itemTenure: { itemTenureDateTimeStart: '', itemTenureDateTimeEnd: '' }
    // },
    informationFramework: {
      itemFrameworkOne: {
        itemFrameworkOneAlignment: '',
        itemFrameworkOneCluster: [],
        itemFrameworkOneLevel: null,
        itemFrameworkOneBlank: '',
        itemFrameworkOneExplanation: {
          itemFrameworkOneExplanationDisplay: false,
          itemFrameworkOneExplanationMedia: null
        }, //itemDescription,
        itemFrameworkOneLabel: {
          itemFrameworkOneLabelDisplay: false,
          itemFrameworkOneLabelMedia: ''
        },
        itemFrameworkOneGroup: [],
        itemFrameworkOneMedia: null, //itemLabel,
        itemFrameworkOnePassage: {
          itemFrameworkOnePassageDisplay: false,
          itemFrameworkOnePassageMedia: null
        },
        itemFrameworkOnePolarity: '',
        itemFrameworkOneResponse: '',
        itemFrameworkOneResponseAlignment: '',
        itemFrameworkOneResponseAttachment: '',
        itemFrameworkOneResponseChoice: [],
        itemFrameworkOneResponseChoiceAlignment: '',
        itemFrameworkOneResponseCorrect: [],
        itemFrameworkOneResponseLabel: {
          itemFrameworkOneResponseLabelDisplay: false,
          itemFrameworkOneResponseLabelMedia: null
        },
        itemFrameworkOneResponseExplanation: {
          itemFrameworkOneResponseExplanationDisplay: false,
          itemFrameworkOneResponseExplanationMedia: null
        },
        itemFrameworkOneScale: [],
        itemFrameworkOneScore: null,
        itemFrameworkOneSection: [
          {
            itemFrameworkOneSectionSequence: 1,
            itemFrameworkOneSection: {
              itemFrameworkOneMedia: null,
              itemFrameworkOneExplanation: null,
              itemFrameworkOneScore: null,
              itemFrameworkOneType: '',
              itemFrameworkOneResponseChoice: [
                {
                  itemFrameworkOneResponseChoiceAlignment: '',
                  itemFrameworkOneResponseChoiceColumnMatch: '',
                  itemFrameworkOneResponseChoiceExplanation: {
                    itemFrameworkOneResponseChoiceExplanationMedia: null,
                    itemFrameworkOneResponseChoiceExplanationDisplay: false
                  },
                  itemFrameworkOneResponseChoiceMedia: '',
                  itemFrameworkOneResponseChoiceNumber: '1',
                  itemFrameworkOneResponseChoicePolarity: '',
                  itemFrameworkOneResponseChoiceScore: '',
                  itemFrameworkOneResponseChoiceWeightage: ''
                },
                {
                  itemFrameworkOneResponseChoiceAlignment: '',
                  itemFrameworkOneResponseChoiceColumnMatch: '',
                  itemFrameworkOneResponseChoiceExplanation: {
                    itemFrameworkOneResponseChoiceExplanationMedia: null,
                    itemFrameworkOneResponseChoiceExplanationDisplay: false
                  },
                  itemFrameworkOneResponseChoiceMedia: null, //optionLabel,
                  itemFrameworkOneResponseChoiceNumber: '2',
                  itemFrameworkOneResponseChoicePolarity: '',
                  itemFrameworkOneResponseChoiceScore: '',
                  itemFrameworkOneResponseChoiceWeightage: ''
                },
                {
                  itemFrameworkOneResponseChoiceAlignment: '',
                  itemFrameworkOneResponseChoiceColumnMatch: '',
                  itemFrameworkOneResponseChoiceExplanation: {
                    itemFrameworkOneResponseChoiceExplanationMedia: '',
                    itemFrameworkOneResponseChoiceExplanationDisplay: false
                  },
                  itemFrameworkOneResponseChoiceMedia: null, //optionLabel,
                  itemFrameworkOneResponseChoiceNumber: '3',
                  itemFrameworkOneResponseChoicePolarity: '',
                  itemFrameworkOneResponseChoiceScore: '',
                  itemFrameworkOneResponseChoiceWeightage: ''
                }
              ]
            }
          }
        ],
        itemFrameworkOneSequence: '',
        itemFrameworkOneTime: '',
        itemFrameworkOneType: '',
        itemFrameworkOneWord: {
          itemFrameworkOneWordMaximum: '',
          itemFrameworkOneWordMinimum: ''
        },
        itemFrameworkOneWeightage: null
      },
      itemTypeList: null
    }
  }
};

const ItemCreateReducer = (istate = JSON.parse(JSON.stringify(initialState)), action) => {
  // console.log(action.type);
  switch (action.type) {
    case SET_ITEM_SINGLE_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
    case SET_TYPE_REDUCER_STATE:
      return {
        ...istate,
        itemInformation: {
          ...istate.itemInformation,
          informationBasic: action.payload
        }
      };
    case SET_ITEMFRAMEWORK_REDUCER_STATE:
      return {
        ...istate,
        itemInformation: {
          ...istate.itemInformation,
          informationFramework: {
            ...istate.itemInformation.informationFramework,
            itemFrameworkOne: action.payload,
            itemTypeList: istate.itemTypeList
          }
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
    case SET_ITEM_FRAMEWORK_INNER_SINGLE_STATE:
      return {
        ...istate,
        itemInformation: {
          ...istate.itemInformation,
          informationFramework: {
            ...istate.itemInformation.informationFramework,
            itemFrameworkOne: {
              ...istate.itemInformation.informationFramework.itemFrameworkOne,
              [action.payload.objectName]: {
                ...istate.itemInformation.informationFramework.itemFrameworkOne[
                  action.payload.objectName
                ],
                [action.payload.actualStateName]: action.payload.value
              }
            }
          },
          itemTypeList: istate.itemTypeList
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
      return JSON.parse(JSON.stringify(initialState));
    default:
      return istate;
  }
};

export default ItemCreateReducer;
