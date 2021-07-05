import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  CREATE_ASSIGNMENT_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_ASSIGNMENT_BASIC_REDUCER_STATE,
  SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
  SET_ASSIGNMENT_RELATED_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { ASSIGNMENT_CREATE_URL } from '../../endpoints';

const createAssignmentApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSIGNMENT_CREATE_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssignmentSaga(data) {
  try {
    const apiResponse = yield call(createAssignmentApi, { data: data.payload });
    if (apiResponse.responseCode === '000') {
      console.log('loading end', data.payload.whichTypeCreate);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assignment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: Store.getState().DisplayPaneTwoReducer.selectedInformationAllorKey,
          responseObject: apiResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: 'assignment'
        }
      });
      const {informationAllocation, informationBasic} = apiResponse.responseObject[0];
      yield put({
        type: SET_ASSIGNMENT_BASIC_REDUCER_STATE,
        payload: informationBasic
      });
      if (
        informationAllocation &&
        informationAllocation?.assignmentGroup?.assignmentGroupPrimary &&
        informationAllocation?.assignmentGroup?.assignmentGroupPrimary.length > 0
      ) {
        let tempArr = informationAllocation.assignmentGroup.assignmentGroupPrimary.map(
          (ob) => ob.id
        );
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentGroup',
            actualStateName: 'assignmentGroupPrimary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentGroup',
            actualStateName: 'assignmentGroupPrimary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.assignmentGroup?.assignmentGroupSecondary &&
        informationAllocation?.assignmentGroup?.assignmentGroupSecondary.length > 0
      ) {
        let tempArr = informationAllocation.assignmentGroup.assignmentGroupSecondary.map(
          (ob) => ob.id
        );
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentGroup',
            actualStateName: 'assignmentGroupSecondary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentGroup',
            actualStateName: 'assignmentGroupSecondary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.assignmentNode?.assignmentNodePrimary &&
        informationAllocation?.assignmentNode?.assignmentNodePrimary.length > 0
      ) {
        let tempArr = informationAllocation.assignmentNode.assignmentNodePrimary.map(
          (ob) => ob.id
        );
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentNode',
            actualStateName: 'assignmentNodePrimary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentNode',
            actualStateName: 'assignmentNodePrimary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.assignmentNode?.assignmentNodeSecondary &&
        informationAllocation?.assignmentNode?.assignmentNodeSecondary.length > 0
      ) {
        let tempArr = informationAllocation.assignmentNode.assignmentNodeSecondary.map(
          (ob) => ob.id
        );
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentNode',
            actualStateName: 'assignmentNodeSecondary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentNode',
            actualStateName: 'assignmentNodeSecondary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.assignmentType?.assignmentTypePrimary &&
        informationAllocation?.assignmentType?.assignmentTypePrimary.length > 0
      ) {
        let tempArr = informationAllocation.assignmentType.assignmentTypePrimary.map(
          (ob) => ob.id
        );
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentType',
            actualStateName: 'assignmentTypePrimary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentType',
            actualStateName: 'assignmentTypePrimary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.assignmentType?.assignmentTypeSecondary &&
        informationAllocation?.assignmentType?.assignmentTypeSecondary.length > 0
      ) {
        let tempArr = informationAllocation.assignmentType.assignmentTypeSecondary.map(
          (ob) => ob.id
        );
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentType',
            actualStateName: 'assignmentTypeSecondary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'assignmentType',
            actualStateName: 'assignmentTypeSecondary',
            value: []
          }
        });
      }
      let assignmentAssessee =
        apiResponse.responseObject[0]?.informationFramework?.assignmentAssessee || [];
      let assignmentAssessment =
        apiResponse.responseObject[0]?.informationFramework?.assignmentAssessment || [];
      let assignmentCultureProfile =
        apiResponse.responseObject[0]?.informationFramework?.assignmentCultureProfile || [];
      let assignmentJobProfile =
        apiResponse.responseObject[0]?.informationFramework?.assignmentJobProfile || [];
      yield put({
        type: SET_ASSIGNMENT_RELATED_LIST,
        payload: { listName: 'assignmentAssesseeList', value: assignmentAssessee }
      });
      yield put({
        type: SET_ASSIGNMENT_RELATED_LIST,
        payload: { listName: 'assignmentAssessmentList', value: assignmentAssessment }
      });
      yield put({
        type: SET_ASSIGNMENT_RELATED_LIST,
        payload: { listName: 'assignmentCultureProfileList', value: assignmentCultureProfile }
      });
      yield put({
        type: SET_ASSIGNMENT_RELATED_LIST,
        payload: { listName: 'assignmentJobProfileList', value: assignmentJobProfile }
      });
    }
    yield put({ type: LOADER_STOP });
    yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    // yield put({ type: CLEAR_ASSIGNMENT_INFO });
    yield put({ type: POPUP_CLOSE });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchCreateAssignmentSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSIGNMENT_SAGA, workerCreateAssignmentSaga);
}
