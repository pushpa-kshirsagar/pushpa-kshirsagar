import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSIGNMENT_INFO_SAGA,
  SET_ASSIGNMENT_BASIC_REDUCER_STATE,
  ASSIGNMENT_INFO_REVISE_SAGA,
  SET_ASSIGNMENT_DYNAMIC_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSIGNMENT_REVIEW_DISTINCT_SAGA,
  SET_ASSIGNMENT_RELATED_LIST,
  RESET_ASSIGNMENT_REVIEW_LIST_OBJECT,
  ASSIGNMENT_PUBLISH_SAGA,
  ASSIGNMENT_ADMINISTER_SAGA
} from '../../actionType';
import {
  ASSIGNMENT_PUBLISH_URL,
  ASSIGNMENT_REVIEW_INFO_URL,
  ASSIGNMENT_REVISE_INFO_URL,
  ASSIGNMENT_ADMINISTER_URL
} from '../../endpoints';
import Store from '../../store';

const assignmentReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVIEW_INFO_URL;
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

function* workerReviewInfoAssignmentSaga(data) {
  try {
    const userResponse = yield call(assignmentReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSIGNMENT_REVIEW_INFO=======>', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assignment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      yield put({ type: RESET_ASSIGNMENT_REVIEW_LIST_OBJECT });
      if (isReviseMode) {
        const { informationAllocation, informationBasic } = userResponse.responseObject[0];
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
          userResponse.responseObject[0]?.informationFramework?.assignmentAssessee || [];
        // let assignmentAssessment =
        // userResponse.responseObject[0]?.informationFramework?.assignmentAssessment || [];
        let assignmentAssessment = userResponse.responseObject[0]?.informationFramework?.assignmentAssessment.map(
          (ob) => ob.assessmentId
        );
        let assignmentCultureProfile =
          userResponse.responseObject[0]?.informationFramework?.assignmentCultureProfile || [];
        let assignmentJobProfile =
          userResponse.responseObject[0]?.informationFramework?.assignmentJobProfile || [];
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
      // if (relatedReqObj !== null) {
      //   yield put({
      //     type: GET_ASSIGNMENTDISTINCT_ASSESSEES_REVIEWLIST_SAGA,
      //     payload: {
      //       request: relatedReqObj,
      //       HeaderOne: 'assignments',
      //       BadgeOne: '',
      //       BadgeTwo: '',
      //       BadgeThree: '',
      //       isMiddlePaneList: false
      //     }
      //   });
      //   yield put({
      //     type: GET_ASSIGNMENTDISTINCT_ASSESSMENT_REVIEWLIST_SAGA,
      //     payload: {
      //       request: relatedReqObj,
      //       HeaderOne: 'assignments',
      //       BadgeOne: '',
      //       BadgeTwo: '',
      //       BadgeThree: '',
      //       isMiddlePaneList: false
      //     }
      //   });
      // }
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

const assignmentReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = requestObj.URL;
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

function* workerReviseInfoAssignmentSaga(data) {
  try {
    const userResponse = yield call(assignmentReviseInfoApi, {
      data: data.payload.reqBody,
      URL: ASSIGNMENT_REVISE_INFO_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSIGNMENT_REVIEW_INFO=======>', userResponse);
      const { createMode = '' } = data.payload;
      if (!data.payload.hideRightPane) {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assignment',
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
      }

      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: ASSIGNMENT_REVIEW_DISTINCT_SAGA,
        payload: {
          HeaderOne: 'assignments',
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
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentAssesseeList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentAssessmentList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentCultureProfileList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentJobProfileList', value: [] }
    });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssignmentPublishSaga(data) {
  try {
    const userResponse = yield call(assignmentReviseInfoApi, {
      data: data.payload.reqBody,
      URL: ASSIGNMENT_PUBLISH_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSIGNMENT_REVIEW_INFO=======>', userResponse);
      const { createMode = '' } = data.payload;
      if (!data.payload.hideRightPane) {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assignment',
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
      }

      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: ASSIGNMENT_REVIEW_DISTINCT_SAGA,
        payload: {
          HeaderOne: 'assignments',
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
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentAssesseeList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentAssessmentList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentCultureProfileList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentJobProfileList', value: [] }
    });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssignmentAdministerSaga(data) {
  try {
    const userResponse = yield call(assignmentReviseInfoApi, {
      data: data.payload.reqBody,
      URL: ASSIGNMENT_ADMINISTER_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      const { createMode = '' } = data.payload;
      if (!data.payload.hideRightPane) {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assignment',
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
      }

      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: ASSIGNMENT_REVIEW_DISTINCT_SAGA,
        payload: {
          HeaderOne: 'assignments',
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
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentAssesseeList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentAssessmentList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentCultureProfileList', value: [] }
    });
    yield put({
      type: SET_ASSIGNMENT_RELATED_LIST,
      payload: { listName: 'assignmentJobProfileList', value: [] }
    });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewInfoAssignmentSaga() {
  yield takeLatest(GET_ASSIGNMENT_INFO_SAGA, workerReviewInfoAssignmentSaga);
  yield takeLatest(ASSIGNMENT_INFO_REVISE_SAGA, workerReviseInfoAssignmentSaga);
  yield takeLatest(ASSIGNMENT_PUBLISH_SAGA, workerAssignmentPublishSaga);
  yield takeLatest(ASSIGNMENT_ADMINISTER_SAGA, workerAssignmentAdministerSaga);
}
