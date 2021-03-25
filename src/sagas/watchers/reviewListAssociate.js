import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_ASSESSEE_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  SET_MIDDLEPANE_STATE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA
} from '../../actionType';
import { ASSOCIATE_REVIEWDISTINCT_LIST_URL } from '../../endpoints';

const associatesReviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEWDISTINCT_LIST_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewListAssociateSaga(data) {
  try {
    const userResponse = yield call(associatesReviewListDistinctApi, { data: data.payload.request });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'associates',
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'associateDistinctReviewList',
        scanCount: userResponse && userResponse.countTotal,
        showMiddlePaneState: true
      }
    });
    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewListAssociateSaga() {
  yield takeLatest(ASSOCIATE_REVIEW_DISTINCT_SAGA, workerReviewListAssociateSaga);
}
