import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  SET_MIDDLEPANE_STATE,
  CLEAR_ASSESSMENT_INFO,
  GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
  GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA,
  RELATED_REVIEWLIST_DISTINCT_DATA
} from '../../actionType';
import {
  ASSESSMENT_REVIEW_LIST_URL,
  ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_URL,
  ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_URL
} from '../../endpoints';

const apiCallMethod = async (requestObj) => {
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

function* workerReviewListAssessmentSaga(data) {
  try {
    const userResponse = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENT_REVIEW_LIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assessments',
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assessmentDistinctReviewList',
        scanCount: userResponse && userResponse.countTotal,
        showMiddlePaneState: true
      }
    });
    console.log('loading end');
    yield put({ type: LOADER_STOP });
    yield put({ type: CLEAR_ASSESSMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

function* workerAssessmentGroupAssessmentSaga(data) {
  try {
    const userResponse = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [userResponse.responseObject] });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assessments',
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assessmentGroupAssessmentReviewList',
        scanCount: userResponse && userResponse.countTotal,
        showMiddlePaneState: true
      }
    });
    console.log('loading end');
    yield put({ type: LOADER_STOP });
    yield put({ type: CLEAR_ASSESSMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssessmentTypeAssessmentSaga(data) {
  try {
    const userResponse = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'assessments',
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'assessmentTypeAssessmentReviewList',
        scanCount: userResponse && userResponse.countTotal,
        showMiddlePaneState: true
      }
    });
    console.log('loading end');
    yield put({ type: LOADER_STOP });
    yield put({ type: CLEAR_ASSESSMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewListAssessmentSaga() {
  yield takeLatest(ASSESSMENT_REVIEW_DISTINCT_SAGA, workerReviewListAssessmentSaga);
  yield takeLatest(
    GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
    workerAssessmentGroupAssessmentSaga
  );
  yield takeLatest(
    GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA,
    workerAssessmentTypeAssessmentSaga
  );
}
