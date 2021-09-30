import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSOCIATE_INFO_SAGA,
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_INFO_CONTACT_INFO,
  SET_IGURU_NODE_DYNAMIC_SINGLE_STATE,
  ASSOCIATE_INFO_REVISE_SAGA,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  SET_DISPLAY_THREE_SINGLE_STATE,
  ASSOCIATE_SETUP_SAGA,
  ASSOCIATE_ITEM_SETUP_SAGA,
  ASSOCIATE_ANALYTIC_SETUP_SAGA,
  ASSOCIATE_ASSESSMENT_SETUP_SAGA,
  ASSOCIATE_ASSESSESS_SETUP_SAGA,
  ASSOCIATE_ASSIGNMENT_SETUP_SAGA,
  UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
  UPDATE_ASSOCIATE_SETUP_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
  UPDATE_ASSOCIATE_SETUP_ITEM_INFO,
  UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
  ASSOCIATE_ASSESSEESETUP_REVISE_SAGA,
  ASSOCIATE_ASSOCIATESETUP_REVISE_SAGA,
  ASSOCIATE_ASSESSMENTSETUP_REVISE_SAGA,
  ASSOCIATE_ASSIGNMENTSETUP_REVISE_SAGA,
  ASSOCIATE_ITEMSETUP_REVISE_SAGA,
  ASSOCIATE_ANALYTICSETUP_REVISE_SAGA,
  ASSOCIATE_NODE_SETUP_SAGA,
  ASSOCIATE_ASSOCIATENODE_SETUP_REVISE_SAGA,
  UPDATE_ASSOCIATE_SETUP_ASSOCIATENODE_INFO,
  SET_ASSOCIATE_DYNAMIC_SINGLE_STATE
} from '../../actionType';
import {
  ASSESSEE_SETUP_REVISE_URL,
  ASSIGNMENT_SETUP_REVISE_URL,
  ASSOCIATE_INFO_REVISE_URL,
  ASSOCIATE_REVIEW_INFO_URL,
  ASSOCIATE_SETUP_REVISE_URL,
  ITEM_SETUP_REVISE_URL,
  ASSESSMENT_SETUP_REVISE_URL,
  ANALYTIC_SETUP_REVISE_URL,
  ASSOCIATENODE_SETUP_REVISE_URL
} from '../../endpoints';
import Store from '../../store';

const associateReviewInfoApi = async (requestObj) => {
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

function* workerReviewInfoAssociateSaga(data) {
  try {
    const userResponse = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ASSOCIATE_REVIEW_INFO_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSESSEE_REVIEW_INFO=======>', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associate',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      const {
        informationBasic,
        informationContact,
        informationAllocation,
        informationFramework
      } = userResponse.responseObject[0];
      yield put({ type: UPDATE_ASSOCIATE_BASIC_INFO, payload: informationBasic });
      yield put({ type: UPDATE_ASSOCIATE_INFO_CONTACT_INFO, payload: informationContact });
      let groupPrimary =
        informationAllocation?.associateGroup?.associateGroupPrimary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateGroup',
          actualStateName: 'associateGroupPrimary',
          value: groupPrimary
        }
      });
      let grpSecond =
        informationAllocation?.associateGroup?.associateGroupSecondary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateGroup',
          actualStateName: 'associateGroupSecondary',
          value: grpSecond
        }
      });
      let ndpri =
        informationAllocation?.associateNode?.associateNodePrimary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateNode',
          actualStateName: 'associateNodePrimary',
          value: ndpri
        }
      });
      let ndSecond =
        informationAllocation?.associateNode?.associateNodeSecondary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateNode',
          actualStateName: 'associateNodeSecondary',
          value: ndSecond
        }
      });
      let tyPri =
        informationAllocation?.associateType?.associateTypePrimary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateType',
          actualStateName: 'associateTypePrimary',
          value: tyPri
        }
      });
      let typeSecond =
        informationAllocation?.associateType?.associateTypeSecondary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateType',
          actualStateName: 'associateTypeSecondary',
          value: typeSecond
        }
      });
      let rolePri =
        informationAllocation?.associateRole?.associateRolePrimary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateRole',
          actualStateName: 'associateRolePrimary',
          value: rolePri
        }
      });
      let roleSecond =
        informationAllocation?.associateRole?.associateRoleSecondary.map((ob) => ob.id) || [];
      yield put({
        type: SET_ASSOCIATE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'associateRole',
          actualStateName: 'associateRoleSecondary',
          value: roleSecond
        }
      });
      //end allocation obj
      let ascendantPrimaryList = [];
      if (informationFramework?.associateAscendant?.associateAscendantPrimary) {
        let ascendantPrimaryId =
          informationFramework?.associateAscendant?.associateAscendantPrimary[0]?.id || '';
        ascendantPrimaryList.push(ascendantPrimaryId);
      }
      yield put({
        type: SET_IGURU_NODE_DYNAMIC_SINGLE_STATE,
        payload: {
          objectName: 'informationFramework',
          stateName: 'associateAscendant',
          actualStateName: 'associateAscendantPrimary',
          value: ascendantPrimaryList
        }
      });
      yield put({ type: LOADER_STOP });
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
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

