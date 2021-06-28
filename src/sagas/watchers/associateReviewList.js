import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_MIDDLEPANE_STATE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
  SET_POPUP_VALUE,
  SET_REVIEW_LIST_RELATE_DATA,
  LOADER_START,
  GET_ALLOCATE_ASSOCIATE,
  GET_ASSOCIATETYPE_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_NODE_ASSOCIATE_REVIEW_LIST
} from '../../actionType';
import {
  ASSOCIATE_GROUP_ASSOCIATE_URL,
  ASSOCIATE_REVIEWDISTINCT_LIST_URL,
  ASSOCIATE_ROLE_ASSOCIATE_URL,
  ASSOCIATE_TYPE_ASSOCIATE_URL,
  EXTERNAL_NODE_LIST_URL,
  ASSOCIATE_NODE_ASSOCIATE_URL
} from '../../endpoints';

const reviewListDistinctApi = async (requestObj) => {
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

function* workerReviewListAssociateSaga(data) {
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_REVIEWDISTINCT_LIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'associates',
          middlePaneHeaderBadgeOne: data.payload.BadgeOne,
          middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'associateDistinctReviewList',
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
function* workerReviewListAssociateGroupAssociateSaga(data) {
  yield put({ type: LOADER_START });
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_GROUP_ASSOCIATE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: userResponse.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'associates',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'associatesGroupAssociateReviewList',
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
function* workerReviewListAssociateRoleAssociateSaga(data) {
  yield put({ type: LOADER_START });
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_ROLE_ASSOCIATE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: userResponse.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'associates',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'associatesRoleAssociateReviewList',
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
function* workerAssociateTypeAssociateSaga(data) {
  yield put({ type: LOADER_START });
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_TYPE_ASSOCIATE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: userResponse.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'associates',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'associatesTypeAssociateReviewList',
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
function* workerNodeAssociateSaga(data) {
  yield put({ type: LOADER_START });
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: ASSOCIATE_NODE_ASSOCIATE_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: userResponse.responseObject });
      yield put({ type: SET_REVIEW_LIST_RELATE_DATA, payload: userResponse.responseObject });
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'associates',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'nodeAssociatesReviewList',
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

function* workerReviewListAssociateAllocateSaga(data) {
  try {
    const userResponse = yield call(reviewListDistinctApi, {
      data: data.payload.request,
      URL: EXTERNAL_NODE_LIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      let Arr1 = userResponse.responseObject[0].associateRoot;
      let Arr2 = userResponse.responseObject[0]?.associateDescendantAll || [];
      Arr2.unshift(Arr1);
      let responseObj = {
        ...data.payload.revisedGroupObject,
        associate: Arr2
      };
      yield put({ type: RELATED_REVIEWLIST_DISTINCT_DATA, payload: [responseObj] });
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: data.payload.headerOne || 'associate',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.typeOfMiddlePaneList,
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true,
          isSelectActive: 'multiple',
          selectedTagsArray: data.payload.existingAssesseeId
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

export default function* watchReviewListAssociateSaga() {
  yield takeLatest(ASSOCIATE_REVIEW_DISTINCT_SAGA, workerReviewListAssociateSaga);
  yield takeLatest(GET_ASSOCIATETYPE_ASSOCIATE_REVIEW_LIST_SAGA, workerAssociateTypeAssociateSaga);
  yield takeLatest(GET_NODE_ASSOCIATE_REVIEW_LIST, workerNodeAssociateSaga);
  yield takeLatest(
    GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
    workerReviewListAssociateRoleAssociateSaga
  );
  yield takeLatest(
    GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
    workerReviewListAssociateGroupAssociateSaga
  );
  yield takeLatest(GET_ALLOCATE_ASSOCIATE, workerReviewListAssociateAllocateSaga);
}
