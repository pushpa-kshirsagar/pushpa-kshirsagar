import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA,
  GET_ITEM_GROUP_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_GROUP_REVIEW_LIST_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  ASSOCIATE_GROUP_REVIEWLIST_URL,
  ASSESSMENT_GROUP_REVIEWLIST_URL,
  ASSESSEE_GROUP_REVIEWLIST_URL,
  ASSIGNMENT_GROUP_REVIEWLIST_URL,
  ITEM_GROUP_REVIEWLIST_URL,
  CULTURE_GROUP_REVIEWLIST_URL,
  JOB_GROUP_REVIEWLIST_URL
} from '../../endpoints';

const GroupsReviewListDistinctApi = async (requestObj) => {
  // console.log(requestObj.data);
  // let URL = ASSESSEE_GROUP_REVIEWLIST_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: requestObj?.isIdToken
        ? localStorage.getItem('idToken')
        : localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSESSEE_GROUP_REVIEWLIST_URL
    });
    console.log('00000000',data.payload);
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessees',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assesseesGroupDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
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
function* workerReviewAssociateGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_GROUP_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'associates',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'associatesGroupDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
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
function* workerReviewAssessmentGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSESSMENT_GROUP_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assessmentsGroupDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    console.log('loading end');
    yield put({ type: LOADER_STOP });
    // yield put({ type: CLEAR_ASSESSMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewAssignmentGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSIGNMENT_GROUP_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assignments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentsGroupDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    console.log('loading end');
    yield put({ type: LOADER_STOP });
    // yield put({ type: CLEAR_ASSIGNMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewItemGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request,
      URL: ITEM_GROUP_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'items',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'itemsGroupDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
        console.log('loading end');
        yield put({ type: LOADER_STOP });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewCulProfileGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request,
      URL: CULTURE_GROUP_REVIEWLIST_URL,
      isIdToken: true
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'culture profiles',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'cultureProfilesGroupDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
        console.log('loading end');
        yield put({ type: LOADER_STOP });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewJobProfileGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request,
      URL: JOB_GROUP_REVIEWLIST_URL,
      isIdToken: true
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'job profiles',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'jobProfilesGroupDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
        console.log('loading end');
        yield put({ type: LOADER_STOP });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_GROUP_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
export default function* watchReviewGroupsListSaga() {
  yield takeLatest(GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA, workerReviewGroupListSaga);
  yield takeLatest(GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA, workerReviewAssociateGroupListSaga);
  yield takeLatest(GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA, workerReviewAssessmentGroupListSaga);
  yield takeLatest(GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA, workerReviewAssignmentGroupListSaga);
  yield takeLatest(GET_ITEM_GROUP_REVIEW_LIST_SAGA, workerReviewItemGroupListSaga);
  yield takeLatest(GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA, workerReviewCulProfileGroupListSaga);
  yield takeLatest(GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA, workerReviewJobProfileGroupListSaga);
}
