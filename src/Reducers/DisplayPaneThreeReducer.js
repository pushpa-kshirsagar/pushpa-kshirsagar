import {
  SET_DISPLAY_PANE_THREE_STATE,
  CLEAR_DISPLAY_PANE_THREE,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_REVIEW_LIST_RELATE_DATA,
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_STATUS_POPUP_VALUE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_ASSOCIATE_NODE_ASSESSEE_ID_LIST,
  SET_UNSELECTED_ASSOCIATE_NODE_ASSESSEE_ID_LIST,
  SET_DISPLAY_THREE_SINGLE_STATE,
  SET_ADMINISTRATOR_SECONDARY_LIST,
  SET_ASSIGNMENT_RELATED_LIST,
  SET_ASSIGNMENT_RELATED_REVIEW_LIST,
  RESET_ASSIGNMENT_REVIEW_LIST_OBJECT,
  SET_WEIGHTAGE_SELECTED,
  SET_RANGE_SELECTED,
  SET_CREATE_MODE,
  SET_PANE_THREE_PREVIEW_MODE,
  SET_PANE_THREE_ITEM_PREVIEW_MODE
} from '../actionType';

const initialState = {
  isReviewRevise: false,
  headerOne: '',
  headerOneBadgeOne: '',
  headerOneBadgeTwo: '',
  HeaderBadgeThree: '',
  previewHeaderOne: '',
  previewHeaderOneBadgeOne: '',
  previewHeaderOneBadgeTwo: '',
  previewHeaderBadgeThree: '',
  previewInnerHTML: '',
  isItemPreviewShow: false,
  originResponseObj:null,
  responseObject: {},
  reviewMode: 'review',
  createMode: '',
  administratorSecondary: [],
  relatedReviewListPaneThree: [{}],
  // assesseeRoleAssessee: [],
  assesseeGroupAssessee: {
    assesseeGroupAssesseeAllocate: [],
    assesseeGroupAssesseeUnallocate: []
  },
  assesseeRoleAssessee: {
    assesseeRoleAssesseeAllocate: [],
    assesseeRoleAssesseeUnallocate: []
  },
  associateNodeAssessee: {
    associateNodeAssesseeAllocate: [],
    associateNodeAssesseeUnallocate: []
  },
  assignmentAssesseeList: [],
  assignmentAssessmentList: [],
  assignmentCultureProfileList: [],
  assignmentJobProfileList: [],
  assignmentRelatedReviewListPaneThree: {},
  isWeightageSelected: false,
  isRangeSelected: false,
  selectedModule: '',
  statusPopUpValue: '',
  // assesseeSetUpModule: {
  //   assesseeDistinctCreateApproval: true,
  //   assesseeDistinctCreateFee: null,
  //   assesseeDistinctCreatePermission: true,
  //   assesseeNameUnique: false,
  //   assesseeNameAliasUnique: false,
  //   assesseeNameFormat: null,
  //   assesseeDistinctShare: false,
  //   assesseeDistinctShared: false,
  //   assesseeDistinctSignOnApproval: false,
  //   assesseeDistinctSignOnFee: null,
  //   assesseeDistinctSignOnPermission: false,
  //   assesseeGroupCreatePermission: true,
  //   assesseeGroupNameUnique: false,
  //   assesseeGroupNameDescriptionUnique: false,
  //   assesseeGroupShare: true,
  //   assesseeGroupShared: true,
  //   assesseeRoleCreatePermission: true,
  //   assesseeRoleNameUnique: false,
  //   assesseeRoleNameDescriptionUnique: false,
  //   assesseeRoleShare: true,
  //   assesseeRoleShared: true,
  //   assesseeTypeCreatePermission: true,
  //   assesseeTypeNameUnique: false,
  //   assesseeTypeNameDescriptionUnique: false,
  //   assesseeTypeShare: true,
  //   assesseeTypeShared: true
  // },

  assesseeSetUpModule:null,
  assessmentSetUpModule: null,
  assignmentSetUpModule: null,
  setUpAssociateModule: null,
  analyticSetUpModule: null,
  itemSetUpModule: null,
  associateNodeSetUpModule: null,
  
  assesseeSetUpModule:null,
  assessmentSetUpModuleBespoke: null,
  assignmentSetUpModuleBespoke: null,
  setUpAssociateModuleBespoke: null,
  analyticSetUpModuleBespoke: null,
  itemSetUpModuleBespoke: null,

  assesseeSetUpModuleGeneric:null,
  assessmentSetUpModuleGeneric: null,
  assignmentSetUpModuleGeneric: null,
  setUpAssociateModuleGeneric: null,
  analyticSetUpModuleGeneric: null,
  itemSetUpModuleGeneric: null,
};

