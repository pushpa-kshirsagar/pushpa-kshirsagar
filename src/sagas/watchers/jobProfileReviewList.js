import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  CULTURE_ASSESSMENTS_REVIEWLIST_SAGA,
  GET_ALLOCATE_JOB,
  GET_JOBDOMAIN_REVIEW_LIST_SAGA,
  GET_JOBFUNCTION_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_REVIEW_LIST_SAGA,
  GET_JOBROLE_REVIEW_LIST_SAGA,
  GET_JOB_NODE_JOB_REVIEW_LIST_SAGA,
  JOB_ASSESSMENTS_REVIEWLIST_SAGA,
  JOB_GROUP_JOB_REVIEWLIST_SAGA,
  JOB_TYPE_JOB_REVIEWLIST_SAGA,
  LOADER_START,
  LOADER_STOP,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  REVIEWLIST_DISTINCT_DATA,
  SET_ASSIGNMENT_RELATED_LIST,
  SET_CORE_GROUP_REVIEW_LIST_DATA,
  SET_CORE_NODE_REVIEW_LIST_DATA,
  SET_CORE_ROLE_REVIEW_LIST_DATA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_NEXT_POPUP,
  SET_POPUP_VALUE,
  SET_REVIEW_LIST_RELATE_DATA
} from '../../actionType';
import {
  CULTURE_ASSESSMENT_REVIEWLIST_URL,
  JOBDOMAIN_REVIEWLIST_URL,
  JOBFUNCTION_REVIEWLIST_URL,
  JOBPROFILER_LIST_URL,
  JOBROLE_REVIEWLIST_URL,
  JOB_ASSESSMENT_REVIEWLIST_URL,
  JOB_GROUP_JOB_REVIEWLIST_URL,
  JOB_NODE_JOB_REVIEWLIST_URL,
  JOB_REVIEWLIST_URL,
  JOB_TYPE_JOB_REVIEWLIST_URL
} from '../../endpoints';

const apiCallFunction = async (requestObj) => {
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
    const response = yield call(apiCallFunction, {
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
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: JOB_GROUP_JOB_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'jobProfileGroupJobProfileReviewList',
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
function* workeJobTypeJobReviewListSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
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
            typeOfMiddlePaneList: 'jobProfileTypeJobProfileReviewList',
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
function* workerReviewListJobProfileAllocateSaga(data) {
  try {
    const userResponse = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: JOB_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      let responseObj = {
        ...data.payload.revisedGroupObject,
        jobProfile: userResponse.responseObject
      };
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: data.payload.headerOne || 'job profiles',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.typeOfMiddlePaneList,
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true,
          isSelectActive: 'multiple',
          selectedTagsArray: data.payload.existingJobProfileId
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
function* workeJobNodeJobReviewListSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: JOB_NODE_JOB_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'jobProfileNodeJobProfileReviewList',
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
function* workeJobDomainReviewListSaga(data) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: JOBPROFILER_LIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'jobProfilerReviewList', value: response.responseObject }
      });
      // yield put({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'POPUPDOMAINMSG' } });
      yield put({
        type: SET_POPUP_VALUE,
        payload: {
          isPopUpValue: data.payload.nextPopupValue
            ? data.payload.nextPopupValue
            : 'POPUPDOMAINMSG',
          popupMode: 'JOBCREATE'
        }
      });
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
function* workeJobFunctionReviewListSaga(data) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: JOBFUNCTION_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'jobProfileFunctionReviewList', value: response.responseObject }
      });
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
function* workeJobRoleReviewListSaga(data) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: JOBROLE_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'jobProfileRoleReviewList', value: response.responseObject }
      });
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
function* workerCultureProfileAssessment(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: CULTURE_ASSESSMENT_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'cultureProfileAssessmentReviewList',
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
function* workerJobProfileAssessment(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: JOB_ASSESSMENT_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'jobProfilepAssessmentReviewList',
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
export default function* watchReviewListJobProfileSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_JOBPROFILE_REVIEW_LIST_SAGA, workerJobProfileReviewListSaga);
  yield takeLatest(JOB_GROUP_JOB_REVIEWLIST_SAGA, workeJobGroupJobReviewListSaga);
  yield takeLatest(JOB_TYPE_JOB_REVIEWLIST_SAGA, workeJobTypeJobReviewListSaga);
  yield takeLatest(GET_ALLOCATE_JOB, workerReviewListJobProfileAllocateSaga);
  yield takeLatest(GET_JOB_NODE_JOB_REVIEW_LIST_SAGA, workeJobNodeJobReviewListSaga);
  yield takeLatest(GET_JOBDOMAIN_REVIEW_LIST_SAGA, workeJobDomainReviewListSaga);
  yield takeLatest(GET_JOBFUNCTION_REVIEW_LIST_SAGA, workeJobFunctionReviewListSaga);
  yield takeLatest(GET_JOBROLE_REVIEW_LIST_SAGA, workeJobRoleReviewListSaga);
  yield takeLatest(CULTURE_ASSESSMENTS_REVIEWLIST_SAGA, workerCultureProfileAssessment);
  yield takeLatest(JOB_ASSESSMENTS_REVIEWLIST_SAGA, workerJobProfileAssessment);
}
