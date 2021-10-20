import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_POPUP_VALUE,
  SET_MIDDLEPANE_STATE,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_ROLE_REVIEW_LIST_DATA,
  GET_ITEM_REVIEW_LIST_SAGA,
  GET_ITEMGROUPITEM_REVIEW_LIST_SAGA,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  SET_REVIEW_LIST_RELATE_DATA,
  GET_ITEMTYPEITEM_REVIEW_LIST_SAGA,
  GET_NODE_ITEMS_REVIEW_LIST_SAGA,
  GET_ALLOCATE_ITEM,
  SET_ITEM_FRAMWORK_TYPE,
  GET_FRAMWORK_TYPE_REVIEW_LIST_SAGA,
  LOADER_START
} from '../../actionType';
import {
  ITEM_REVIEWLIST_URL,
  ITEMGROUPITEM_REVIEWLIST_URL,
  ITEMNODEITEM_REVIEWLIST_URL,
  ITEMTYPEPITEM_REVIEWLIST_URL,
  CONFIG_ITEM_URL
} from '../../endpoints';

const apiCall = async (requestObj) => {
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

function* workerReviewListItemsSaga(data) {
  console.log('data.payload', data.payload);
  try {
    const userResponse = yield call(apiCall, {
      data: data.payload.request,
      URL: ITEM_REVIEWLIST_URL
    });
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'items',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'itemsDistinctReviewList',
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
function* workeItemGroupItemReviewListSaga(data) {
  try {
    const response = yield call(apiCall, {
      data: data.payload.request,
      URL: ITEMGROUPITEM_REVIEWLIST_URL
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: response.responseObject
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
            typeOfMiddlePaneList: 'itemGroupItemReviewList',
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
function* workeItemTypeItemReviewListSaga(data) {
  try {
    const response = yield call(apiCall, {
      data: data.payload.request,
      URL: ITEMTYPEPITEM_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'itemTypeItemReviewList',
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
function* workeItemNodeItemReviewListSaga(data) {
  try {
    const response = yield call(apiCall, {
      data: data.payload.request,
      URL: ITEMNODEITEM_REVIEWLIST_URL
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
            typeOfMiddlePaneList: 'itemNodeItemReviewList',
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

function* workerItemAllocateReviewListSaga(data) {
  try {
    const userResponse = yield call(apiCall, {
      data: data.payload.request,
      URL: ITEM_REVIEWLIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      let responseObj = {
        ...data.payload.revisedGroupObject,
        item: userResponse.responseObject
      };
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: data.payload.headerOne || 'items',
          middlePaneHeaderBadgeOne: 'distinct',
          middlePaneHeaderBadgeTwo: 'active',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.typeOfMiddlePaneList,
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true,
          isSelectActive: 'multiple',
          selectedTagsArray: data.payload.existingItemId
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

function* workerItemTypeReviewListSaga(data) {
  try {
    const userResponse = yield call(apiCall, {
      data: data.payload.request,
      URL: CONFIG_ITEM_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    yield put({ type: LOADER_START });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_ITEM_FRAMWORK_TYPE,
        payload: userResponse?.responseObject || []
      });
    } else {
      yield put({ type: LOADER_STOP });
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

export default function* watchItemReviewListSaga() {
  yield takeLatest(GET_ITEM_REVIEW_LIST_SAGA, workerReviewListItemsSaga);
  yield takeLatest(GET_ITEMGROUPITEM_REVIEW_LIST_SAGA, workeItemGroupItemReviewListSaga);
  yield takeLatest(GET_ITEMTYPEITEM_REVIEW_LIST_SAGA, workeItemTypeItemReviewListSaga);
  yield takeLatest(GET_NODE_ITEMS_REVIEW_LIST_SAGA, workeItemNodeItemReviewListSaga);
  yield takeLatest(GET_ALLOCATE_ITEM, workerItemAllocateReviewListSaga);
  yield takeLatest(GET_FRAMWORK_TYPE_REVIEW_LIST_SAGA, workerItemTypeReviewListSaga);
}
