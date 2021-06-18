import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  SET_JOB_REDUCER_STATE,
  GET_JOB_PROFILE_INFO_SAGA,
  JOB_PROFILE_INFO_REVISE_SAGA,
  SET_JOB_DYNAMIC_SINGLE_STATE
} from '../../actionType';
import { JOB_PROFILE_REVIEW_INFO_URL, JOB_PROFILE_REVISE_INFO_URL } from '../../endpoints';

const jobProfileReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = JOB_PROFILE_REVIEW_INFO_URL;
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

function* workerReviewInfoJobProfileSaga(data) {
  try {
    const userResponse = yield call(jobProfileReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false } = data.payload;
      console.log('jobProfile=======>', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'job profile',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        const { informationBasic, informationAllocation } = userResponse.responseObject[0];
        yield put({
          type: SET_JOB_REDUCER_STATE,
          payload: informationBasic
        });
        if (
          informationAllocation &&
          informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary &&
          informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary.length > 0
        ) {
          let tempArr = informationAllocation.jobProfileGroup.jobProfileGroupPrimary.map((ob) => ob.id);
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileGroup',
              actualStateName: 'jobProfileGroupPrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileGroup',
              actualStateName: 'jobProfileGroupPrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.jobProfileGroup?.jobProfileGroupSecondary &&
          informationAllocation?.jobProfileGroup?.jobProfileGroupSecondary.length > 0
        ) {
          let tempArr = informationAllocation.jobProfileGroup.jobProfileGroupSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileGroup',
              actualStateName: 'jobProfileGroupSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileGroup',
              actualStateName: 'jobProfileGroupSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.jobProfileNode?.jobProfileNodePrimary &&
          informationAllocation?.jobProfileNode?.jobProfileNodePrimary.length > 0
        ) {
          let tempArr = informationAllocation.jobProfileNode.jobProfileNodePrimary.map((ob) => ob.id);
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileNode',
              actualStateName: 'jobProfileNodePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileNode',
              actualStateName: 'jobProfileNodePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.jobProfileNode?.jobProfileNodeSecondary &&
          informationAllocation?.jobProfileNode?.jobProfileNodeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.jobProfileNode.jobProfileNodeSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileNode',
              actualStateName: 'jobProfileNodeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileNode',
              actualStateName: 'jobProfileNodeSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.jobProfileType?.jobProfileTypePrimary &&
          informationAllocation?.jobProfileType?.jobProfileTypePrimary.length > 0
        ) {
          let tempArr = informationAllocation.jobProfileType.jobProfileTypePrimary.map((ob) => ob.id);
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileType',
              actualStateName: 'jobProfileTypePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileType',
              actualStateName: 'jobProfileTypePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.jobProfileType?.jobProfileTypeSecondary &&
          informationAllocation?.jobProfileType?.jobProfileTypeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.jobProfileType.jobProfileTypeSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileType',
              actualStateName: 'jobProfileTypeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_JOB_DYNAMIC_SINGLE_STATE,
            payload: {
              objectName: 'informationAllocation',
              stateName: 'jobProfileType',
              actualStateName: 'jobProfileTypeSecondary',
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
const jobProfileReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = JOB_PROFILE_REVISE_INFO_URL;
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

function* workerReviseInfoJobProfileSaga(data) {
  try {
    const userResponse = yield call(jobProfileReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'job profile',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
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

export default function* watchReviewInfoJobProfileSaga() {
  yield takeLatest(GET_JOB_PROFILE_INFO_SAGA, workerReviewInfoJobProfileSaga);
  yield takeLatest(JOB_PROFILE_INFO_REVISE_SAGA, workerReviseInfoJobProfileSaga);
}
