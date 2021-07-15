import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  SET_JOB_REDUCER_STATE,
  GET_JOB_PROFILE_INFO_SAGA,
  JOB_PROFILE_INFO_REVISE_SAGA,
  SET_JOB_DYNAMIC_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_JOBPROFILE_REVIEW_LIST_SAGA,
  SET_JOB_SIFTLIST_STATE,
  SET_RANGE_SELECTED
} from '../../actionType';
import { JOB_PROFILE_REVIEW_INFO_URL, JOB_PROFILE_REVISE_INFO_URL } from '../../endpoints';
import Store from '../../store';

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
        const {
          informationBasic,
          informationAllocation,
          informationFramework
        } = userResponse.responseObject[0];
        yield put({
          type: SET_JOB_REDUCER_STATE,
          payload: informationBasic
        });
        if (
          informationAllocation &&
          informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary &&
          informationAllocation?.jobProfileGroup?.jobProfileGroupPrimary.length > 0
        ) {
          let tempArr = informationAllocation.jobProfileGroup.jobProfileGroupPrimary.map(
            (ob) => ob.id
          );
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
          let tempArr = informationAllocation.jobProfileNode.jobProfileNodePrimary.map(
            (ob) => ob.id
          );
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
          let tempArr = informationAllocation.jobProfileType.jobProfileTypePrimary.map(
            (ob) => ob.id
          );
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
        const tempCoreArray = informationFramework?.jobProfileJobCompetencyCore || [];
        const coreIdList = tempCoreArray.map((ob) => {
          return ob.jobProfileJobCompetencyTag;
        });
        const tempJobDomainArray = informationFramework?.jobProfileJobDomain || [];
        const jobDomainIdList = tempJobDomainArray.map((ob) => {
          return ob.jobProfileJobCompetencyTag;
        });
        const tempJobFunctionArray = informationFramework?.jobProfileJobFunction || [];
        const jobFunctionIdList = tempJobFunctionArray.map((ob) => {
          return ob.jobProfileJobCompetencyTag;
        });
        const tempJobRoleArray = informationFramework?.jobProfileJobRole || [];
        const jobRoleIdList = tempJobRoleArray.map((ob) => {
          return ob.jobProfileJobCompetencyTag;
        });
        yield put({
          type: SET_JOB_SIFTLIST_STATE,
          payload: {
            jobProfileJobDomain: jobDomainIdList || [],
            jobProfileJobFunction: jobFunctionIdList || [],
            jobProfileJobRole: jobRoleIdList || [],
            jobProfileJobCompetencyCoreObj: informationFramework?.jobProfileJobCompetencyCore || [],
            jobProfileJobCompetencyCore: coreIdList || [],
            jobProfileJobCompetencySiftList: [],
            jobProfileJobCompetencyShortlisted:
              informationFramework?.jobProfileJobCompetencyShortlisted || [],
            jobProfileJobCompetencySifted:
              informationFramework?.jobProfileJobCompetencySifted || [],
            jobProfileJobCompetencyRange: informationFramework?.jobProfileJobCompetencyRange || [],
            jobProfileJobCompetencyWeightage:
              informationFramework?.jobProfileJobCompetencyWeightage || [],
            jobProfileJobCompetencyCharacteristic: [],
            jobProfileJobCompetencySifted: [
              {
                jobProfileJobCompetencySift: 'indispensable',
                jobProfileJobCompetencyTag: [
                  '60ed794a592d3c2db0d624ca',
                  '60ed794a592d3c2db0d6248d',
                  '60ed794a592d3c2db0d6249e',
                  '60ed794a592d3c2db0d624bf',
                  '60ed794a592d3c2db0d624ca',
                  '60ed794a592d3c2db0d6248d',
                  '60ed794a592d3c2db0d6249e',
                  '60ed794a592d3c2db0d624bf'
                ]
              },
              {
                jobProfileJobCompetencySift: 'desirable',
                jobProfileJobCompetencyTag: [
                  '60ed794a592d3c2db0d62481',
                  '60ed794a592d3c2db0d62486',
                  '60ed794a592d3c2db0d62492',
                  '60ed794a592d3c2db0d624aa',
                  '60ed794a592d3c2db0d62481',
                  '60ed794a592d3c2db0d62486',
                  '60ed794a592d3c2db0d62492',
                  '60ed794a592d3c2db0d624aa'
                ]
              },
              {
                jobProfileJobCompetencySift: 'probable',
                jobProfileJobCompetencyTag: [
                  '60ed794a592d3c2db0d624cf',
                  '60ed794a592d3c2db0d624a3',
                  '60ed794a592d3c2db0d624cf',
                  '60ed794a592d3c2db0d624a3',
                  '60ed794a592d3c2db0d624b7'
                ]
              },
              {
                jobProfileJobCompetencySift: 'removable',
                jobProfileJobCompetencyTag: []
              }
            ]
          }
        });
        yield put({
          type: SET_RANGE_SELECTED,
          payload: false
        });
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
      const { createMode, isHideRightPane = false } = data.payload;
      if (!isHideRightPane) {
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

      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      if (createMode === '') {
        yield put({
          type: GET_JOBPROFILE_REVIEW_LIST_SAGA,
          payload: {
            HeaderOne: 'job profiles',
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
        type: SET_RANGE_SELECTED,
        payload: false
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

export default function* watchReviewInfoJobProfileSaga() {
  yield takeLatest(GET_JOB_PROFILE_INFO_SAGA, workerReviewInfoJobProfileSaga);
  yield takeLatest(JOB_PROFILE_INFO_REVISE_SAGA, workerReviseInfoJobProfileSaga);
}
