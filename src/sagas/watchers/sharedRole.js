import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SHARE_ROLES_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_POPUP_VALUE,
  SET_REQUEST_OBJECT,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA
} from '../../actionType';
import {
  ASSESSEE_ROLE_SHARE_URL,
  ASSESSEE_ROLE_UNSHARE_URL,
  ASSOCIATE_ROLE_SHARE_URL,
  ASSOCIATE_ROLE_UNSHARE_URL
} from '../../endpoints';
import Store from '../../store';

const sharedApiCall = async (requestObj) => {
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

function* workerRoleShareSaga(data) {
  try {
    let APIURL = '';
    if (data.payload.shareValue === 'assessee') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSESSEE_ROLE_SHARE_URL
          : ASSESSEE_ROLE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'associate') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSOCIATE_ROLE_SHARE_URL
          : ASSOCIATE_ROLE_UNSHARE_URL;
    }
    const userResponse = yield call(sharedApiCall, {
      data: data.payload.request,
      URL: APIURL
    });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_REQUEST_OBJECT,
        payload: Store.getState().DisplayPaneTwoReducer.reviewListReqObj
      });
      yield put({
        type:
          data.payload.shareValue === 'assessee'
            ? GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA
            : GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: '',
          isMiddlePaneList: true
        }
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
export default function* watchRoleShareSaga() {
  yield takeLatest(SHARE_ROLES_SAGA, workerRoleShareSaga);
}
