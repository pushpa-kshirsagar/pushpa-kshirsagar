import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSOCIATE_REVIEW_GROUP_URL } from '../../endpoints';

const associateGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_GROUP_URL;
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

function* workerReviewAssociateGroupInfoSaga(data) {
  try {
    const userResponse = yield call(associateGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'group',
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

export default function* watchReviewAssociateGroupInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA, workerReviewAssociateGroupInfoSaga);
}
