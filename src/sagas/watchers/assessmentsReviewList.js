import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  SET_MIDDLEPANE_STATE,
  CLEAR_ASSESSMENT_INFO,
  GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
  GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_POPUP_VALUE,
  SET_REVIEW_LIST_RELATE_DATA,
  GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA,
  GET_ALLOCATE_ASSESSMENT,
  CULTURE_ASSESSMENTS_REVIEWLIST_SAGA,
  JOB_ASSESSMENTS_REVIEWLIST_SAGA,
  GET_ASSESSMENT_ITEM_REVIEW_LIST_SAGA
} from '../../actionType';
import {
  ASSESSMENT_REVIEW_LIST_URL,
  ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_URL,
  ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_URL,
  ASSESSMENTNODE_ASSESSMENT_REVIEWLIST_URL,
  JOB_ASSESSMENT_REVIEWLIST_URL,
  CULTURE_ASSESSMENT_REVIEWLIST_URL,
  ASSESSMENT_ITEM_REVIEWLIST_URL
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
    if (userResponse.responseCode === '000') {
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
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });

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

function* workerAssessmentGroupAssessment(data) {
  try {
    const userResponse = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [userResponse.responseObject] });
      yield put({
        type: SET_REVIEW_LIST_RELATE_DATA,
        payload: userResponse.responseObject
      });
      if (data.payload.isMiddlePaneList) {
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssessmentTypeAssessment(data) {
  try {
    const response = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: response.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assessmentTypeAssessmentReviewList',
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

function* workerAssessmentNodeAssessment(data) {
  try {
    const response = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENTNODE_ASSESSMENT_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: response.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assessmentNodeAssessmentReviewList',
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
    yield put({ type: CLEAR_ASSESSMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssessmentItemReviewList(data) {
  try {
    const response = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENT_ITEM_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: response.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'items',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assessmentItemReviewList',
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
    yield put({ type: CLEAR_ASSESSMENT_INFO });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviewListAssessmentAllocateSaga(data) {
  try {
    const userResponse = yield call(apiCallMethod, {
      data: data.payload.request,
      URL: ASSESSMENT_REVIEW_LIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      let responseObj = {
        ...data.payload.revisedGroupObject,
        assessment: userResponse.responseObject
      };
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: data.payload.headerOne || 'assessments',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.typeOfMiddlePaneList,
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true,
          isSelectActive: 'multiple',
          selectedTagsArray: data.payload.existingAssessmentId
        }
      });
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [responseObj] });
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
export default function* watchReviewListAssessmentSaga() {
  yield takeLatest(ASSESSMENT_REVIEW_DISTINCT_SAGA, workerReviewListAssessmentSaga);
  yield takeLatest(GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA, workerAssessmentGroupAssessment);
  yield takeLatest(GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA, workerAssessmentTypeAssessment);
  yield takeLatest(GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA, workerAssessmentNodeAssessment);
  yield takeLatest(GET_ASSESSMENT_ITEM_REVIEW_LIST_SAGA, workerAssessmentItemReviewList);
  yield takeLatest(GET_ALLOCATE_ASSESSMENT, workerReviewListAssessmentAllocateSaga);
}
