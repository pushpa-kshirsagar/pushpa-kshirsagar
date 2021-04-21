import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  CLEAR_ASSIGNMENT_INFO,
  CREATE_ASSIGNMENT_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import { ASSIGNMENT_CREATE_URL } from '../../endpoints';

const createAssignmentApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSIGNMENT_CREATE_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssignmentSaga(data) {
  try {
    const apiResponse = yield call(createAssignmentApi, { data: data.payload });
    if (apiResponse.responseCode === '000') {
      console.log('loading end', data.payload.whichTypeCreate);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assignment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: Store.getState().DisplayPaneTwoReducer.selectedInformationAllorKey,
          responseObject: apiResponse.responseObject,
          reviewMode: 'revise',
          createMode: 'assignment'
        }
      });
    }
    yield put({ type: LOADER_STOP });
    yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    yield put({ type: CLEAR_ASSIGNMENT_INFO });
    yield put({ type: POPUP_CLOSE });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchCreateAssignmentSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSIGNMENT_SAGA, workerCreateAssignmentSaga);
}
