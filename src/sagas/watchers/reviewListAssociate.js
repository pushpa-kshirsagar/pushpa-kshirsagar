import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_MIDDLEPANE_STATE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
  RELATED_REVIEWLIST_DISTINCT_DATA
} from '../../actionType';
import { ASSOCIATE_GROUP_ASSOCIATE_URL, ASSOCIATE_REVIEWDISTINCT_LIST_URL } from '../../endpoints';

const reviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
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

function* workerReviewListAssociateSaga(data) {
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_REVIEWDISTINCT_LIST_URL
    });
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
function* workerReviewListAssociateGroupAssociateSaga(data) {
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_GROUP_ASSOCIATE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
    yield put({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: 'associates',
        middlePaneHeaderBadgeOne: data.payload.BadgeOne,
        middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: 'associatesGroupAssociateReviewList',
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
  yield takeLatest(
    GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
    workerReviewListAssociateGroupAssociateSaga
  );
}
