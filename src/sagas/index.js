import { all, fork } from 'redux-saga/effects';
// import watchGetUserSaga from './watchers/user';
import rootSaga from './watchers/user';
import watchcreateAssociateSaga from './watchers/createAssociate';
import watchcreateAssesseeSaga from './watchers/createAssessee';
import watchReviewListAssesseeSaga from './watchers/reviewListAssessee';
import watchReviewInfoAssesseeSaga from './watchers/reviewInfoAssessee';
import watchReviewInfoAssociateSaga from './watchers/reviewInfoAssociate';
import watchReviewListAssociateSaga from './watchers/reviewListAssociate';
import watchReviewRolesListSaga from './watchers/reviewListRoles';
import watchcreateAssesseeRoleSaga from './watchers/createAssesseeRole';
import watchcreateAssociateRoleSaga from './watchers/createAssociateRole';
import watchReviewAssesseeRoleInfoSaga from './watchers/reviewInfoAssesseeRole';
import watchReviewAssociateRoleInfoSaga from './watchers/reviewInfoAssociateRole';
import watchReviewAssesseeGroupInfoSaga from './watchers/reviewInfoAssesseeGroup';
import watchReviewAssociateGroupInfoSaga from './watchers/reviewInfoAssociateGroup';
import watchcreateGroupSaga from './watchers/createGroup';
import watchReviewGroupsListSaga from './watchers/reviewListGroups';
import watchReviewAssessmentGroupInfoSaga from './watchers/reviewInfoAssessmentGroup';
import watchReviewInfoAssessmentSaga from './watchers/reviewInfoAssessment';
import watchReviewInfoAssignmentSaga from './watchers/reviewInfoAssignment';
import watchReviewAssignmentGroupInfoSaga from './watchers/reviewInfoAssignmentGroup';
import watchcreateTypeSaga from './watchers/createType';
import watchReviewTypesListSaga from './watchers/reviewListTypes';
import watchReviewListAssignmentSaga from './watchers/reviewListAssignment';
import watchReviewListAssessmentSaga from './watchers/reviewListAssessments';
import watchCreateAssessmentSaga from './watchers/createAssessment';
import watchReviewAssessmentTypeInfoSaga from './watchers/reviewInfoAssessmentType';
import watchReviewAssignmentTypeInfoSaga from './watchers/reviewInfoAssignmentType';
import watchReviewAssociateTypeInfoSaga from './watchers/reviewInfoAssociateType';
import watchReviewAssesseeTypeInfoSaga from './watchers/reviewInfoAssesseeType';
import watchCreateAssignmentSaga from './watchers/createAssignment';
import watchSignInAssesseeSaga from './watchers/signIn';
import watchConfirmAssesseeSaga from './watchers/confirmAssessee';
import watchReviseInfoAssesseeSaga from './watchers/reviseAssesseeInfo';
import workerReviseInfoAssociateSaga from './watchers/reviseAssociateInfo';
import watchcreateNodeSaga from './watchers/createNode';
import watchReviewAssociatesNodeListSaga from './watchers/reviewListNode';
import watchReviewAssociateNodeInfoSaga from './watchers/reviewInfoAssociateNode';
import watchRoleShareSaga from './watchers/sharedRole';

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
    fork(watchReviewAssociateRoleInfoSaga),
    fork(watchReviewAssesseeGroupInfoSaga),
    fork(watchReviewAssociateGroupInfoSaga),
    fork(watchcreateGroupSaga),
    fork(watchReviewGroupsListSaga),
    fork(watchReviewAssessmentGroupInfoSaga),
    fork(watchReviewInfoAssessmentSaga),
    fork(watchReviewAssignmentGroupInfoSaga),
    fork(watchcreateTypeSaga),
    fork(watchReviewTypesListSaga),
    fork(watchReviewListAssignmentSaga),
    fork(watchReviewListAssessmentSaga),
    fork(watchCreateAssessmentSaga),
    fork(watchReviewAssessmentTypeInfoSaga),
    fork(watchReviewAssignmentTypeInfoSaga),
    fork(watchCreateAssignmentSaga),
    fork(watchReviewInfoAssignmentSaga),
    fork(watchSignInAssesseeSaga),
    fork(watchConfirmAssesseeSaga),
    fork(watchReviseInfoAssesseeSaga),
    fork(workerReviseInfoAssociateSaga),
    fork(watchcreateNodeSaga),
    fork(watchReviewAssociatesNodeListSaga),
    fork(watchReviewAssociateNodeInfoSaga),
    fork(watchRoleShareSaga),
    fork(watchReviewAssesseeTypeInfoSaga),
    fork(watchReviewAssociateTypeInfoSaga)
  ]);
}
