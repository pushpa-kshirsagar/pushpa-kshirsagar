import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FORGOT_PASSWORD_SAGA,
  LOADER_STOP,
  SEND_AUTH_CODE_FORGOT_PASS,
  SEND_FORGOT_CREDENTIAL_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_SIGN_IN_STATUS
} from '../../actionType';
import { SEND_AUTH_CODE_URL, FORGOT_PASSWORD_URL, FORGOT_CREDENTIAL_URL } from '../../endpoints';

const apiCallFunction = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  console.log('response', response);
  return json;
};

function* workerSendAuthCodeSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload,
      URL: SEND_AUTH_CODE_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'AUTH_CODE_SEND' });
    } else {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'CODE ' + response.responseCode });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: SET_SIGN_IN_STATUS, payload: '' });
    yield put({ type: LOADER_STOP });
  }
}
function* workerFotgotPasswordSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload,
      URL: FORGOT_PASSWORD_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'PASSWORD_UPDATED' });
    } else {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'CODE ' + response.responseCode });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: SET_SIGN_IN_STATUS, payload: '' });
    yield put({ type: LOADER_STOP });
  }
}

function* workerFotgotCredentialSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload,
      URL: FORGOT_CREDENTIAL_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'CREDENTIAL_SEND' });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'credentialOptionArr', value: response.responseObject }
      });
    } else {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'CODE ' + response.responseCode });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: SET_SIGN_IN_STATUS, payload: '' });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchForgotCredentialSaga() {
  yield takeLatest(SEND_AUTH_CODE_FORGOT_PASS, workerSendAuthCodeSaga);
  yield takeLatest(FORGOT_PASSWORD_SAGA, workerFotgotPasswordSaga);
  yield takeLatest(SEND_FORGOT_CREDENTIAL_SAGA, workerFotgotCredentialSaga);
}
