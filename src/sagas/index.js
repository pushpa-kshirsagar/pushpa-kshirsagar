import { all, fork } from 'redux-saga/effects';
import watchcreateAssociateSaga from './watchers/associateCreate';
import watchcreateAssesseeSaga from './watchers/assesseeCreate';
import watchReviewListAssesseeSaga from './watchers/assesseeReviewList';
import watchReviewInfoAssesseeSaga from './watchers/reviewInfoAssessee';
import watchReviewInfoAssociateSaga from './watchers/reviewInfoAssociate';
import watchReviewListAssociateSaga from './watchers/associateReviewList';
import watchReviewRolesListSaga from './watchers/roleReviewList';
import watchcreateAssesseeRoleSaga from './watchers/assesseeRoleCreate';
import watchcreateAssociateRoleSaga from './watchers/associateRoleCreate';
import watchReviewAssesseeRoleInfoSaga from './watchers/reviewInfoAssesseeRole';
import watchReviewAssociateRoleInfoSaga from './watchers/reviewInfoAssociateRole';
import watchReviewAssesseeGroupInfoSaga from './watchers/reviewInfoAssesseeGroup';
import watchReviewAssociateGroupInfoSaga from './watchers/reviewInfoAssociateGroup';
import watchcreateGroupSaga from './watchers/groupCreate';
import watchReviewGroupsListSaga from './watchers/groupReviewList';
import watchReviewAssessmentGroupInfoSaga from './watchers/reviewInfoAssessmentGroup';
import watchReviewInfoAssessmentSaga from './watchers/reviewInfoAssessment';
import watchReviewInfoAssignmentSaga from './watchers/reviewInfoAssignment';
import watchReviewAssignmentGroupInfoSaga from './watchers/reviewInfoAssignmentGroup';
import watchcreateTypeSaga from './watchers/typeCreate';
import watchReviewTypesListSaga from './watchers/typeReviewList';
import watchReviewListAssignmentSaga from './watchers/assignmentReviewList';
import watchReviewListAssessmentSaga from './watchers/assessmentsReviewList';
import watchCreateAssessmentSaga from './watchers/assessmentCreate';
import watchReviewAssessmentTypeInfoSaga from './watchers/reviewInfoAssessmentType';
import watchReviewAssignmentTypeInfoSaga from './watchers/reviewInfoAssignmentType';
import watchReviewItemTypeInfoSaga from './watchers/reviewInfoItemType';
import watchReviewAssociateTypeInfoSaga from './watchers/reviewInfoAssociateType';
import watchReviewAssesseeTypeInfoSaga from './watchers/reviewInfoAssesseeType';
import watchCreateAssignmentSaga from './watchers/assignmentCreate';
import watchSignInAssesseeSaga from './watchers/assesseeSignIn';
import watchConfirmAssesseeSaga from './watchers/confirmAssessee';
import watchReviseInfoAssesseeSaga from './watchers/reviseAssesseeInfo';
import workerReviseInfoAssociateSaga from './watchers/reviseAssociateInfo';
import watchcreateNodeSaga from './watchers/associateNodeCreate';
import watchReviewAssociatesNodeListSaga from './watchers/associateNodeReviewList';
import watchReviewAssociateNodeInfoSaga from './watchers/reviewInfoAssociateNode';
import workerRoleTypeShareSaga from './watchers/sharedRoleType';
import watchcreateItemSaga from './watchers/itemCreate';
import watchItemReviewListSaga from './watchers/itemReviewList';
import watchReviewInfoItemSaga from './watchers/reviewInfoItem';
import watchReviewItemGroupInfoSaga from './watchers/reviewInfoItemGroup';
import watchForgotCredentialSaga from './watchers/assesseeForgotInformation';

export default function* root() {
  // yield all([fork(watchGetUserSaga)]);
  yield all([
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
    fork(workerRoleTypeShareSaga),
    fork(watchReviewAssesseeTypeInfoSaga),
    fork(watchReviewAssociateTypeInfoSaga),
    fork(watchcreateItemSaga),
    fork(watchItemReviewListSaga),
    fork(watchReviewInfoItemSaga),
    fork(watchReviewItemGroupInfoSaga),
    fork(watchReviewItemTypeInfoSaga),
    fork(watchForgotCredentialSaga)
  ]);
}
