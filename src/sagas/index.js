import { all, fork } from 'redux-saga/effects';
import watchGetUserSaga from './watchers/user';

export default function* root() {
  yield all([fork(watchGetUserSaga)]);
}
