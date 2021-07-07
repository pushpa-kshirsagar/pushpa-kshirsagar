import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  ASSIGNMENT_REVIEW_DISTINCT_SAGA,
  SET_MIDDLEPANE_STATE,
  CLEAR_ASSIGNMENT_INFO,
  SET_POPUP_VALUE,
  GET_ASSIGNMENTTYPE_ASSIGNMENT_REVIEWLIST_SAGA,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_REVIEW_LIST_RELATE_DATA,
  GET_ASSIGNMENTGROUP_ASSIGNMENT_REVIEWLIST_SAGA,
  GET_NODE_ASSIGNMENTS_REVIEW_LIST_SAGA,
  GET_ALLOCATE_ASSIGNMENT,
  GET_ASSIGNMENTDISTINCT_ASSESSEES_REVIEWLIST_SAGA,
  GET_ASSIGNMENTDISTINCT_ASSESSMENT_REVIEWLIST_SAGA,
  GET_ASSIGNMENTDISTINCT_CULTURE_PROFILE_REVIEWLIST_SAGA,
  GET_ASSIGNMENTDISTINCT_JOB_PROFILE_REVIEWLIST_SAGA,
  SET_ASSIGNMENT_RELATED_REVIEW_LIST
} from '../../actionType';
import {
  ASSIGNMENTNODE_ASSESSMENT_REVIEWLIST_URL,
  ASSIGNMENT_DISTINCT_ASSESSEE_URL,
  ASSIGNMENT_DISTINCT_ASSESSMENT_URL,
  ASSIGNMENT_DISTINCT_CULTURE_PROFILE_URL,
  ASSIGNMENT_DISTINCT_JOB_PROFILE_URL,
  ASSIGNMENT_GROUP_ASSIGNMENT_URL,
  ASSIGNMENT_REVIEW_LIST_URL,
  ASSIGNMENT_TYPE_ASSIGNMENT_URL
} from '../../endpoints';

const apiCallFun = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization:
        requestObj.type === 'culture profile' || requestObj.type === 'job profile'
          ? localStorage.getItem('idToken')
          : localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewListAssignmentSaga(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_REVIEW_LIST_URL,
      type: ''
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'assignments',
          middlePaneHeaderBadgeOne: data.payload.BadgeOne,
          middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assignmentDistinctReviewList',
          scanCount: response && response.countTotal,
          showMiddlePaneState: true
        }
      });
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: response.responseObject });
      yield put({ type: CLEAR_ASSIGNMENT_INFO });
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
function* workeAssignmentTypeAssignment(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_TYPE_ASSIGNMENT_URL,
      type: ''
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: response.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assignments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentTypeAssignmentReviewList',
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
function* workeAssignmentGroupAssignment(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_GROUP_ASSIGNMENT_URL,
      type: ''
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: response.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assignments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentGroupAssignmentReviewList',
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
function* workeAssignmentDistictAssessees(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_DISTINCT_ASSESSEE_URL,
      type: 'assessee'
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({
        type: SET_ASSIGNMENT_RELATED_REVIEW_LIST,
        payload: { assessee: response?.responseObject?.assessee || [] }
      });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessees',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentDistinctAssesseeReviewList',
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
function* workeAssignmentDistictAssessment(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_DISTINCT_ASSESSMENT_URL,
      type: 'assessment'
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({
        type: SET_ASSIGNMENT_RELATED_REVIEW_LIST,
        payload: { assessment: response?.responseObject?.assessment || [] }
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
            typeOfMiddlePaneList: 'assignmentDistinctAssessmentReviewList',
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
function* workeAssignmentDistictCultureProfile(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_DISTINCT_CULTURE_PROFILE_URL,
<<<<<<< HEAD
      isIdToken: true
=======
      type: 'culture profile'
>>>>>>> 64ecbf62b6a4807021ee07cc58e2bcdc40d02dd1
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({
        type: SET_ASSIGNMENT_RELATED_REVIEW_LIST,
        payload: { cultureProfile: response?.responseObject?.cultureProfile || [] }
      });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'culture profiles',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentDistinctCultureProfileReviewList',
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
function* workeAssignmentDistictJobProfile(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_DISTINCT_JOB_PROFILE_URL,
<<<<<<< HEAD
      isIdToken: true
=======
      type: 'job profile'
>>>>>>> 64ecbf62b6a4807021ee07cc58e2bcdc40d02dd1
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({
        type: SET_ASSIGNMENT_RELATED_REVIEW_LIST,
        payload: { jobProfile: response?.responseObject?.jobProfile || [] }
      });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'job profiles',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentDistinctJobProfileReviewList',
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

function* workerAssignmentNodeAssignment(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENTNODE_ASSESSMENT_REVIEWLIST_URL,
      type: ''
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [response.responseObject] });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: response.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assignments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assignmentNodeAssignmentReviewList',
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

function* workerReviewListAssignmentAllocateSaga(data) {
  try {
    const userResponse = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_REVIEW_LIST_URL,
      type: ''
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      let responseObj = {
        ...data.payload.revisedGroupObject,
        assignment: userResponse.responseObject
      };
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [responseObj] });
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: data.payload.headerOne || 'assignments',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.typeOfMiddlePaneList,
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true,
          isSelectActive: 'multiple',
          selectedTagsArray: data.payload.existingAssignmentId
        }
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

export default function* watchReviewListAssignmentSaga() {
  yield takeLatest(ASSIGNMENT_REVIEW_DISTINCT_SAGA, workerReviewListAssignmentSaga);
  yield takeLatest(GET_ASSIGNMENTTYPE_ASSIGNMENT_REVIEWLIST_SAGA, workeAssignmentTypeAssignment);
  yield takeLatest(GET_ASSIGNMENTGROUP_ASSIGNMENT_REVIEWLIST_SAGA, workeAssignmentGroupAssignment);
  yield takeLatest(
    GET_ASSIGNMENTDISTINCT_ASSESSEES_REVIEWLIST_SAGA,
    workeAssignmentDistictAssessees
  );
  yield takeLatest(
    GET_ASSIGNMENTDISTINCT_ASSESSMENT_REVIEWLIST_SAGA,
    workeAssignmentDistictAssessment
  );
  yield takeLatest(
    GET_ASSIGNMENTDISTINCT_CULTURE_PROFILE_REVIEWLIST_SAGA,
    workeAssignmentDistictCultureProfile
  );
  yield takeLatest(
    GET_ASSIGNMENTDISTINCT_JOB_PROFILE_REVIEWLIST_SAGA,
    workeAssignmentDistictJobProfile
  );
  yield takeLatest(GET_NODE_ASSIGNMENTS_REVIEW_LIST_SAGA, workerAssignmentNodeAssignment);
  yield takeLatest(GET_ALLOCATE_ASSIGNMENT, workerReviewListAssignmentAllocateSaga);
}
