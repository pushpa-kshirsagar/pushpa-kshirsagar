import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  GET_JOBPROFILE_REVIEW_LIST_SAGA,
  JOB_GROUP_JOB_REVIEWLIST_SAGA,
  JOB_TYPE_JOB_REVIEWLIST_SAGA,
  LOADER_STOP,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  REVIEWLIST_DISTINCT_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE,
  SET_REVIEW_LIST_RELATE_DATA
} from '../../actionType';
import { JOB_REVIEWLIST_URL, JOB_TYPE_JOB_REVIEWLIST_URL } from '../../endpoints';

const apiCallFumction = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerJobProfileReviewListSaga(data) {
  try {
    const response = yield call(apiCallFumction, {
      data: data.payload.request,
      URL: JOB_REVIEWLIST_URL
    });
    if (response.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'job profiles',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'jobProfilesDistinctReviewList',
            scanCount: response && response.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: response.responseObject
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: LOADER_STOP });
  }
}
function* workeJobGroupJobReviewListSaga(data) {
  try {
    const response = yield call(apiCallFumction, {
      data: data.payload.request,
      URL: JOB_TYPE_JOB_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: [response.responseObject]
      });
      yield put({
        type: SET_REVIEW_LIST_RELATE_DATA,
        payload: response.responseObject
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
            typeOfMiddlePaneList: 'jobGroupJobReviewList',
            scanCount: response && response.countTotal,
            showMiddlePaneState: true
          }
        });
      }
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
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
function* workeJobTypeJobReviewListSaga(data) {
  try {
    const response = yield call(apiCallFumction, {
      data: data.payload.request,
      URL: JOB_TYPE_JOB_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: [response.responseObject]
      });
      yield put({
        type: SET_REVIEW_LIST_RELATE_DATA,
        payload: response.responseObject
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
            typeOfMiddlePaneList: 'jobTypeJobReviewList',
            scanCount: response && response.countTotal,
            showMiddlePaneState: true
          }
        });
      }
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
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

export default function* watchReviewListJobProfileSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_JOBPROFILE_REVIEW_LIST_SAGA, workerJobProfileReviewListSaga);
  yield takeLatest(JOB_GROUP_JOB_REVIEWLIST_SAGA, workeJobGroupJobReviewListSaga);
  yield takeLatest(JOB_TYPE_JOB_REVIEWLIST_SAGA, workeJobTypeJobReviewListSaga);
}
