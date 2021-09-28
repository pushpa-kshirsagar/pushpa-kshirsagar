import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSOCIATE_ALLOCATE_SAGA
} from '../../actionType';
import { ASSOCIATE_ALLOCATE_URL } from '../../endpoints';
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
function* workerAllocateAssociateSaga(data) {
  try {
    const Response = yield call(callInfoApi, {
      data: data.payload.request,
      URL: ASSOCIATE_ALLOCATE_URL
    });
    // const Response ={responseCode:'000',countTotal:30}
    if (Response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: '' }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'allocateStr', value: '' }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'selectedTagsArray', value: [] }
      });
      yield put({ type: LOADER_STOP });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: Response.responseMessage, popupMode: 'responseErrorMsg' }
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

export default function* watchAssociateAllocateSaga() {
  yield takeLatest(ASSOCIATE_ALLOCATE_SAGA, workerAllocateAssociateSaga);
}
