import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSOCIATE_REVIEW_ROLE_URL } from '../../endpoints';

const assesseeRoleReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_ROLE_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewAssociateRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN ASSOCIATE ROLE Review', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
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

export default function* watchReviewAssociateRoleInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA, workerReviewAssociateRoleInfoSaga);
}
