import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  SET_MIDDLEPANE_STATE,
  GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST
} from '../../actionType';
import {
  ASSESSEE_REVIEW_LIST_URL,
  ASSESSEE_GROUP_ASSESSEE_URL,
  ASSESSEE_ROLE_ASSESSEE_URL
} from '../../endpoints';

const reviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  // let URL = ASSESSEE_REVIEW_LIST_URL;
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

function* workerReviewListAssesseeSaga(data) {
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSESSEE_REVIEW_LIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: data.payload.HeaderOne,
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: data.payload.HeaderOne + 'DistinctReviewList',
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
function* workerReviewListAssesseeGroupAssesseeSaga(data) {
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSESSEE_GROUP_ASSESSEE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: userResponse.responseObject
      });
    if (data.payload.isMiddlePaneList) {
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: data.payload.HeaderOne,
          middlePaneHeaderBadgeOne: data.payload.BadgeOne,
          middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.HeaderOne + 'GroupAssesseeReviewList',
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true
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
function* workerReviewListRoleAssesseeSaga(data) {
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSESSEE_ROLE_ASSESSEE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: userResponse.responseObject
      });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: data.payload.HeaderOne,
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: data.payload.HeaderOne + 'RoleAssesseeReviewList',
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
  yield takeLatest(GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST, workerReviewListRoleAssesseeSaga);
  yield takeLatest(
    GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
    workerReviewListAssesseeGroupAssesseeSaga
  );
}
