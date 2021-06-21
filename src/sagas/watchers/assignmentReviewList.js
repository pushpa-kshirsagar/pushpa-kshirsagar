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
  GET_ALLOCATE_ASSIGNMENT
} from '../../actionType';
import {
  ASSIGNMENTNODE_ASSESSMENT_REVIEWLIST_URL,
  ASSIGNMENT_GROUP_ASSIGNMENT_URL,
  ASSIGNMENT_REVIEW_LIST_URL,
  ASSIGNMENT_TYPE_ASSIGNMENT_URL
} from '../../endpoints';

const apiCallFun = async (requestObj) => {
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

function* workerReviewListAssignmentSaga(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_REVIEW_LIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: response.responseObject });
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
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workeAssignmentTypeAssignment(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_TYPE_ASSIGNMENT_URL
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
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workeAssignmentGroupAssignment(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_GROUP_ASSIGNMENT_URL
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
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssignmentNodeAssignment(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENTNODE_ASSESSMENT_REVIEWLIST_URL
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
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

function* workerReviewListAssignmentAllocateSaga(data) {
  try {
    const userResponse = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSIGNMENT_REVIEW_LIST_URL
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
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewListAssignmentSaga() {
  yield takeLatest(ASSIGNMENT_REVIEW_DISTINCT_SAGA, workerReviewListAssignmentSaga);
  yield takeLatest(GET_ASSIGNMENTTYPE_ASSIGNMENT_REVIEWLIST_SAGA, workeAssignmentTypeAssignment);
  yield takeLatest(GET_ASSIGNMENTGROUP_ASSIGNMENT_REVIEWLIST_SAGA, workeAssignmentGroupAssignment);
  yield takeLatest(GET_NODE_ASSIGNMENTS_REVIEW_LIST_SAGA, workerAssignmentNodeAssignment);
  yield takeLatest(GET_ALLOCATE_ASSIGNMENT, workerReviewListAssignmentAllocateSaga);
}
