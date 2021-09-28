import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE,
  CULTURE_GROUP_CULTURE_REVIEWLIST_SAGA,
  CULTURE_TYPE_CULTURE_REVIEWLIST_SAGA,
  SET_REVIEW_LIST_RELATE_DATA,
  GET_ALLOCATE_CULTURE,
  GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA,
  GET_CULTURE_DIAMENTION_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_NEXT_POPUP
} from '../../actionType';
import {
  CULTURE_GROUP_CULTURE_REVIEWLIST_URL,
  CULTURE_REVIEWLIST_URL,
  CULTURE_TYPE_CULTURE_REVIEWLIST_URL,
  CULTURE_NODE_CULTURE_REVIEWLIST_URL,
  CULTURE_DIAMENTION_URL
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

function* workerCultureProfileReviewListSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: CULTURE_REVIEWLIST_URL
    });
    if (response.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'culture profiles',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'cultureProfilesDistinctReviewList',
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
function* workeCultureGroupCultureReviewListSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: CULTURE_GROUP_CULTURE_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'cultureProfileGroupCultureProfileReviewList',
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
function* workeCultureTypeCultureReviewListSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: CULTURE_TYPE_CULTURE_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'cultureProfileTypeCultureProfileReviewList',
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
function* workeCultureNodeCultureReviewListSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: CULTURE_NODE_CULTURE_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'cultureProfileNodeCultureProfileReviewList',
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
function* workerReviewListCultureDimentionSaga(data) {
  try {
    const response = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: CULTURE_DIAMENTION_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'cultureProfileDiamentionReviewList', value: response.responseObject }
      });
      yield put({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'POPUPDIAMENTIONMSG' } });
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

function* workerReviewListCultureProfileAllocateSaga(data) {
  try {
    const userResponse = yield call(apiCallFunction, {
      data: data.payload.request,
      URL: CULTURE_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      let responseObj = {
        ...data.payload.revisedGroupObject,
        cultureProfile: userResponse.responseObject
      };
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: data.payload.headerOne || 'culture profiles',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.typeOfMiddlePaneList,
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true,
          isSelectActive: 'multiple',
          selectedTagsArray: data.payload.existingCultureProfileId
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
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewListCultureProfileSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_CULTUREPROFILE_REVIEW_LIST_SAGA, workerCultureProfileReviewListSaga);
  yield takeLatest(CULTURE_GROUP_CULTURE_REVIEWLIST_SAGA, workeCultureGroupCultureReviewListSaga);
  yield takeLatest(CULTURE_TYPE_CULTURE_REVIEWLIST_SAGA, workeCultureTypeCultureReviewListSaga);
  yield takeLatest(GET_ALLOCATE_CULTURE, workerReviewListCultureProfileAllocateSaga);
  yield takeLatest(GET_CULTURE_DIAMENTION_SAGA, workerReviewListCultureDimentionSaga);
  yield takeLatest(
    GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA,
    workeCultureNodeCultureReviewListSaga
  );
}
