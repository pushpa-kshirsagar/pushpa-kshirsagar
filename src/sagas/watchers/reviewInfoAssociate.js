import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSOCIATE_INFO_SAGA
} from '../../actionType';
import { ASSOCIATE_REVIEW_INFO_URL } from '../../endpoints';

const associateReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_INFO_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewInfoAssociateSaga(data) {
  try {
    const userResponse = yield call(associateReviewInfoApi, { data: data.payload });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSESSEE_REVIEW_INFO=======>', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associate',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: 'all',
          responseObject: userResponse.responseObject[0]
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

export default function* watchReviewInfoAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_ASSOCIATE_INFO_SAGA, workerReviewInfoAssociateSaga);
}