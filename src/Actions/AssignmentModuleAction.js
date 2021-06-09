import {
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE
} from '../actionType';
import {
  makeAssignmentGroupObj,
  makeAssignmentTypeObj,
  makeInternalNodeObj
} from './GenericActions';

export const createAssignmentPopupApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  dispatch
) => {
  dispatch({ type: LOADER_START });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedInformationAllorKey', value: secondaryOptionCheckValue }
  });

  let nodeRequestObj = makeInternalNodeObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: nodeRequestObj });
  dispatch({
    type: INTERNAL_NODE_LIST_SAGA,
    payload: {
      request: nodeRequestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      nodeViewState: 'list',
      isMiddlePaneList: false
    }
  });
  let requestObj = makeAssignmentGroupObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  let typeRequestObj = makeAssignmentTypeObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: typeRequestObj });
  dispatch({
    type: GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
    payload: {
      request: typeRequestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  dispatch({
    type: SET_POPUP_VALUE,
    payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSIGNMENTCREATE' }
  });
};
