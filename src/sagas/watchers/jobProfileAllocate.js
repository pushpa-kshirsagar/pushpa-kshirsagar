import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSIGNMENT_ALLOCATE_SAGA,
  JOBPROFILE_ALLOCATE_SAGA,
  JOBPROFILE_ALLOCATE_ASSIGNMENT_SAGA
} from '../../actionType';
import { JOBPROFILE_ALLOCATE_URL, JOB_PROFILE_ALLOCATE_ASSIGNMENT_URL } from '../../endpoints';
import Store from '../../store';
const callInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = requestObj.URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};
function* workerAllocateJobProfileSaga(data) {
  try {
    const Response = yield call(callInfoApi, {
      data: data.payload.request,
      URL: JOBPROFILE_ALLOCATE_URL
    });
    // const Response ={responseCode:'000',countTotal:30}
    if (Response.responseCode === '000') {
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
        payload: { isPopUpValue: Response.responseMessage, popupMode: 'responseErrorMsg' }
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
function* workerAllocateJobProfileAssignmentSaga(data) {
  try {
    const Response = yield call(callInfoApi, {
      data: data.payload.request,
      URL: JOB_PROFILE_ALLOCATE_ASSIGNMENT_URL
    });
    // const Response ={responseCode:'000',countTotal:30}
    if (Response.responseCode === '000') {
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
        payload: { isPopUpValue: Response.responseMessage, popupMode: 'responseErrorMsg' }
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

export default function* watchJobProfileAllocateSaga() {
  yield takeLatest(JOBPROFILE_ALLOCATE_SAGA, workerAllocateJobProfileSaga);
  yield takeLatest(JOBPROFILE_ALLOCATE_ASSIGNMENT_SAGA, workerAllocateJobProfileAssignmentSaga);
}
