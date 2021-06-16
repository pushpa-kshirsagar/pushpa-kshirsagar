import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_ROLE_REVIEW_LIST_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { CULTURE_REVIEWLIST_URL } from '../../endpoints';

const apiCallFumction = async (requestObj) => {
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

function* workerCultureProfileReviewListSaga(data) {
  try {
    const response = yield call(apiCallFumction, {
      data: data.payload.request,
      URL: CULTURE_REVIEWLIST_URL
    });
    if (response.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'culture profiles',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'cultureProfilesDistinctReviewList',
            scanCount: response && response.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_ROLE_REVIEW_LIST_DATA,
        payload: response.responseObject
      });
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
