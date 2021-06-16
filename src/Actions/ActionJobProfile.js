import {
  CLEAR_JOB_REDUCER_STATE,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE
} from '../actionType';
import { makeInternalNodeObj } from './GenericActions';

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
