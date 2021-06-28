import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSOCIATE_TYPE_INFO_REVISE_SAGA,
  GET_ASSOCIATETYPE_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_ASSOCIATE_TYPE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST
} from '../../actionType';
import { ASSOCIATE_REVIEW_TYPE_URL, ASSOCIATE_REVISE_TYPE_URL } from '../../endpoints';
import Store from '../../store';

const associateTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_TYPE_URL;
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

function* workerReviewAssociateTypeInfoSaga(data) {
  try {
    const userResponse = yield call(associateTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, associateTypeAssociateReqBody = null } = data.payload;
      if (associateTypeAssociateReqBody !== null) {
        yield put({
          type: GET_ASSOCIATETYPE_ASSOCIATE_REVIEW_LIST_SAGA,
          payload: {
            request: associateTypeAssociateReqBody,
            HeaderOne: 'associates',
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
          headerOne: 'associates',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSOCIATE_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_TYPE_GROUP_ALLOCATION,
          payload: {
            objectName: 'associateType',
            stateName: 'associateTypeGroup',
            value:
              userResponse?.responseObject[0]?.informationAllocation?.associateTypeGroup?.id || ''
          }
        });
      }
    } else {
      yield put({ type: LOADER_STOP });
    }

    console.log('loading end');
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
const associateTypeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVISE_TYPE_URL;
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

function* workerReviseAssociateTypeInfoSaga(data) {
  try {
    const userResponse = yield call(associateTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { createMode, associateTypeAssociateReqBody = null } = data.payload;
      if (associateTypeAssociateReqBody !== null) {
        yield put({
          type: GET_ASSOCIATETYPE_ASSOCIATE_REVIEW_LIST_SAGA,
          payload: {
            request: associateTypeAssociateReqBody,
            HeaderOne: 'associates',
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
          headerOne: 'associates',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          createMode
        }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'associates',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
    } else {
      yield put({ type: LOADER_STOP });
    }
    yield put({ type: SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
    yield put({ type: SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
    console.log('loading end');
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssociateTypeInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_TYPE_REVIEW_INFO_SAGA, workerReviewAssociateTypeInfoSaga);
  yield takeLatest(ASSOCIATE_TYPE_INFO_REVISE_SAGA, workerReviseAssociateTypeInfoSaga);
}