const DisplayPaneThreeReducer = (istate = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_THREE_SINGLE_STATE:
      return {
        ...istate,
        [action.payload.stateName]: action.payload.value
      };
    case SET_DISPLAY_PANE_THREE_STATE:
      return {
        ...istate,
        isReviewRevise: true,
        headerOne: action.payload.headerOne,
        headerOneBadgeOne: action.payload.headerOneBadgeOne,
        headerOneBadgeTwo: action.payload.headerOneBadgeTwo,
        headerOneBadgeThree: action.payload.headerOneBadgeThree,
        responseObject: { ...action.payload.responseObject },
        reviewMode: action.payload.reviewMode || 'review',
        createMode: action.payload.createMode || '',
        selectedModule: action.payload.selectedModule || ''
      };
    case SET_DISPLAY_PANE_THREE_REVIEW_MODE:
      return {
        ...istate,
        reviewMode: action.payload
      };
    case SET_REVIEW_LIST_RELATE_DATA:
      return {
        ...istate,
        relatedReviewListPaneThree: action.payload
      };
    case SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST:
      return {
        ...istate,
        assesseeRoleAssessee: {
          ...istate.assesseeRoleAssessee,
          assesseeRoleAssesseeAllocate: action.payload
        }
      };
    case SET_CREATE_MODE:
      return {
        ...istate,
        createMode: action.payload
      };
    case SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST:
      return {
        ...istate,
        assesseeRoleAssessee: {
          ...istate.assesseeRoleAssessee,
          assesseeRoleAssesseeUnallocate: action.payload
        }
      };
    case SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST:
      return {
        ...istate,
        assesseeGroupAssessee: {
          ...istate.assesseeGroupAssessee,
          assesseeGroupAssesseeAllocate: action.payload
        }
      };
    case SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST:
      return {
        ...istate,
        assesseeGroupAssessee: {
          ...istate.assesseeGroupAssessee,
          assesseeGroupAssesseeUnallocate: action.payload
        }
      };
    case SET_ASSOCIATE_NODE_ASSESSEE_ID_LIST:
      return {
        ...istate,
        associateNodeAssessee: {
          ...istate.associateNodeAssessee,
          associateNodeAssesseeAllocate: action.payload
        }
      };
    case SET_UNSELECTED_ASSOCIATE_NODE_ASSESSEE_ID_LIST:
      return {
        ...istate,
        associateNodeAssessee: {
          ...istate.associateNodeAssessee,
          associateNodeAssesseeUnallocate: action.payload
        }
      };
    case SET_STATUS_POPUP_VALUE:
      return {
        ...istate,
        statusPopUpValue: action.payload
      };
    case SET_ADMINISTRATOR_SECONDARY_LIST:
      return {
        ...istate,
        administratorSecondary: action.payload
      };
    case SET_ASSIGNMENT_RELATED_LIST:
      return {
        ...istate,
        [action.payload.listName]: action.payload.value
      };
    case SET_ASSIGNMENT_RELATED_REVIEW_LIST:
      return {
        ...istate,
        assignmentRelatedReviewListPaneThree: {
          ...istate.assignmentRelatedReviewListPaneThree,
          ...action.payload
        }
      };
    case RESET_ASSIGNMENT_REVIEW_LIST_OBJECT:
      return {
        ...istate,
        assignmentRelatedReviewListPaneThree: {}
      };
    case SET_WEIGHTAGE_SELECTED:
      return {
        ...istate,
        isWeightageSelected: action.payload
      };
    case SET_RANGE_SELECTED:
      return {
        ...istate,
        isRangeSelected: action.payload
      };
    case SET_PANE_THREE_PREVIEW_MODE:
      return {
        ...istate,
        isPreviewShow: action.payload.isPreviewShow,
        previewHeaderOne: action.payload.previewHeaderOne,
        previewHeaderOneBadgeOne: action.payload.previewHeaderOneBadgeOne,
        previewHeaderOneBadgeTwo: action.payload.previewHeaderOneBadgeTwo,
        previewHeaderOneBadgeThree: action.payload.previewHeaderOneBadgeThree,
        previewInnerHTML: action.payload.previewInnerHTML
      };
    case SET_PANE_THREE_ITEM_PREVIEW_MODE:
      return {
        ...istate,
        isItemPreviewShow: action.payload
      };
    case CLEAR_DISPLAY_PANE_THREE:
      return initialState;
    default:
      return istate;
  }
};

export default DisplayPaneThreeReducer;
