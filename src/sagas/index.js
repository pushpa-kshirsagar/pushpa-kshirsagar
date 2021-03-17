import { all, fork } from 'redux-saga/effects';
// import watchGetUserSaga from './watchers/user';
import rootSaga from './watchers/user';
import watchcreateAssociateSaga from './watchers/createAssociate';
import watchcreateAssesseeSaga from './watchers/createAssessee';

export default function* root() {
  // yield all([fork(watchGetUserSaga)]);
  yield all([fork(rootSaga), fork(watchcreateAssociateSaga), fork(watchcreateAssesseeSaga)]);
}
