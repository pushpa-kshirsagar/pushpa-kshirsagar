import { all, fork } from 'redux-saga/effects';
import watchcreateAssociateSaga from './watchers/associateCreate';
import watchcreateAssesseeSaga from './watchers/assesseeCreate';
import watchReviewListAssesseeSaga from './watchers/assesseeReviewList';
import watchReviewInfoAssesseeSaga from './watchers/assesseeReviewRevise';
import watchReviewInfoAssociateSaga from './watchers/associateReviewRevise';
import watchReviewListAssociateSaga from './watchers/associateReviewList';
import watchReviewRolesListSaga from './watchers/roleReviewList';
import watchcreateAssesseeRoleSaga from './watchers/assesseeRoleCreate';
import watchcreateAssociateRoleSaga from './watchers/associateRoleCreate';
import watchReviewAssesseeRoleInfoSaga from './watchers/assesseeRoleReviewRevise';
import watchReviewAssociateRoleInfoSaga from './watchers/associateRoleReviewRevise';
import watchReviewAssesseeGroupInfoSaga from './watchers/assesseeGroupReviewRevise';
import watchReviewAssociateGroupInfoSaga from './watchers/associateGroupReviewRevise';
import watchcreateGroupSaga from './watchers/groupCreate';
import watchReviewGroupsListSaga from './watchers/groupReviewList';
import watchReviewAssessmentGroupInfoSaga from './watchers/assessmentGroupReviewRevise';
import watchReviewInfoAssessmentSaga from './watchers/assessmentReviewRevise';
import watchReviewInfoAssignmentSaga from './watchers/assignmentReviewRevise';
import watchReviewAssignmentGroupInfoSaga from './watchers/assignmentGroupReviewRevise';
import watchcreateTypeSaga from './watchers/typeCreate';
import watchReviewTypesListSaga from './watchers/typeReviewList';
import watchReviewListAssignmentSaga from './watchers/assignmentReviewList';
import watchReviewListAssessmentSaga from './watchers/assessmentsReviewList';
import watchCreateAssessmentSaga from './watchers/assessmentCreate';
import watchReviewAssessmentTypeInfoSaga from './watchers/assessmentTypeReviewRevise';
import watchReviewAssignmentTypeInfoSaga from './watchers/assignmentTypeReviewRevise';
import watchReviewItemTypeInfoSaga from './watchers/itemTypeReviewRevise';
import watchReviewAssociateTypeInfoSaga from './watchers/associateTypeReviewRevise';
import watchReviewAssesseeTypeInfoSaga from './watchers/assesseeTypeReviewRevise';
import watchCreateAssignmentSaga from './watchers/assignmentCreate';
import watchSignInAssesseeSaga from './watchers/assesseeSignIn';
import watchConfirmAssesseeSaga from './watchers/confirmAssessee';
import watchcreateNodeSaga from './watchers/associateNodeCreate';
import watchReviewAssociatesNodeListSaga from './watchers/associateNodeReviewList';
import watchReviewAssociateNodeInfoSaga from './watchers/associateNodeReviewRevise';
import workerRoleTypeShareSaga from './watchers/sharedRoleType';
import watchcreateItemSaga from './watchers/itemCreate';
import watchItemReviewListSaga from './watchers/itemReviewList';
import watchReviewInfoItemSaga from './watchers/itemReviewRevise';
import watchReviewItemGroupInfoSaga from './watchers/itemGroupReviewRevise';
import watchForgotCredentialSaga from './watchers/assesseeForgotInformation';
import watchcreateCultureProfileSaga from './watchers/cultureProfileCreate';
import watchReviewListCultureProfileSaga from './watchers/cultureProfileReviewList';
import watchReviewInfoCultureProfileSaga from './watchers/cultureProfileReviewRevise';
import watchReviewCultureProfileGroupInfoSaga from './watchers/cultureProfileGroupReviewRevise';
import watchReviewCultureProfileTypeInfoSaga from './watchers/cultureProfileTypeReviewRevise';
import watchReviewInfoJobProfileSaga from './watchers/jobProfileReviewRevise';
import watchReviewJobProfileGroupInfoSaga from './watchers/jobProfileGroupReviewRevise';
import watchReviewJobProfileTypeInfoSaga from './watchers/jobProfileTypeReviewRevise';
import watchCreateJobProfileSaga from './watchers/jobProfileCreate';
import watchReviewListJobProfileSaga from './watchers/jobProfileReviewList';
import watchAssesseeSelfSaga from './watchers/assesseeSelf';

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
    fork(watchForgotCredentialSaga),
    fork(watchcreateCultureProfileSaga),
    fork(watchReviewListCultureProfileSaga),
    fork(watchReviewInfoCultureProfileSaga),
    fork(watchReviewInfoJobProfileSaga),
    fork(watchReviewCultureProfileGroupInfoSaga),
    fork(watchReviewJobProfileGroupInfoSaga),
    fork(watchReviewCultureProfileTypeInfoSaga),
    fork(watchReviewJobProfileTypeInfoSaga),
    fork(watchCreateJobProfileSaga),
    fork(watchReviewListJobProfileSaga),
    fork(watchAssesseeSelfSaga)
  ]);
}
