import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSOCIATE_NODE_REVIEW_URL } from '../../endpoints';

const associateNodeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_NODE_REVIEW_URL;
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

function* workerReviewAssociateNodeInfoSaga(data) {
  try {
    const userResponse = yield call(associateNodeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN Node REVIEW+++++', userResponse);
      const { isReviseMode = false, selectedModule } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: selectedModule,
          headerOneBadgeOne: 'node',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : '',
          selectedModule: selectedModule
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
export default function* watchReviewAssociateNodeInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA, workerReviewAssociateNodeInfoSaga);
}
