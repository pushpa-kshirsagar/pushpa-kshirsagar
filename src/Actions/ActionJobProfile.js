import {
  CLEAR_DISPLAY_PANE_THREE,
  CLEAR_JOB_REDUCER_STATE,
  FILTERMODE,
  GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE,
  SET_REQUEST_OBJECT
} from '../actionType';
import {
  makeInternalNodeObj,
  makeJobProfileObj,
  makeJobProfileGroupObj,
  makeJobProfileTypeObj
} from './GenericActions';

export const jobProfileCreatePopup = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  dispatch
) => {
  dispatch({ type: CLEAR_JOB_REDUCER_STATE });
  dispatch({ type: LOADER_START });
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
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: {
      stateName: 'selectedInformationAllorKey',
      value: secondaryOptionCheckValue
    }
  });
  dispatch({
    type: SET_POPUP_VALUE,
    payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'JOBCREATE' }
  });
};
export const getJobProfilesDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  popupHeaderOne,
  dispatch
) => {
  let requestObj = makeJobProfileObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    countPage,
    0
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'jobProfileDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_JOBPROFILE_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: 'job profiles',
      request: requestObj,
      BadgeOne: 'distinct',
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getJobProfileGroupApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue
) => {
  let requestObj = makeJobProfileGroupObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'jobProfileGroup' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getJobProfileTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeader = 'job profiles'
) => {
  let requestObj = makeJobProfileTypeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'jobProfileTypeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: middlePaneHeader,
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
