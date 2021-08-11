import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
  GET_CULTUREPROFILE_TYPE_REVIEW_LIST_SAGA,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
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
  ASSESSEE_TYPE_GROUP_URL,
  ASSOCIATE_TYPE_GROUP_URL,
  ITEM_TYPE_REVIEWLIST_URL,
  ASSESSMENT_TYPE_GROUP_URL,
  ITEM_TYPE_GROUP_URL,
  ASSIGNMENT_TYPE_GROUP_URL,
  CULTURE_TYPE_REVIEWLIST_URL,
  JOB_TYPE_REVIEWLIST_URL,
  CULTURE_TYPE_GROUP_URL,
  JOB_TYPE_GROUP_URL
} from '../../endpoints';

const TypesReviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  // let URL = ASSESSEE_GROUP_REVIEWLIST_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: requestObj?.idIdToken
        ? localStorage.getItem('idToken')
        : localStorage.getItem('token')
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
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: data.payload.middlePaneHeader
              ? data.payload.middlePaneHeader
              : 'assessees',
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
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
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
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewItemTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: ITEM_TYPE_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'itemsTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewCultureProfileTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: CULTURE_TYPE_REVIEWLIST_URL,
      idIdToken: true
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
            typeOfMiddlePaneList: 'cultureProfilesTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewJobProfileTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: JOB_TYPE_REVIEWLIST_URL,
      idIdToken: true
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
            typeOfMiddlePaneList: 'jobProfilesTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
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
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewAssignmentTypeListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSIGNMENT_TYPE_REVIEWLIST_URL
    });
    console.log('isMiddlePaneList',data.payload.isMiddlePaneList);
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
            typeOfMiddlePaneList: 'assignmentsTypeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_TYPE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewTypeGroupListSaga(data) {
  try {
    const userResponse = yield call(TypesReviewListDistinctApi, {
      data: data.payload.request,
      idIdToken:
        data.payload.typeGroup === 'culture profiles' || data.payload.typeGroup === 'job profiles'
          ? true
          : false,
      URL:
        data.payload.typeGroup === 'assessees'
          ? ASSESSEE_TYPE_GROUP_URL
          : data.payload.typeGroup === 'associates'
          ? ASSOCIATE_TYPE_GROUP_URL
          : data.payload.typeGroup === 'assessments'
          ? ASSESSMENT_TYPE_GROUP_URL
          : data.payload.typeGroup === 'items'
          ? ITEM_TYPE_GROUP_URL
          : data.payload.typeGroup === 'assignments'
          ? ASSIGNMENT_TYPE_GROUP_URL
          : data.payload.typeGroup === 'culture profiles'
          ? CULTURE_TYPE_GROUP_URL
          : data.payload.typeGroup === 'job profiles'
          ? JOB_TYPE_GROUP_URL
          : ''
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
    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewTypesListSaga() {
  yield takeLatest(GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA, workerReviewAssessmentTypeListSaga);
  yield takeLatest(GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA, workerReviewAssignmentTypeListSaga);
  yield takeLatest(GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA, workerReviewAssesseeTypeListSaga);
  yield takeLatest(GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA, workerReviewAssociateTypeListSaga);
  yield takeLatest(
    GET_CULTUREPROFILE_TYPE_REVIEW_LIST_SAGA,
    workerReviewCultureProfileTypeListSaga
  );
  yield takeLatest(GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA, workerReviewJobProfileTypeListSaga);
  yield takeLatest(GET_ITEM_TYPE_REVIEW_LIST_SAGA, workerReviewItemTypeListSaga);
  yield takeLatest(GET_TYPE_GROUP_REVIEW_LIST_SAGA, workerReviewTypeGroupListSaga);
}
