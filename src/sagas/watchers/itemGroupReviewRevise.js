import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ITEMGROUPITEM_REVIEW_LIST_SAGA,
  GET_ITEM_GROUP_REVIEW_INFO_SAGA,
  GET_ITEM_GROUP_REVIEW_LIST_SAGA,
  ITEM_GROUP_REVISE_INFO_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_GROUP_SETUP_STATE,
  SET_ITEM_GROUP_REDUCER_STATE,
  SET_POPUP_VALUE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST
} from '../../actionType';
import { ITEM_REVISE_GROUP_URL, ITEM_REVIEW_GROUP_URL } from '../../endpoints';
import Store from '../../store';

const itemGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ITEM_REVIEW_GROUP_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewItemGroupInfoSaga(data) {
  try {
    const userResponse = yield call(itemGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, itemGroupItemReqBody = null } = data.payload;
      if (itemGroupItemReqBody !== null) {
        yield put({
          type: GET_ITEMGROUPITEM_REVIEW_LIST_SAGA,
          payload: {
            request: itemGroupItemReqBody,
            HeaderOne: 'items',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'items',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ITEM_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_GROUP_SETUP_STATE,
          payload: {
            objectName: 'itemGroup',
            value: userResponse.responseObject[0].informationSetup
          }
        });
      }
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
const itemGroupReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ITEM_REVISE_GROUP_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviseItemGroupInfoSaga(data) {
  try {
    const userResponse = yield call(itemGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { createMode = '', itemGroupItemReqBody = null } = data.payload;
      if (itemGroupItemReqBody !== null) {
        yield put({
          type: GET_ITEMGROUPITEM_REVIEW_LIST_SAGA,
          payload: {
            request: itemGroupItemReqBody,
            HeaderOne: 'items',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'items',
            headerOneBadgeOne: 'group',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
      }

      yield put({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: [] });
      yield put({
        type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
        payload: []
      });
      // if (createMode === '') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_ITEM_GROUP_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'items',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
      // yield put({
      //   type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
      //   payload: {
      //     HeaderOne: middlePaneHeader,
      //     request:,
      //     BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
      //     BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
      //     BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
      //     middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
      //     isMiddlePaneList: true
      //   }
      // });
      // }
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewItemGroupInfoSaga() {
  yield takeLatest(GET_ITEM_GROUP_REVIEW_INFO_SAGA, workerReviewItemGroupInfoSaga);
  yield takeLatest(ITEM_GROUP_REVISE_INFO_SAGA, workerReviseItemGroupInfoSaga);
}
