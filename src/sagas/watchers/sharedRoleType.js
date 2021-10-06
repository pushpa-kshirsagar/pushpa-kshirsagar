import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SHARE_ROLES_TYPES_SAGA,
  LOADER_STOP,
  SET_POPUP_VALUE,
  POPUP_CLOSE,
  SET_REQUEST_OBJECT,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  GET_CULTUREPROFILE_TYPE_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA
} from '../../actionType';
import {
  ASSESSEE_ROLE_SHARE_URL,
  ASSESSEE_ROLE_UNSHARE_URL,
  ASSOCIATE_ROLE_SHARE_URL,
  ASSOCIATE_ROLE_UNSHARE_URL,
  ASSOCIATE_TYPE_SHARE_URL,
  ASSOCIATE_TYPE_UNSHARE_URL,
  ASSESSEE_TYPE_SHARE_URL,
  ASSESSEE_TYPE_UNSHARE_URL,
  ITEM_TYPE_SHARE_URL,
  ITEM_TYPE_UNSHARE_URL,
  ASSESSMENT_TYPE_SHARE_URL,
  ASSESSMENT_TYPE_UNSHARE_URL,
  ASSIGNMENT_TYPE_SHARE_URL,
  ASSIGNMENT_TYPE_UNSHARE_URL,
  CULTURE_TYPE_SHARE_URL,
  CULTURE_TYPE_UNSHARE_URL,
  JOB_TYPE_SHARE_URL,
  JOB_TYPE_UNSHARE_URL
} from '../../endpoints';
import Store from '../../store';

const sharedApiCall = async (requestObj) => {
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

function* workerRoleTypeShareSaga(data) {
  try {
    let APIURL = '';
    if (data.payload.shareValue === 'assesseeRole') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSESSEE_ROLE_SHARE_URL
          : ASSESSEE_ROLE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'associateRole') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSOCIATE_ROLE_SHARE_URL
          : ASSOCIATE_ROLE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'assesseeType') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSESSEE_TYPE_SHARE_URL
          : ASSESSEE_TYPE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'associateType') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSOCIATE_TYPE_SHARE_URL
          : ASSOCIATE_TYPE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'itemType') {
      APIURL =
        data.payload.apiCall === 'shareApiCall' ? ITEM_TYPE_SHARE_URL : ITEM_TYPE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'assessmentType') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSESSMENT_TYPE_SHARE_URL
          : ASSESSMENT_TYPE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'assignmentType') {
      APIURL =
        data.payload.apiCall === 'shareApiCall'
          ? ASSIGNMENT_TYPE_SHARE_URL
          : ASSIGNMENT_TYPE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'cultureProfileType') {
      APIURL =
        data.payload.apiCall === 'shareApiCall' ? CULTURE_TYPE_SHARE_URL : CULTURE_TYPE_UNSHARE_URL;
    }
    if (data.payload.shareValue === 'jobProfileType') {
      APIURL = data.payload.apiCall === 'shareApiCall' ? JOB_TYPE_SHARE_URL : JOB_TYPE_UNSHARE_URL;
    }
    // if (data.payload.shareValue === 'assesseeGroup') {
    //   APIURL = data.payload.apiCall === 'shareApiCall' ? ASSESSSEE_GROUP_SHARE_URL : ASSESSSEE_GROUP_UNSHARE_URL;
    // }
    // if (data.payload.shareValue === 'assessementGroup') {
    //   APIURL = data.payload.apiCall === 'shareApiCall' ? ASSESSMENT_GROUP_SHARE_URL : ASSESSMENT_GROUP_UNSHARE_URL;
    // }
    // if (data.payload.shareValue === 'assignmentGroup') {
    //   APIURL = data.payload.apiCall === 'shareApiCall' ? ASSIGNMENT_GROUP_SHARE_URL : ASSIGNMENT_GROUP_UNSHARE_URL;
    // }
    // if (data.payload.shareValue === 'associateGroup') {
    //   APIURL = data.payload.apiCall === 'shareApiCall' ? ASSOCIATE_GROUP_SHARE_URL : ASSOCIATE_GROUP_UNSHARE_URL;
    // }
    // if (data.payload.shareValue === 'cultureProfileGroup') {
    //   APIURL = data.payload.apiCall === 'shareApiCall' ? CULTUREPROFILE_GROUP_SHARE_URL : CULTUREPROFILE_GROUP_UNSHARE_URL;
    // }
    // if (data.payload.shareValue === 'jobProfileGroup') {
    //   APIURL = data.payload.apiCall === 'shareApiCall' ? JOB_TYPE_SHARE_URL : JOB_TYPE_UNSHARE_URL;
    // }
    // if (data.payload.shareValue === 'itemGroup') {
    //   APIURL = data.payload.apiCall === 'shareApiCall' ? ITEM_GROUP_SHARE_URL : ITEM_GROUP_UNSHARE_URL;
    // }
    const userResponse = yield call(sharedApiCall, {
      data: data.payload.request,
      URL: APIURL
    });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_REQUEST_OBJECT,
        payload: Store.getState().DisplayPaneTwoReducer.reviewListReqObj
      });
      yield put({
        type:
          data.payload.shareValue === 'assesseeRole'
            ? GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'associateRole'
            ? GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'assesseeType'
            ? GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'associateType'
            ? GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'itemType'
            ? GET_ITEM_TYPE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'assessmentType'
            ? GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'assignmentType'
            ? GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'cultureProfileType'
            ? GET_CULTUREPROFILE_TYPE_REVIEW_LIST_SAGA
            : data.payload.shareValue === 'jobProfileType'
            ? GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA
            : null,
        payload: {
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          isMiddlePaneList: true
        }
      });
      yield put({ type: POPUP_CLOSE });
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
export default function* watchRoleTypeShareSaga() {
  yield takeLatest(SHARE_ROLES_TYPES_SAGA, workerRoleTypeShareSaga);
}
