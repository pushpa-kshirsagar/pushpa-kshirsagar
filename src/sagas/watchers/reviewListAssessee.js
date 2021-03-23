import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_ASSESSEE_SAGA,
  LOADER_STOP,
  ASSESSEE_REVIEW_DISTINCT_DATA,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  SET_MIDDLEPANE_STATE
} from '../../actionType';
import { ASSESSEE_REVIEW_LIST_URL } from '../../endpoints';

const assesseesReviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVIEW_LIST_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewListAssesseeSaga(data) {
  try {
    const userResponse = yield call(assesseesReviewListDistinctApi, { data: data.payload.request });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: ASSESSEE_REVIEW_DISTINCT_DATA, payload: userResponse.responseObject });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assessees',
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assesseeDistinctReviewList',
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

export default function* watchReviewListAssesseeSaga() {
  yield takeLatest(ASSESSEE_REVIEW_DISTINCT_SAGA, workerReviewListAssesseeSaga);
}
