import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSOCIATE_TYPE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_ASSOCIATE_TYPE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSOCIATE_REVIEW_TYPE_URL } from '../../endpoints';

const associateTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_TYPE_URL;
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

function* workerReviewAssociateTypeInfoSaga(data) {
  try {
    const userResponse = yield call(associateTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject,
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSOCIATE_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject.informationBasic
        });
      }
    }

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssociateTypeInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_TYPE_REVIEW_INFO_SAGA, workerReviewAssociateTypeInfoSaga);
}
