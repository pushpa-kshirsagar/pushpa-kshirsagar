import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_POPUP_VALUE
} from '../../actionType';
import { CULTURE_REVIEWLIST_URL } from '../../endpoints';

const apiCallFumction = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCultureProfileReviewListSaga(data) {
  try {
    const response = yield call(apiCallFumction, {
      data: data.payload.request,
      URL: CULTURE_REVIEWLIST_URL
    });
    if (response.responseCode === '000') {
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

export default function* watchReviewListCultureProfileSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_CULTUREPROFILE_REVIEW_LIST_SAGA, workerCultureProfileReviewListSaga);
}
