import { SET_MIDDLEPANE_STATE, SET_SELECTED_ASSOCIATE } from '../actionType';

const initialState = {
  assesseeSignInUse: 'simplesample@gmail.com',
  isAssociateSelected: false,
  selectedAssociateInfo: '',
  assesseeRelatedAssociate: '',
  middlePaneHeader: '',
  middlePaneHeaderBadgeOne: '',
  middlePaneHeaderBadgeTwo: '',
  middlePaneHeaderBadgeThree: '',
  middlePaneHeaderBadgeFour: '',
  typeOfMiddlePaneList: '',
  scanCount: null
};

const DisplayPaneReducer = (istate = initialState, action) => {
  console.log('IN USER REDUCER====>', action);
  switch (action.type) {
    case SET_MIDDLEPANE_STATE:
      return {
        ...istate,
        middlePaneHeader: action.payload.middlePaneHeader,
        middlePaneHeaderBadgeOne: action.payload.middlePaneHeaderBadgeOne,
        middlePaneHeaderBadgeTwo: action.payload.middlePaneHeaderBadgeTwo,
        middlePaneHeaderBadgeThree: action.payload.middlePaneHeaderBadgeThree,
        middlePaneHeaderBadgeFour: action.payload.middlePaneHeaderBadgeFour,
        typeOfMiddlePaneList: action.payload.typeOfMiddlePaneList,
        scanCount: action.payload.scanCount
      };
    case SET_SELECTED_ASSOCIATE:
      return {
        ...istate,
        selectedAssociateInfo: action.payload
      };
    default:
      return istate;
  }
};

export default DisplayPaneReducer;
