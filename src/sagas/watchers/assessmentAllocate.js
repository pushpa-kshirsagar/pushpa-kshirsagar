import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_POPUP_VALUE,
  ASSESSMENT_ALLOCATE_ASSIGNMENT_SAGA,
  ASSESSMENT_ALLOCATE_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE
} from '../../actionType';
import { ASSESSMENT_ALLOCATE, ASSESSMENT_ALLOCATE_ASSIGNMENT } from '../../endpoints';
const callInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = requestObj.URL;
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
function* workerAssessmentAllocateAssignmentSaga(data) {
  try {
    const response = yield call(callInfoApi, {
      data: data.payload.request,
      URL: ASSESSMENT_ALLOCATE_ASSIGNMENT
    });
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: '' }
      });

      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'allocateStr', value: '' }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'selectedTagsArray', value: [] }
      });
      yield put({ type: LOADER_STOP });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
      yield put({ type: LOADER_STOP });
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
function* workerAssessmentAllocateSaga(data) {
  try {
    const response = yield call(callInfoApi, {
      data: data.payload.request,
      URL: ASSESSMENT_ALLOCATE
    });
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: '' }
      });

      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'allocateStr', value: '' }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'selectedTagsArray', value: [] }
      });
      yield put({ type: LOADER_STOP });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
      yield put({ type: LOADER_STOP });
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

export default function* watchAssessmentAllocateSaga() {
  yield takeLatest(ASSESSMENT_ALLOCATE_ASSIGNMENT_SAGA, workerAssessmentAllocateAssignmentSaga);
  yield takeLatest(ASSESSMENT_ALLOCATE_SAGA, workerAssessmentAllocateSaga);
}
