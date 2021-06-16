import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ITEM_INFO_SAGA,
  ITEM_INFO_REVISE_SAGA,
  SET_TYPE_REDUCER_STATE,
  SET_ITEM_DYNAMIC_SINGLE_STATE
} from '../../actionType';
import { ITEM_REVISE_URL, ITEM_REVIEW_URL } from '../../endpoints';

const itemReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ITEM_REVIEW_URL;
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

function* workerReviewInfoItemSaga(data) {
  try {
    const userResponse = yield call(itemReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false } = data.payload;
      console.log('Item Review=======>', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'item',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        const { informationBasic, informationAllocation } = userResponse.responseObject[0];
        yield put({
          type: SET_TYPE_REDUCER_STATE,
          payload: informationBasic
        });
        if (
          informationAllocation &&
          informationAllocation?.itemGroup?.itemGroupPrimary &&
          informationAllocation?.itemGroup?.itemGroupPrimary.length > 0
        ) {
          let tempArr = informationAllocation.itemGroup.itemGroupPrimary.map((ob) => ob.id);
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemGroup',
              actualStateName: 'itemGroupPrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemGroup',
              actualStateName: 'itemGroupPrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.itemGroup?.itemGroupSecondary &&
          informationAllocation?.itemGroup?.itemGroupSecondary.length > 0
        ) {
          let tempArr = informationAllocation.itemGroup.itemGroupSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemGroup',
              actualStateName: 'itemGroupSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemGroup',
              actualStateName: 'itemGroupSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.itemNode?.itemNodePrimary &&
          informationAllocation?.itemNode?.itemNodePrimary.length > 0
        ) {
          let tempArr = informationAllocation.itemNode.itemNodePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemNode',
              actualStateName: 'itemNodePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemNode',
              actualStateName: 'itemNodePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.itemNode?.itemNodeSecondary &&
          informationAllocation?.itemNode?.itemNodeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.itemNode.itemNodeSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemNode',
              actualStateName: 'itemNodeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemNode',
              actualStateName: 'itemNodeSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.itemType?.itemTypePrimary &&
          informationAllocation?.itemType?.itemTypePrimary.length > 0
        ) {
          let tempArr = informationAllocation.itemType.itemTypePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemType',
              actualStateName: 'itemTypePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemType',
              actualStateName: 'itemTypePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.itemType?.itemTypeSecondary &&
          informationAllocation?.itemType?.itemTypeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.itemType.itemTypeSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemType',
              actualStateName: 'itemTypeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ITEM_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'itemType',
              actualStateName: 'itemTypeSecondary',
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
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
const itemReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ITEM_REVISE_URL;
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

function* workerReviseInfoItemSaga(data) {
  try {
    const userResponse = yield call(itemReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'item',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject,
          createMode
        }
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

export default function* watchReviewInfoItemSaga() {
  yield takeLatest(GET_ITEM_INFO_SAGA, workerReviewInfoItemSaga);
  yield takeLatest(ITEM_INFO_REVISE_SAGA, workerReviseInfoItemSaga);
}
