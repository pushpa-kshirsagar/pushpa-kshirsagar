import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_NODE_REVIEW_LIST_DATA,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  EXTERNAL_NODE_TREE_URL,
  EXTERNAL_NODE_LIST_URL,
  INTERNAL_NODE_TREE_URL,
  INTERNAL_NODE_LIST_URL
} from '../../endpoints';

const nodeReviewListDistinctApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewAssociatesNodeListSaga(data) {
  console.log(data.payload);
  try {
    const userResponse = yield call(nodeReviewListDistinctApi, {
      data: data.payload.request,
      URL:
        data.payload.nodeViewState === 'hierarchy' ? EXTERNAL_NODE_TREE_URL : EXTERNAL_NODE_LIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'associates',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'associatesNodeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal ? userResponse.countTotal : 0,
            showMiddlePaneState: true
          }
        });
      }
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_NODE_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
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
function* workerReviewInternalNodeListSaga(data) {
  // console.log(data.payload,"000000");
  try {
    const userResponse = yield call(nodeReviewListDistinctApi, {
      data: data.payload.request,
      URL:
        data.payload.nodeViewState === 'hierarchy' ? INTERNAL_NODE_TREE_URL : INTERNAL_NODE_LIST_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (data.payload.isMiddlePaneList) {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: data.payload.paneHeader,
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: data.payload.BadgeThree,
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'associateNodeDistinctReviewList',
            scanCount: userResponse && userResponse.countTotal ? userResponse.countTotal : 0,
            showMiddlePaneState: true
          }
        });
      }

      if (data.payload.isMiddlePaneList) {
        yield put({
          type: REVIEWLIST_DISTINCT_DATA,
          payload: userResponse.responseObject
        });
      } else {
        let Arr1 = userResponse.responseObject[0].associateNodeRoot;
        let Arr2 = userResponse.responseObject[0]?.associateNodeDescendantAll || [];
        Arr2.unshift(Arr1);
        yield put({ type: SET_CORE_NODE_REVIEW_LIST_DATA, payload: Arr2 });
      }
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

export default function* watchReviewAssociatesNodeListSaga() {
  yield takeLatest(GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA, workerReviewAssociatesNodeListSaga);
  yield takeLatest(INTERNAL_NODE_LIST_SAGA, workerReviewInternalNodeListSaga);
}
