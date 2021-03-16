import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { SET_SELECTED_ASSOCIATE, SET_USER, CREATE_ASSOCIATE_SAGA } from '../../actionType';
import { GET_USER_URL } from '../../endpoints';

function createAssociateApi(data) {
  console.log();
  return axios
    .post(
      'https://xgis5z7671.execute-api.ap-south-1.amazonaws.com/dev/insightguru/api/associateDistinct/create',
      {
        data: {},
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        }
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log('-----error is given below----');
      console.log(error);
    });
}

function* workerCreateAssociateSaga(data) {
    console.log(data);
    console.log("======data==========");
  try {
    const userResponse = yield call(createAssociateApi);
    console.log('IN WORKER ====>', userResponse.data);
    if (userResponse.data.status === 'success')
      if (userResponse.data.responseObject.length === 1) {
        yield put({ type: SET_SELECTED_ASSOCIATE, payload: userResponse?.data.responseObject[0] });
      }
    yield put({ type: SET_USER, payload: userResponse?.data.responseObject });
  } catch (e) {
    console.log('ERROR==', e);
  }
}

export default function* watchcreateAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSOCIATE_SAGA, workerCreateAssociateSaga);
}
