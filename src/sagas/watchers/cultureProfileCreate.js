import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  CREATE_CULTURE_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { ASSESSEE_CREATE_URL, CULTURE_CREATE_URL } from '../../endpoints';

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

function* workerCreateCultureProfileSaga(data) {
  try {
    const response = yield call(createApiCall, { data: data.payload, URL: CULTURE_CREATE_URL });
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'culture profile',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: Store.getState().DisplayPaneTwoReducer.selectedInformationAllorKey,
          responseObject: response.responseObject[0],
          reviewMode: 'revise',
          createMode: 'cultureProfile'
        }
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: POPUP_CLOSE });
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateCultureProfileSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_CULTURE_SAGA, workerCreateCultureProfileSaga);
}
