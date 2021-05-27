import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
  GET_TYPE_GROUP_REVIEW_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_GROUP_REVIEW_LIST_DATA,
  SET_CORE_TYPE_REVIEW_LIST_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  ASSESSEE_TYPE_REVIEWLIST_URL,
  ASSOCIATE_TYPE_REVIEWLIST_URL,
  ASSESSMENT_TYPE_REVIEWLIST_URL,
  ASSIGNMENT_TYPE_REVIEWLIST_URL,
  ASSESSEE_TYPE_GROUP_URL
} from '../../endpoints';

const TypesReviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  // let URL = ASSESSEE_GROUP_REVIEWLIST_URL;
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

function* workerReviewAssesseeTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSESSEE_TYPE_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });

      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: data.payload.middlePaneHeader,
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assesseesTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
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
function* workerReviewAssociateTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_TYPE_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });

      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'associates',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'associatesTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
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
function* workerReviewAssessmentTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSESSMENT_TYPE_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });

      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assessmentsTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
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
function* workerReviewAssignmentTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSIGNMENT_TYPE_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });

      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assignments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentsTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
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
function* workerReviewTypeGroupListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: data.payload.typeGroup === 'assessees' ? ASSESSEE_TYPE_GROUP_URL : ''
    });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: LOADER_STOP });
    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewTypesListSaga() {
  yield takeLatest(GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA, workerReviewAssessmentTypeListSaga);
  yield takeLatest(GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA, workerReviewAssignmentTypeListSaga);
  yield takeLatest(GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA, workerReviewAssesseeTypeListSaga);
  yield takeLatest(GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA, workerReviewAssociateTypeListSaga);
  yield takeLatest(GET_TYPE_GROUP_REVIEW_LIST_SAGA, workerReviewTypeGroupListSaga);
}
