import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_POPUP_VALUE,
  SET_MIDDLEPANE_STATE,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_ROLE_REVIEW_LIST_DATA,
  GET_ITEM_REVIEW_LIST_SAGA
} from '../../actionType';
import { ITEM_REVIEWLIST_URL } from '../../endpoints';
import Store from '../../store';

const apiCall = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewListItemsSaga(data) {
  try {
    const userResponse = yield call(apiCall, {
      data: data.payload.request,
      URL: ITEM_REVIEWLIST_URL
    });
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: data.payload.middlePaneHeader,
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'itemsDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_ROLE_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
export default function* watchItemReviewListSaga() {
  yield takeLatest(GET_ITEM_REVIEW_LIST_SAGA, workerReviewListItemsSaga);
}
