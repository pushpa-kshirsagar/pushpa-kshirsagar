import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSIGNMENT_REVIEW_DISTINCT_SAGA,
  SET_ASSIGNMENT_RELATED_LIST,
  ASSESSEE_ALLOCATE_ASSIGNMENT_SAGA
} from '../../actionType';
import { ASSESSEE_ALLOCATE_ASSIGNMENT } from '../../endpoints';
import Store from '../../store';
const callInfoApi = async (requestObj) => {
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
function* workerAssesseeAllocateAssignmentSaga(data) {
  try {
    const userResponse = yield call(callInfoApi, {
      data: data.payload.request,
      URL: ASSESSEE_ALLOCATE_ASSIGNMENT
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

export default function* watchAssesseeAllocateSaga() {
  yield takeLatest(ASSESSEE_ALLOCATE_ASSIGNMENT_SAGA, workerAssesseeAllocateAssignmentSaga);
}
