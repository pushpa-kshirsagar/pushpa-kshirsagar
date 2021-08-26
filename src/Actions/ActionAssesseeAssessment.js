import { SET_ASSESSEE_ASSESSMENT_ITEM_RES_SAGA } from '../actionType';

export const setAssesseeAssessmentItemSaveResCall = (
  selectedAssociateInfo,
  dispatch,
  assesseeAssessmentStartData,
  itemId,
  currentQuestionChoice,
  itemTimeStart
) => {
  let ItemObj = {
    assesseeAssignmentId: assesseeAssessmentStartData.assignmentId,
    assesseeAssignmentAssessmentId: assesseeAssessmentStartData.assessmentId,
    assesseeAssignmentAssessmentItemId: itemId,
    assesseeAssignmentAssessmentItemResponseChoiceSelected: currentQuestionChoice,
    assesseeAssignmentAssessmentItemTimeline: {
      assesseeAssignmentAssessmentItemTimelineDateTimeStart: itemTimeStart,
      assesseeAssignmentAssessmentItemTimelineDateTimeEnd: new Date().getTime()
    }
  };
  if (navigator.onLine) {
    console.log('Became online');
    let reqObj;
    if (JSON.parse(localStorage.getItem('assessmentItem'))?.length === 0) {
      reqObj = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessmentItem: [ItemObj]
      };
    } else {
      let ans = JSON.parse(localStorage.getItem('assessmentItem'));
      console.log('ans',ans);
      ans.push(ItemObj);
      reqObj = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessmentItem: ans
      };
    }
    dispatch({
      type: SET_ASSESSEE_ASSESSMENT_ITEM_RES_SAGA,
      payload: { request: reqObj }
    });
    localStorage.setItem('assessmentItem', '[]');
  } else {
    console.log('Became offline');
    let ans = JSON.parse(localStorage.getItem('assessmentItem'));
    ans.push(ItemObj);
    localStorage.setItem('assessmentItem', JSON.stringify(ans));
  }
};
