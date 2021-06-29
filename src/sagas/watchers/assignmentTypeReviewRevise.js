import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSIGNMENT_TYPE_REVISE_INFO_SAGA,
  GET_ASSIGNMENTTYPE_ASSIGNMENT_REVIEWLIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_ASSIGNMENT_TYPE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST
} from '../../actionType';
import { ASSIGNMENT_REVIEW_TYPE_URL, ASSIGNMENT_REVISE_TYPE_URL } from '../../endpoints';
import { EXCEPTION_ERROR_MESSAGE } from '../../errorMessage';
import Store from '../../store';

const assignmentTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVIEW_TYPE_URL;
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

function* workerReviewAssignmentTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assignmentTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false, assignmentTypeAssignmentReqBody = null } = data.payload;
      if (assignmentTypeAssignmentReqBody !== null) {
        yield put({
          type: GET_ASSIGNMENTTYPE_ASSIGNMENT_REVIEWLIST_SAGA,
          payload: {
            request: assignmentTypeAssignmentReqBody,
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
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSIGNMENT_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_TYPE_GROUP_ALLOCATION,
          payload: {
            objectName: 'assignmentType',
            stateName: 'assignmentTypeGroup',
            value:
              userResponse?.responseObject[0]?.informationAllocation?.assignmentTypeGroup?.id || ''
          }
        });
      }
    } else {
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: EXCEPTION_ERROR_MESSAGE, popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

const assignmentTypeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVISE_TYPE_URL;
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

function* workerReviseAssignmentTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assignmentTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { createMode = '', assignmentTypeAssignmentReqBody = null } = data.payload;
      if (assignmentTypeAssignmentReqBody !== null) {
        yield put({
          type: GET_ASSIGNMENTTYPE_ASSIGNMENT_REVIEWLIST_SAGA,
          payload: {
            request: assignmentTypeAssignmentReqBody,
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
            headerOneBadgeOne: 'type',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject: userResponse.responseObject,
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
        type: GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
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
      yield put({ type: LOADER_STOP });
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssignmentTypeInfoSaga() {
  yield takeLatest(GET_ASSIGNMENT_TYPE_REVIEW_INFO_SAGA, workerReviewAssignmentTypeInfoSaga);
  yield takeLatest(ASSIGNMENT_TYPE_REVISE_INFO_SAGA, workerReviseAssignmentTypeInfoSaga);
}