const associateReviseInfoApi = async (requestObj) => {
  let URL = ASSOCIATE_INFO_REVISE_URL;
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

function* workerReviseInfoAssociateSaga(data) {
  try {
    const response = yield call(associateReviseInfoApi, { data: data.payload.reqBody });
    if (response.responseCode === '000') {
      if (data.payload.secondaryOptionCheckValue !== '') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: data.payload.headerOne,
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: response.responseObject[0]
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
          payload: 'review'
        });
      }
      if (Store.getState().PopUpReducer.cardValue === 'NoCard') {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'reviewListDistinctData', value: [] }
        });
        yield put({
          type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
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
      }

      console.log('loading end');
      yield put({ type: LOADER_STOP });
    } else {
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
function* workerAssociateSetUpSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: data.payload.reqUrl
    });
    if (response.responseCode === '000') {
      console.log('response.responseObject setUpAssociateModule');
      console.log(response.responseObject);
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: { stateName: 'setUpAssociateModule', value: response.responseObject[0].Bespoke }
        //payload: { stateName: 'setUpAssociateModule', value: response.responseObject.Bespoke }
      });

      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: {
          stateName: 'setUpAssociateModuleGeneric',
          value: response.responseObject[0].Generic
        }
      });

      // yield put({
      //   type: UPDATE_ASSOCIATE_SETUP_INFO,
      //   payload: response.responseObject[0]
      // });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateNodeSetUpSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: data.payload.reqUrl
    });
    if (response.responseCode === '000') {
      console.log('responce associateNodeSetUpModule');
      console.log(response.responseObject);
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: { stateName: 'associateNodeSetUpModule', value: response.responseObject[0] }
      });
      // yield put({
      //   type: UPDATE_ASSOCIATE_SETUP_INFO,
      //   payload: response.responseObject[0]
      // });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAnalyticSetUpSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: data.payload.reqUrl
    });
    if (response.responseCode === '000') {
      console.log('reponce object analyticSetUpModule');
      console.log(response.responseObject);

      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        //payload: { stateName: 'analyticSetUpModule', value: response.responseObject }
        payload: { stateName: 'analyticSetUpModule', value: response.responseObject.Bespoke }
      });

      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: { stateName: 'analyticSetUpModuleGeneric', value: response.responseObject.Generic }
      });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateItemSetUpSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: data.payload.reqUrl
    });
    if (response.responseCode === '000') {
      console.log('responce itemSetUpModule');
      console.log(response.responseObject);
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        //payload: { stateName: 'itemSetUpModule', value: response.responseObject }
        payload: { stateName: 'itemSetUpModule', value: response.responseObject.Bespoke }
      });

      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: { stateName: 'itemSetUpModuleGeneric', value: response.responseObject.Generic }
      });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAssessmentSetUpSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: data.payload.reqUrl
    });
    if (response.responseCode === '000') {
      console.log('assessment-associate-Object');
      console.log(response.responseObject);
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: { stateName: 'assessmentSetUpModule', value: response.responseObject.Bespoke }
      });
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: {
          stateName: 'assessmentSetUpModuleBespoke',
          value: response.responseObject.Bespoke
        }
      });

      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: {
          stateName: 'assessmentSetUpModuleGeneric',
          value: response.responseObject.Generic
        }
      });
      // yield put({
      //   type: UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
      //   payload: response.responseObject[0]
      // });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAssesseeSetUpSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: data.payload.reqUrl
    });
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: { stateName: 'assesseeSetUpModule', value: response.responseObject[0].Bespoke }
      });
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: {
          stateName: 'assesseeSetUpModuleGeneric',
          value: response.responseObject[1].Generic
        }
      });
      // yield put({
      //   type: UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
      //   payload: response.responseObject[0]
      // });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAssignmentSetUpSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: data.payload.reqUrl
    });
    if (response.responseCode === '000') {
      console.log('responce object assignmentSetUpModule');
      console.log(response.responseObject);
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        //payload: { stateName: 'assignmentSetUpModule', value: response.responseObject }
        payload: {
          stateName: 'assignmentSetUpModule',
          value: response.responseObject.Bespoke ? response.responseObject.Bespoke : {}
        }
      });

      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: {
          stateName: 'assignmentSetUpModuleGeneric',
          value: response.responseObject.Generic ? response.responseObject.Generic : {}
        }
      });

      // yield put({
      //   type: UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
      //   payload: response.responseObject
      // });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateItemSetUpReviseSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ITEM_SETUP_REVISE_URL
    });
    if (response.responseCode === '000') {
      yield put({
        type: UPDATE_ASSOCIATE_SETUP_ITEM_INFO,
        payload: response.responseObject
      });
      yield put({ type: LOADER_STOP });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAnalyticSetUpReviseSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ANALYTIC_SETUP_REVISE_URL
    });
    if (response.responseCode === '000') {
      yield put({
        type: UPDATE_ASSOCIATE_SETUP_ANALYTIC_INFO,
        payload: response.responseObject[0]
      });
      yield put({ type: LOADER_STOP });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateNodeSetUpReviseSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ASSOCIATENODE_SETUP_REVISE_URL
    });
    if (response.responseCode === '000') {
      yield put({
        type: UPDATE_ASSOCIATE_SETUP_ASSOCIATENODE_INFO,
        payload: response.responseObject[0]
      });
      yield put({ type: LOADER_STOP });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAssignmentSetUpReviseSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ASSIGNMENT_SETUP_REVISE_URL
    });
    if (response.responseCode === '000') {
      yield put({
        type: UPDATE_ASSOCIATE_SETUP_ASSIGNMENT_INFO,
        payload: response.responseObject
      });
      yield put({ type: LOADER_STOP });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAssessmentSetUpReviseSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSMENT_SETUP_REVISE_URL
    });
    if (response.responseCode === '000') {
      yield put({
        type: UPDATE_ASSOCIATE_SETUP_ASSESSMENT_INFO,
        payload: response.responseObject
      });
      yield put({ type: LOADER_STOP });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAssociateSetUpReviseSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ASSOCIATE_SETUP_REVISE_URL
    });
    if (response.responseCode === '000') {
      yield put({
        type: UPDATE_ASSOCIATE_SETUP_INFO,
        payload: response.responseObject[0]
      });
      yield put({ type: LOADER_STOP });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
function* workerAssociateAssesseeSetUpReviseSaga(data) {
  try {
    const response = yield call(associateReviewInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSEE_SETUP_REVISE_URL
    });
    if (response.responseCode === '000') {
      yield put({
        type: UPDATE_ASSOCIATE_SETUP_ASSESSEE_INFO,
        payload: response.responseObject[0]
      });
      yield put({ type: LOADER_STOP });
    } else {
    }
  } catch (e) {
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
  }
}
export default function* watchReviewInfoAssociateSaga() {
  yield takeLatest(GET_ASSOCIATE_INFO_SAGA, workerReviewInfoAssociateSaga);
  yield takeLatest(ASSOCIATE_INFO_REVISE_SAGA, workerReviseInfoAssociateSaga);
  yield takeLatest(ASSOCIATE_ASSESSESS_SETUP_SAGA, workerAssociateAssesseeSetUpSaga);
  yield takeLatest(ASSOCIATE_ASSESSMENT_SETUP_SAGA, workerAssociateAssessmentSetUpSaga);
  yield takeLatest(ASSOCIATE_ASSIGNMENT_SETUP_SAGA, workerAssociateAssignmentSetUpSaga);
  yield takeLatest(ASSOCIATE_SETUP_SAGA, workerAssociateSetUpSaga);
  yield takeLatest(ASSOCIATE_NODE_SETUP_SAGA, workerAssociateNodeSetUpSaga);
  yield takeLatest(ASSOCIATE_ANALYTIC_SETUP_SAGA, workerAssociateAnalyticSetUpSaga);
  yield takeLatest(ASSOCIATE_ITEM_SETUP_SAGA, workerAssociateItemSetUpSaga);
  yield takeLatest(ASSOCIATE_ASSESSEESETUP_REVISE_SAGA, workerAssociateAssesseeSetUpReviseSaga);
  yield takeLatest(ASSOCIATE_ASSESSMENTSETUP_REVISE_SAGA, workerAssociateAssessmentSetUpReviseSaga);
  yield takeLatest(ASSOCIATE_ASSIGNMENTSETUP_REVISE_SAGA, workerAssociateAssignmentSetUpReviseSaga);
  yield takeLatest(ASSOCIATE_ASSOCIATESETUP_REVISE_SAGA, workerAssociateAssociateSetUpReviseSaga);
  yield takeLatest(ASSOCIATE_ITEMSETUP_REVISE_SAGA, workerAssociateItemSetUpReviseSaga);
  yield takeLatest(ASSOCIATE_ANALYTICSETUP_REVISE_SAGA, workerAssociateAnalyticSetUpReviseSaga);
  yield takeLatest(ASSOCIATE_ASSOCIATENODE_SETUP_REVISE_SAGA, workerAssociateNodeSetUpReviseSaga);
}
