import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSIGNMENT_GROUP_REVISE_INFO_SAGA,
  GET_ASSIGNMENTGROUP_ASSIGNMENT_REVIEWLIST_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_ASSIGNMEMT_GROUP_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_GROUP_SETUP_STATE,
  SET_POPUP_VALUE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST
} from '../../actionType';
import { ASSIGNMENT_REVIEW_GROUP_URL, ASSIGNMENT_REVISE_GROUP_URL } from '../../endpoints';
import { EXCEPTION_ERROR_MESSAGE } from '../../errorMessage';
import Store from '../../store';

const assignmentGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVIEW_GROUP_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewAssignmentGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assignmentGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false, assignmentGroupAssignmentReqBody = null } = data.payload;
      if (assignmentGroupAssignmentReqBody !== null) {
        yield put({
          type: GET_ASSIGNMENTGROUP_ASSIGNMENT_REVIEWLIST_SAGA,
          payload: {
            request: assignmentGroupAssignmentReqBody,
            HeaderOne: 'assignments',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assignments',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSIGNMEMT_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_GROUP_SETUP_STATE,
          payload: {
            objectName: 'assignmentGroup',
            value: userResponse.responseObject[0].informationSetup
          }
        });
      }
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
const assignmentGroupReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVISE_GROUP_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviseAssignmentGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assignmentGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { createMode = '', assignmentGroupAssignmentReqBody = null } = data.payload;
      if (assignmentGroupAssignmentReqBody !== null) {
        yield put({
          type: GET_ASSIGNMENTGROUP_ASSIGNMENT_REVIEWLIST_SAGA,
          payload: {
            request: assignmentGroupAssignmentReqBody,
            HeaderOne: 'assignments',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assignments',
            headerOneBadgeOne: 'group',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
      }
      yield put({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: [] });
      yield put({
        type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
        payload: []
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'assignments',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
    } else {
      console.log('loading end');
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: EXCEPTION_ERROR_MESSAGE, popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssignmentGroupInfoSaga() {
  yield takeLatest(GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA, workerReviewAssignmentGroupInfoSaga);
  yield takeLatest(ASSIGNMENT_GROUP_REVISE_INFO_SAGA, workerReviseAssignmentGroupInfoSaga);
}
