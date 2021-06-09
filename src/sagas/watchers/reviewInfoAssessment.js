import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSESSMENT_INFO_SAGA,
  SET_ASSESSMENT_BASIC_REDUCER_STATE,
  ASSESSMENT_INFO_REVISE_SAGA,
  SET_ASSESSMENT_DYNAMIC_SINGLE_STATE
} from '../../actionType';
import { ASSESSMENT_REVIEW_INFO_URL, ASSESSMENT_REVISE_INFO_URL } from '../../endpoints';

const assessmentReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSMENT_REVIEW_INFO_URL;
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

function* workerReviewInfoAssessmentSaga(data) {
  try {
    const userResponse = yield call(assessmentReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false } = data.payload;
      console.log('ASSESSMENT_REVIEW_INFO=======>', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        const { informationAllocation } = userResponse.responseObject[0];
        yield put({
          type: SET_ASSESSMENT_BASIC_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        if (
          informationAllocation &&
          informationAllocation?.assessmentGroup?.assessmentGroupPrimary &&
          informationAllocation?.assessmentGroup?.assessmentGroupPrimary.length > 0
        ) {
          let tempArr = informationAllocation.assessmentGroup.assessmentGroupPrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentGroup',
              actualStateName: 'assessmentGroupPrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentGroup',
              actualStateName: 'assessmentGroupPrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assessmentGroup?.assessmentGroupSecondary &&
          informationAllocation?.assessmentGroup?.assessmentGroupSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assessmentGroup.assessmentGroupSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentGroup',
              actualStateName: 'assessmentGroupSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentGroup',
              actualStateName: 'assessmentGroupSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assessmentNode?.assessmentNodePrimary &&
          informationAllocation?.assessmentNode?.assessmentNodePrimary.length > 0
        ) {
          let tempArr = informationAllocation.assessmentNode.assessmentNodePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentNode',
              actualStateName: 'assessmentNodePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentNode',
              actualStateName: 'assessmentNodePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assessmentNode?.assessmentNodeSecondary &&
          informationAllocation?.assessmentNode?.assessmentNodeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assessmentNode.assessmentNodeSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentNode',
              actualStateName: 'assessmentNodeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentNode',
              actualStateName: 'assessmentNodeSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assessmentType?.assessmentTypePrimary &&
          informationAllocation?.assessmentType?.assessmentTypePrimary.length > 0
        ) {
          let tempArr = informationAllocation.assessmentType.assessmentTypePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentType',
              actualStateName: 'assessmentTypePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentType',
              actualStateName: 'assessmentTypePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assessmentType?.assessmentTypeSecondary &&
          informationAllocation?.assessmentType?.assessmentTypeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assessmentType.assessmentTypeSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentType',
              actualStateName: 'assessmentTypeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assessmentType',
              actualStateName: 'assessmentTypeSecondary',
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
const assessmentReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSMENT_REVISE_INFO_URL;
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

function* workerReviseInfoAssessmentSaga(data) {
  try {
    const userResponse = yield call(assessmentReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessment',
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

export default function* watchReviewInfoAssessmentSaga() {
  yield takeLatest(GET_ASSESSMENT_INFO_SAGA, workerReviewInfoAssessmentSaga);
  yield takeLatest(ASSESSMENT_INFO_REVISE_SAGA, workerReviseInfoAssessmentSaga);
}
