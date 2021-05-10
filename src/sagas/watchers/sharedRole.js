import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_ROLE_SHARE_SAGA,
  GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_NODE_REVIEW_LIST_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  EXTERNAL_NODE_TREE_URL,
  EXTERNAL_NODE_LIST_URL,
  INTERNAL_NODE_TREE_URL,
  INTERNAL_NODE_LIST_URL,
  ASSESSEE_ROLE_SHARE_URL
} from '../../endpoints';

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

function* workerAssesseeRoleShareSaga(data) {
  try {
    const userResponse = yield call(sharedApiCall, {
      data: data.payload.request,
      URL: ASSESSEE_ROLE_SHARE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
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
  yield takeLatest(ASSESSEE_ROLE_SHARE_SAGA, workerAssesseeRoleShareSaga);
}
