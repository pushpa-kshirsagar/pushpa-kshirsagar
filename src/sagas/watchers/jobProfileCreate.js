import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_JOB_SAGA,
  LOADER_STOP,
  SET_CREATE_MODE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_NEXT_POPUP,
  SET_POPUP_VALUE
} from '../../actionType';
import { JOB_CREATE_URL } from '../../endpoints';

const createApiCall = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateJobProfileSaga(data) {
  try {
    const response = yield call(createApiCall, { data: data.payload, URL: JOB_CREATE_URL });
    // const response = { responseCode: '000', responseObject: [{}] };
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'responseObject', value: response.responseObject[0] }
      });
      yield put({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'POPUPCONTINUE' } });
      yield put({ type: SET_CREATE_MODE, payload: 'jobProfile' });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchCreateJobProfileSaga() {
  yield takeLatest(CREATE_JOB_SAGA, workerCreateJobProfileSaga);
}
