import { all, fork } from 'redux-saga/effects';
// import watchGetUserSaga from './watchers/user';
import rootSaga from './watchers/user';
import watchcreateAssociateSaga from './watchers/createAssociate';
import watchcreateAssesseeSaga from './watchers/createAssessee';
import watchReviewListAssesseeSaga from './watchers/reviewListAssessee';
import watchReviewInfoAssesseeSaga from './watchers/reviewInfoAssessee';
import watchReviewInfoAssociateSaga from './watchers/reviewInfoAssociate';
import watchReviewListAssociateSaga from './watchers/reviewListAssociate';
import watchReviewRolesListSaga from './watchers/reviewRole';
import watchcreateAssesseeRoleSaga from './watchers/createAssesseeRole';
import watchcreateAssociateRoleSaga from './watchers/createAssociateRole';
import watchReviewAssesseeRoleInfoSaga from './watchers/reviewInfoAssesseeRole';
import watchReviewAssociateRoleInfoSaga from './watchers/reviewInfoAssociateRole';
export default function* root() {
  // yield all([fork(watchGetUserSaga)]);
  yield all([
    fork(rootSaga),
    fork(watchcreateAssociateSaga),
    fork(watchcreateAssesseeSaga),
    fork(watchReviewListAssesseeSaga),
    fork(watchReviewInfoAssesseeSaga),
    fork(watchReviewInfoAssociateSaga),
    fork(watchReviewListAssociateSaga),
    fork(watchReviewRolesListSaga),
    fork(watchcreateAssesseeRoleSaga),
    fork(watchcreateAssociateRoleSaga),
    fork(watchReviewAssesseeRoleInfoSaga),
    fork(watchReviewAssociateRoleInfoSaga)
  ]);
}
