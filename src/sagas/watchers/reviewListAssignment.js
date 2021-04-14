import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  ASSIGNMENT_REVIEW_DISTINCT_SAGA,
  SET_MIDDLEPANE_STATE,
  CLEAR_ASSIGNMENT_INFO
} from '../../actionType';
import { ASSIGNMENT_REVIEW_LIST_URL } from '../../endpoints';

const assignmentsReviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVIEW_LIST_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewListAssignmentSaga(data) {
  try {
    const userResponse = yield call(assignmentsReviewListDistinctApi, {
      data: data.payload.request
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assignments',
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assignmentDistinctReviewList',
        scanCount: userResponse && userResponse.countTotal,
        showMiddlePaneState: true
      }
    });
    console.log('loading end');
    yield put({ type: LOADER_STOP });
    yield put({ type: CLEAR_ASSIGNMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewListAssignmentSaga() {
  yield takeLatest(ASSIGNMENT_REVIEW_DISTINCT_SAGA, workerReviewListAssignmentSaga);
}
