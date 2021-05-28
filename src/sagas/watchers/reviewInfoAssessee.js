import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSESSEE_INFO_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  UPDATE_ASSESSEE_BASIC_INFO,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  UPDATE_ASSESSEE_CONTACT_INFO,
  SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
  UPDATE_ASSESSEE_SETUP_PRIMARY_INFO
} from '../../actionType';
import { ASSESSEE_REVIEW_INFO_URL } from '../../endpoints';

const assesseesReviewInfoApi = async (requestObj) => {
  let URL = ASSESSEE_REVIEW_INFO_URL;
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

function* workerReviewInfoAssesseeSaga(data) {
  try {
    const userResponse = yield call(assesseesReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      // console.log('ASSESSEE_REVIEW_INFO=======>', userResponse);
      const { isReviseMode = false } = data.payload;
      if (data.payload.setLeftPaneAssessee) {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'leftPaneAssesseeInfo',
            value: userResponse?.responseObject[0]
          }
        });
      } else {
        const {
          informationAllocation,
          informationBasic,
          informationContact,
          informationEngagement,
          informationPersonal,
          informationSetup
        } = userResponse.responseObject[0];
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: data.payload.headerOne,
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: userResponse.responseObject[0],
            reviewMode: isReviseMode ? 'revise' : ''
          }
        });
        if (
          informationAllocation &&
          informationAllocation?.assesseeGroup?.assesseeGroupPrimary &&
          informationAllocation?.assesseeGroup?.assesseeGroupPrimary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeGroup.assesseeGroupPrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupPrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupPrimary',
              value: []
            }
          });
        }

        if (
          informationAllocation &&
          informationAllocation?.assesseeRole?.assesseeRolePrimary &&
          informationAllocation?.assesseeRole?.assesseeRolePrimary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeRole.assesseeRolePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRolePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRolePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assesseeNode?.assesseeNodePrimary &&
          informationAllocation?.assesseeNode?.assesseeNodePrimary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeNode.assesseeNodePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodePrimary',
              value: []
            }
          });
        }

        if (
          informationAllocation &&
          informationAllocation?.assesseeGroup?.assesseeGroupSecondary &&
          informationAllocation?.assesseeGroup?.assesseeGroupSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeGroup.assesseeGroupSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assesseeNode?.assesseeNodeSecondary &&
          informationAllocation?.assesseeNode?.assesseeNodeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeNode.assesseeNodeSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodeSecondary',
              value: []
            }
          });
        }

        if (
          informationAllocation &&
          informationAllocation?.assesseeRole?.assesseeRoleSecondary &&
          informationAllocation?.assesseeRole?.assesseeRoleSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeRole.assesseeRoleSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRoleSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRoleSecondary',
              value: []
            }
          });
        }
        // yield put({
        //   type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
        //   payload: {
        //     stateName: 'assesseeGroup',
        //     actualStateName: 'assesseeGroupPrimary',
        //     value: roleArr
        //   }
        // });
        yield put({ type: UPDATE_ASSESSEE_BASIC_INFO, payload: informationBasic });
        yield put({ type: UPDATE_ASSESSEE_PERSONAL_INFO, payload: informationPersonal });
        yield put({ type: UPDATE_ASSESSEE_ENGAGEMENT_INFO, payload: informationEngagement });
        yield put({ type: UPDATE_ASSESSEE_CONTACT_INFO, payload: informationContact });
        yield put({ type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO, payload: informationSetup });
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

export default function* watchReviewInfoAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_ASSESSEE_INFO_SAGA, workerReviewInfoAssesseeSaga);
}
