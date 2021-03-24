import { SET_MIDDLEPANE_STATE, SET_SELECTED_ASSOCIATE, SET_SCAN_POPUP_STATE, SET_PAGE_COUNT, SET_MOBILE_PANE_STATE } from '../actionType';

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
  scanHeader:'',
  scanHeaderBadgeOne:'',
  scanHeaderBadgeTwo:'',
  numberPage:1,
  countPage:20,
  scanCount: null,
  showMiddlePaneState:false,
  mobilePanestate:'displayPaneOne'
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
        scanCount: action.payload.scanCount,
        showMiddlePaneState: action.payload.showMiddlePaneState
      };
    case SET_SCAN_POPUP_STATE:
      return {
        ...istate,
        scanHeader: action.payload.scanHeader,
        scanHeaderBadgeOne: action.payload.scanHeaderBadgeOne,
        scanHeaderBadgeTwo: action.payload.scanHeaderBadgeTwo,
      };
    case SET_PAGE_COUNT:
      return {
        ...istate,
        numberPage: action.payload
      };
    case SET_SELECTED_ASSOCIATE:
      return {
        ...istate,
        selectedAssociateInfo: action.payload
      };
    case SET_MOBILE_PANE_STATE:
      return {
        ...istate,
        mobilePanestate: action.payload
      };
    default:
      return istate;
  }
};

export default DisplayPaneReducer;
