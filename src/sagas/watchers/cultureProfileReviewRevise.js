import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  SET_CULTURE_REDUCER_STATE,
  GET_CULTURE_PROFILE_INFO_SAGA,
  CULTURE_PROFILE_INFO_REVISE_SAGA,
  SET_CULTURE_DYNAMIC_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_CULTUREPROFILE_REVIEW_LIST_SAGA
} from '../../actionType';
import { CULTURE_PROFILE_REVIEW_INFO_URL, CULTURE_PROFILE_REVISE_INFO_URL } from '../../endpoints';
import Store from '../../store';

const cultureProfileReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_PROFILE_REVIEW_INFO_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewInfoCultureProfileSaga(data) {
  try {
    const userResponse = yield call(cultureProfileReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false } = data.payload;
      console.log('cultureProfile=======>', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'culture profile',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        const { informationBasic, informationAllocation } = userResponse.responseObject[0];
        yield put({
          type: SET_CULTURE_REDUCER_STATE,
          payload: informationBasic
        });
        if (
          informationAllocation &&
          informationAllocation?.cultureProfileGroup?.cultureProfileGroupPrimary &&
          informationAllocation?.cultureProfileGroup?.cultureProfileGroupPrimary.length > 0
        ) {
          let tempArr = informationAllocation.cultureProfileGroup.cultureProfileGroupPrimary.map((ob) => ob.id);
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileGroup',
              actualStateName: 'cultureProfileGroupPrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileGroup',
              actualStateName: 'cultureProfileGroupPrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.cultureProfileGroup?.cultureProfileGroupSecondary &&
          informationAllocation?.cultureProfileGroup?.cultureProfileGroupSecondary.length > 0
        ) {
          let tempArr = informationAllocation.cultureProfileGroup.cultureProfileGroupSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileGroup',
              actualStateName: 'cultureProfileGroupSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileGroup',
              actualStateName: 'cultureProfileGroupSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.cultureProfileNode?.cultureProfileNodePrimary &&
          informationAllocation?.cultureProfileNode?.cultureProfileNodePrimary.length > 0
        ) {
          let tempArr = informationAllocation.cultureProfileNode.cultureProfileNodePrimary.map((ob) => ob.id);
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileNode',
              actualStateName: 'cultureProfileNodePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileNode',
              actualStateName: 'cultureProfileNodePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.cultureProfileNode?.cultureProfileNodeSecondary &&
          informationAllocation?.cultureProfileNode?.cultureProfileNodeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.cultureProfileNode.cultureProfileNodeSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileNode',
              actualStateName: 'cultureProfileNodeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileNode',
              actualStateName: 'cultureProfileNodeSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.cultureProfileType?.cultureProfileTypePrimary &&
          informationAllocation?.cultureProfileType?.cultureProfileTypePrimary.length > 0
        ) {
          let tempArr = informationAllocation.cultureProfileType.cultureProfileTypePrimary.map((ob) => ob.id);
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileType',
              actualStateName: 'cultureProfileTypePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileType',
              actualStateName: 'cultureProfileTypePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.cultureProfileType?.cultureProfileTypeSecondary &&
          informationAllocation?.cultureProfileType?.cultureProfileTypeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.cultureProfileType.cultureProfileTypeSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileType',
              actualStateName: 'cultureProfileTypeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_CULTURE_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'cultureProfileType',
              actualStateName: 'cultureProfileTypeSecondary',
              value: []
            }
          });
        }
      }
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
const cultureProfileReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_PROFILE_REVISE_INFO_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviseInfoCultureProfileSaga(data) {
  try {
    const userResponse = yield call(cultureProfileReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'culture profile',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          createMode
        }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'culture profiles',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
    } else {
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewInfoCultureProfileSaga() {
  yield takeLatest(GET_CULTURE_PROFILE_INFO_SAGA, workerReviewInfoCultureProfileSaga);
  yield takeLatest(CULTURE_PROFILE_INFO_REVISE_SAGA, workerReviseInfoCultureProfileSaga);
}
