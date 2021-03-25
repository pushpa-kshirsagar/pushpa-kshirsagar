import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
    LOADER_STOP,
  SET_CORE_REVIEW_LIST_REQ_DATA
} from '../../actionType';
import { ASSESSEE_ROLE_REVIEW_LIST_URL } from '../../endpoints';

const assesseeRoleReviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_ROLE_REVIEW_LIST_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewAssesseeRoleListSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviewListDistinctApi, { data: data.payload.request });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: SET_CORE_REVIEW_LIST_REQ_DATA, payload: userResponse.responseObject });
    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssesseeRoleListSaga() {
  yield takeLatest(GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA, workerReviewAssesseeRoleListSaga);
}
