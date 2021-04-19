import {
  SET_MIDDLEPANE_STATE,
  SET_SELECTED_ASSOCIATE,
  SET_SCAN_POPUP_STATE,
  SET_PAGE_COUNT,
  SET_MOBILE_PANE_STATE,
  REVIEWLIST_DISTINCT_DATA,
  SET_REQUEST_OBJECT,
  SET_CORE_REVIEW_LIST_DATA,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_CORE_ROLE_REVIEW_LIST_REQ_DATA,
  SET_CORE_ROLE_REVIEW_LIST_DATA,
  SET_CORE_GROUP_REVIEW_LIST_DATA
} from '../actionType';

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
  scanHeader: '',
  scanHeaderBadgeOne: '',
  scanHeaderBadgeTwo: '',
  numberPage: 1,
  countPage: 20,
  scanCount: null,
  showMiddlePaneState: false,
  mobilePanestate: 'displayPaneOne',
  reviewListDistinctData: [],
  coreGroupReviewListData: [],
  coreGroupReviewListReqObj: null,
  coreRoleReviewListReqObj: null,
  reviewListReqObj: null,
  middlePaneSelectedValue: '',
  selectedInformationAllorKey: '',
  typeOfAssesseeCreate: '',
  middlePaneListPopupOptions: [],
  signInRes: '',
  leftPaneAssesseeInfo: ''
};

const DisplayPaneTwoReducer = (istate = initialState, action) => {
  // console.log('IN USER REDUCER====>', action);
  switch (action.type) {
    case SET_DISPLAY_TWO_SINGLE_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
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
        showMiddlePaneState: action.payload.showMiddlePaneState,
        middlePaneSelectedValue: 'tag'
      };
    case SET_SCAN_POPUP_STATE:
      return {
        ...istate,
        scanHeader: action.payload.scanHeader,
        scanHeaderBadgeOne: action.payload.scanHeaderBadgeOne,
        scanHeaderBadgeTwo: action.payload.scanHeaderBadgeTwo
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
    case REVIEWLIST_DISTINCT_DATA:
      return {
        ...istate,
        reviewListDistinctData: [...istate.reviewListDistinctData, ...action.payload]
      };
    case SET_CORE_GROUP_REVIEW_LIST_DATA:
      return {
        ...istate,
        coreGroupReviewListData: [...istate.coreGroupReviewListData, ...action.payload]
      };
    case SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT:
      return {
        ...istate,
        coreGroupReviewListReqObj: action.payload,
        coreGroupReviewListData: []
      };
    case SET_CORE_ROLE_REVIEW_LIST_DATA:
      return {
        ...istate,
        coreRoleReviewListData: [...istate.coreRoleReviewListData, ...action.payload]
      };

    case SET_CORE_ROLE_REVIEW_LIST_REQ_DATA:
      return {
        ...istate,
        coreRoleReviewListReqObj: action.payload,
        coreRoleReviewListData: []
      };
    case SET_REQUEST_OBJECT:
      return {
        ...istate,
        reviewListReqObj: action.payload,
        reviewListDistinctData: []
      };
    default:
      return istate;
  }
};

export default DisplayPaneTwoReducer;
