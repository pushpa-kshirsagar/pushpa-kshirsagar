import { put, takeLatest, call } from 'redux-saga/effects';
import { setAssessmentResponseToReducerObj } from '../../Actions/AssessmentModuleAction';
import { convertSecondsToHMmSs, setItemTypeConfigState } from '../../Actions/GenericActions';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSESSMENT_INFO_SAGA,
  GET_ASSESSMENT_SEC_INFO_SAGA,
  SET_ASSESSMENT_BASIC_REDUCER_STATE,
  ASSESSMENT_INFO_REVISE_SAGA,
  SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
  ASSESSMENT_PUBLISH_SAGA,
  SET_MIDDLEPANE_STATE,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  ASSESSMENT_INFO_PREVIEW_SAGA,
  SET_ASSESSMENT_SYNOPSIS_FRAMEWORK_STATE
} from '../../actionType';
import {
  ASSESSMENT_REVIEW_INFO_URL,
  ASSESSMENT_REVISE_INFO_URL,
  ASSESSMENT_PUBLISH_URL,
  ASSESSMENT_INFO_PREVIEW_REVISE_URL
} from '../../endpoints';
import Store from '../../store';

const assessmentInfoApi = async (requestObj) => {
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

function* workerReviewInfoAssessmentSaga(data) {
  try {
    const userResponse = yield call(assessmentInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSMENT_REVIEW_INFO_URL
    });
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
      // if (isReviseMode) {
      const {
        informationBasic,
        informationAllocation,
        informationFramework
      } = userResponse.responseObject[0];
      yield put({
        type: SET_ASSESSMENT_BASIC_REDUCER_STATE,
        payload: informationBasic
      });
      if (
        informationAllocation &&
        informationAllocation?.assessmentGroup?.assessmentGroupPrimary &&
        informationAllocation?.assessmentGroup?.assessmentGroupPrimary.length > 0
      ) {
        let tempArr = informationAllocation.assessmentGroup.assessmentGroupPrimary.map(
          (ob) => ob.id
        );
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
      const communiqueObject = informationFramework?.assessmentCommunique || [];
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentCommunique', value: communiqueObject }
      });
      // const scoreObject = informationFramework?.assessmentScore || {
      //   assessmentScoreMaximum: 0,
      //   assessmentScoreMinimum: 0
      // };
      // yield put({ type: SET_ASSESSMENT_SCORE_FRAMEWORK_STATE, payload: scoreObject });
      const timeAssessment = convertSecondsToHMmSs(informationFramework?.assessmentTime) || 0;
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentTime', value: timeAssessment }
      });
      const menuScriptAssessment = informationFramework?.assessmentManuscript || [];
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentManuscript', value: menuScriptAssessment }
      });

      const assessmentSynopsis = informationFramework?.assessmentSynopsis || [];
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentSynopsis', value: assessmentSynopsis }
      });

      let sectionArr = [];
      informationFramework?.assessmentSection.map((sec) => {
        let versionArr = [];
        sec.assessmentVersion.map((ver) => {
          let tempArr = [];
          if (ver.assessmentVersionItemDistinct) {
            for (let i = 0; i < ver.assessmentVersionItemDistinct?.length; i++) {
              tempArr.push({
                itemTagPrimary: ver.assessmentVersionItemDistinct[i].itemTagPrimary,
                itemSequence: ver.assessmentVersionItemDistinct[i].itemSequence
              });
            }
          }
          let reviseObj = { ...ver, assessmentVersionItemDistinct: tempArr };
          versionArr.push(reviseObj);
        });
        let reviseObj2 = { ...sec, assessmentVersion: versionArr };
        sectionArr.push(reviseObj2);
      });
      console.log('sectionArr', sectionArr);
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentSection', value: sectionArr }
      });
      const assessmentScale = informationFramework?.assessmentScale || [];

      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentScale', value: assessmentScale }
      });
      // yield put({
      //   type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
      //   payload: {
      //     stateName: 'assessmentSectionItemDistinctRevise',
      //     value: assessmentSection[0].assessmentSectionItemDistinct[0]
      //   }
      // });

      // setItemTypeConfigState(
      //   assessmentSection[0].assessmentSectionItemDistinct[0].itemFrameworkOne
      //     ?.itemFrameworkOneType,
      //   yield put
      // );
      // const itemFrameworkOneType =
      //   assessmentSection[0].assessmentSectionItemDistinct[0].itemFrameworkOne
      //     ?.itemFrameworkOneType;
      // let reviseSetting = {
      //   blankState: true,
      //   classificationState: false,
      //   levelState: true,
      //   polarityState: true,
      //   scaleState: true,
      //   scoreState: true,
      //   timeState: true,
      //   weightageState: true,
      //   noOfItemState: true,
      //   noOfResponseState: true
      // };
      // if (itemFrameworkOneType === '61090cace50cf61d5eb440c9') {
      //   // "Likert-Scale"
      //   reviseSetting = {
      //     blankState: false,
      //     classificationState: false,
      //     levelState: true,
      //     polarityState: true,
      //     scaleState: true,
      //     scoreState: true,
      //     timeState: true,
      //     weightageState: false,
      //     noOfItemState: true,
      //     noOfResponseState: false
      //   };
      // }
      // if (itemFrameworkOneType === '61090cace50cf61d5eb440ce') {
      //   //"Response-Choice (Single-Select)"
      //   reviseSetting = {
      //     blankState: false,
      //     classificationState: false,
      //     levelState: true,
      //     polarityState: false,
      //     scaleState: false,
      //     scoreState: true,
      //     timeState: true,
      //     weightageState: false,
      //     noOfItemState: false,
      //     noOfResponseState: true
      //   };
      // }
      // if (itemFrameworkOneType === '61090cace50cf61d5eb440c4') {
      //   //"Fill-in-the-Blank (Response-Choice)"
      //   reviseSetting = {
      //     blankState: true,
      //     classificationState: false,
      //     levelState: true,
      //     polarityState: false,
      //     scaleState: false,
      //     scoreState: true,
      //     timeState: true,
      //     weightageState: false,
      //     noOfItemState: false,
      //     noOfResponseState: true
      //   };
      // }
      // if (
      //   itemFrameworkOneType === '61090cace50cf61d5eb440cc' ||
      //   itemFrameworkOneType === '61090cace50cf61d5eb440cd'
      // ) {
      //   //"Response (Long)","Response (Short)"
      //   reviseSetting = {
      //     blankState: false,
      //     classificationState: false,
      //     levelState: true,
      //     polarityState: false,
      //     scaleState: false,
      //     scoreState: true,
      //     timeState: true,
      //     weightageState: false,
      //     noOfItemState: false,
      //     noOfResponseState: false
      //   };
      // }
      // yield put({
      //   type: SET_DISPLAY_TWO_SINGLE_STATE,
      //   payload: { stateName: 'itemConfigStates', value: reviseSetting }
      // });
      // const assessmentSection = userResponse.responseObject[0].informationFramework?.assessmentSection || [];
      //   yield put({
      //     type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
      //     payload: { stateName: 'assessmentSection', value: assessmentSection }
      //   });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
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
function* workerReviewInfoAssessmentSecSaga(data) {
  try {
    const userResponse = yield call(assessmentInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSMENT_REVIEW_INFO_URL
    });
    if (userResponse.responseCode === '000') {
      let assessmentInfo = userResponse.responseObject[0];

      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: {
          stateName: 'assessmentScale',
          value: assessmentInfo.informationFramework.assessmentScale
        }
      });
      let sectionArr = [];
      assessmentInfo.informationFramework?.assessmentSection.map((sec) => {
        let versionArr = [];
        sec.assessmentVersion.map((ver) => {
          let tempArr = [];
          if (ver.assessmentVersionItemDistinct) {
            for (let i = 0; i < ver.assessmentVersionItemDistinct?.length; i++) {
              tempArr.push({
                itemTagPrimary: ver.assessmentVersionItemDistinct[i].itemTagPrimary,
                itemSequence: ver.assessmentVersionItemDistinct[i].itemSequence
              });
            }
          }
          let reviseObj = { ...ver, assessmentVersionItemDistinct: tempArr };
          versionArr.push(reviseObj);
        });
        let reviseObj2 = { ...sec, assessmentVersion: versionArr };
        sectionArr.push(reviseObj2);
      });
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentSection', value: sectionArr }
      });
      let reviseFramewrkobj = {
        ...assessmentInfo.informationFramework,
        assessmentSection: sectionArr
      };
      // yield put({
      //   type: SET_DISPLAY_TWO_SINGLE_STATE,
      //   payload: {
      //     stateName: 'assessmentResponseObject',
      //     value: { ...assessmentInfo, informationFramework: reviseFramewrkobj }
      //   }
      // });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'assessmentResponseObject',
          value: assessmentInfo
        }
      });
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: {
          stateName: 'assessmentCluster',
          value: assessmentInfo.informationFramework.assessmentCluster
        }
      });
      let BadgeOne = 'scales';
      let reviseResponseObj = {
        countTotal: assessmentInfo?.informationFramework?.assessmentScale?.length || 0,
        responseObject: [
          {
            scales: assessmentInfo?.informationFramework?.assessmentScale || [],
            assessmentName: assessmentInfo.informationBasic.assessmentName,
            assessmentDescription: assessmentInfo.informationBasic.assessmentDescription,
            assessmentStatus: assessmentInfo.informationEngagement.assessmentStatus,
            id: assessmentInfo.id
          }
        ]
      };
      if (data.payload.typeOfMiddlePaneList === 'assessmentsectionsReviewList') {
        let array = assessmentInfo?.informationFramework?.assessmentSection || [];
        BadgeOne = 'sections';
        reviseResponseObj = {
          countTotal: array?.length || 0,
          responseObject: [
            {
              sections: array || [],
              assessmentName: assessmentInfo.informationBasic.assessmentName,
              assessmentDescription: assessmentInfo.informationBasic.assessmentDescription,
              assessmentStatus: assessmentInfo.informationEngagement.assessmentStatus,
              id: assessmentInfo.id
            }
          ]
        };
      }
      if (data.payload.typeOfMiddlePaneList === 'assessmentclustersReviewList') {
        BadgeOne = 'clusters';
        reviseResponseObj = {
          countTotal: assessmentInfo?.informationFramework?.assessmentCluster?.length || 0,
          responseObject: [
            {
              clusters: assessmentInfo?.informationFramework?.assessmentCluster || [],
              assessmentName: assessmentInfo.informationBasic.assessmentName,
              assessmentDescription: assessmentInfo.informationBasic.assessmentDescription,
              assessmentStatus: assessmentInfo.informationEngagement.assessmentStatus,
              id: assessmentInfo.id
            }
          ]
        };
      }
      if (data.payload.typeOfMiddlePaneList === 'assessmentversionsReviewList') {
        BadgeOne = 'versions';
        reviseResponseObj = {
          countTotal:
            assessmentInfo?.informationFramework?.assessmentSection[0].assessmentVersion.length ||
            0,
          responseObject: [
            {
              versions:
                assessmentInfo?.informationFramework?.assessmentSection[0]?.assessmentVersion || [],
              assessmentName: assessmentInfo.informationBasic.assessmentName,
              assessmentDescription: assessmentInfo.informationBasic.assessmentDescription,
              assessmentStatus: assessmentInfo.informationEngagement.assessmentStatus,
              id: assessmentInfo.id
            }
          ]
        };
      }
      yield put({
        type: RELATED_REVIEWLIST_DISTINCT_DATA,
        payload: reviseResponseObj.responseObject
      });
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'assessment',
          middlePaneHeaderBadgeOne: BadgeOne,
          middlePaneHeaderBadgeTwo: 'distinct',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: data.payload.typeOfMiddlePaneList,
          middlePaneSelectedValue: assessmentInfo.id,
          scanCount: reviseResponseObj && reviseResponseObj.countTotal,
          showMiddlePaneState: true
        }
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
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
function* workerReviseInfoAssessmentSaga(data) {
  try {
    const userResponse = yield call(assessmentReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      const { createMode, assessmentSector = '', selectedSector = '' } = data.payload;
      if (assessmentSector === 'scale') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assessment',
            headerOneBadgeOne: 'scale',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject:
              userResponse.responseObject[0].informationFramework.assessmentScale[selectedSector],
            reviewMode: createMode
          }
        });
        yield put({ type: LOADER_STOP });
      } else if (assessmentSector === 'cluster') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assessment',
            headerOneBadgeOne: 'cluster',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject:
              userResponse.responseObject[0].informationFramework.assessmentCluster[selectedSector],
            reviewMode: createMode
          }
        });
        yield put({ type: LOADER_STOP });
      } else if (assessmentSector === 'section') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assessment',
            headerOneBadgeOne: 'section',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject:
              userResponse.responseObject[0].informationFramework.assessmentSection[selectedSector],
            reviewMode: createMode
          }
        });
        yield put({ type: LOADER_STOP });
      } else if (assessmentSector === 'version') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assessment',
            headerOneBadgeOne: 'version',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject:
              userResponse.responseObject[0].informationFramework.assessmentSection[0]
                .assessmentVersion[selectedSector],
            reviewMode: createMode
          }
        });
        yield put({ type: LOADER_STOP });
      } else {
        if (!data.payload.hideRightpane) {
          yield put({
            type: SET_DISPLAY_PANE_THREE_STATE,
            payload: {
              headerOne: 'assessment',
              headerOneBadgeOne: 'information',
              headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
              responseObject: userResponse.responseObject[0],
              createMode
            }
          });
        }
        if (Store.getState().DisplayPaneTwoReducer.typeOfMiddlePaneList) {
          yield put({
            type: SET_DISPLAY_TWO_SINGLE_STATE,
            payload: { stateName: 'reviewListDistinctData', value: [] }
          });
          yield put({
            type: ASSESSMENT_REVIEW_DISTINCT_SAGA,
            payload: {
              HeaderOne: 'assessments',
              request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
              BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
              BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
              BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
              middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer
                .middlePaneSelectedValue,
              isMiddlePaneList: true
            }
          });
        } else {
          yield put({ type: LOADER_STOP });
        }
      }
    } else {
      console.log('loading end');
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
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
function* workerPublishAssessmentSaga(data) {
  try {
    const userResponse = yield call(assessmentInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSMENT_PUBLISH_URL
    });
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      if (Store.getState().DisplayPaneTwoReducer.typeOfMiddlePaneList) {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'reviewListDistinctData', value: [] }
        });
        yield put({
          type: ASSESSMENT_REVIEW_DISTINCT_SAGA,
          payload: {
            HeaderOne: 'assessments',
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
    } else {
      console.log('loading end');
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
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
function* workerPreviewAssessmentSaga(data) {
  try {
    const userResponse = yield call(assessmentInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSMENT_INFO_PREVIEW_REVISE_URL
    });
    console.log('assessmentpreviewResponce', userResponse);
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          createMode
        }
      });
      const { informationFramework } = userResponse.responseObject[0];

      const assessmentSection = informationFramework?.assessmentSection || [];
      yield put({
        type: SET_ASSESSMENT_DYNAMIC_FRAMEWORK_STATE,
        payload: { stateName: 'assessmentSection', value: assessmentSection }
      });

      yield put({ type: LOADER_STOP });
    } else {
      console.log('loading end');
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
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

export default function* watchReviewInfoAssessmentSaga() {
  yield takeLatest(GET_ASSESSMENT_INFO_SAGA, workerReviewInfoAssessmentSaga);
  yield takeLatest(GET_ASSESSMENT_SEC_INFO_SAGA, workerReviewInfoAssessmentSecSaga);
  yield takeLatest(ASSESSMENT_INFO_REVISE_SAGA, workerReviseInfoAssessmentSaga);
  yield takeLatest(ASSESSMENT_PUBLISH_SAGA, workerPublishAssessmentSaga);
  yield takeLatest(ASSESSMENT_INFO_PREVIEW_SAGA, workerPreviewAssessmentSaga);
}
