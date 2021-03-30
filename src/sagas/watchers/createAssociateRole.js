import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_ASSOCIATE_ROLE_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import { ASSOCIATE_ROLE_CREATE_URL } from '../../endpoints';

const createAssociateRoleApi = async (requestObj) => {
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSOCIATE_ROLE_CREATE_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssociateRoleSaga(data) {
  try {
    const userResponse = yield call(createAssociateRoleApi, { data: data.payload });
    console.log('IN WORKER ====>', userResponse);
    console.log('IN WORKER ====>', JSON.stringify(userResponse));
    if (userResponse.responseCode === '000') {
      console.log('loading end');
      // yield put({
      //   type: SET_DISPLAY_PANE_THREE_STATE,
      //   payload: {
      //     headerOne: 'associates',
      //     headerOneBadgeOne: 'role',
      //     headerOneBadgeTwo: 'information',
      //     headerOneBadgeThree: 'all',
      //     responseObject: userResponse.responseObject
      //   }
      // });
    }
    yield put({ type: LOADER_STOP });
    // yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    yield put({ type: POPUP_CLOSE });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateAssociateRoleSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSOCIATE_ROLE_SAGA, workerCreateAssociateRoleSaga);
}
