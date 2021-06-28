import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSESSEE_ROLE_GROUP_REVIEW_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_ROLE_REVIEW_LIST_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  ASSESSEE_ROLE_GROUP_URL,
  ASSESSEE_ROLE_REVIEW_LIST_URL,
  ASSOCIATE_ROLE_GROUP_URL,
  ASSOCIATE_ROLE_REVIEW_LIST_URL
} from '../../endpoints';

const apiCall = async (requestObj) => {
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
function* workerReviewAssesseeRoleListSaga(data) {
  try {
    const userResponse = yield call(apiCall, {
      data: data.payload.request,
      URL: ASSESSEE_ROLE_REVIEW_LIST_URL
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
            typeOfMiddlePaneList: 'assesseeRoleDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_ROLE_REVIEW_LIST_DATA,
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
function* workerReviewAssociateRoleListSaga(data) {
  try {
    const userResponse = yield call(apiCall, {
      data: data.payload.request,
      URL: ASSOCIATE_ROLE_REVIEW_LIST_URL
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
            typeOfMiddlePaneList: 'associateRoleDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_ROLE_REVIEW_LIST_DATA,
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
function* workerReviewAssesseeRoleGroupListSaga(data) {
  try {
    const userResponse = yield call(apiCall, {
      data: data.payload.request,
      URL:
        data.payload.typeGroup === 'assessees' ? ASSESSEE_ROLE_GROUP_URL : ASSOCIATE_ROLE_GROUP_URL
    });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_CORE_ROLE_REVIEW_LIST_DATA,
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewRolesListSaga() {
  yield takeLatest(GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA, workerReviewAssesseeRoleListSaga);
  yield takeLatest(GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA, workerReviewAssociateRoleListSaga);
  yield takeLatest(GET_ASSESSEE_ROLE_GROUP_REVIEW_LIST_SAGA, workerReviewAssesseeRoleGroupListSaga);
}
