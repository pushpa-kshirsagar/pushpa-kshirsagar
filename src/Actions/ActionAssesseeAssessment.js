import { SET_ASSESSEE_ASSESSMENT_ITEM_RES_SAGA } from '../actionType';

export const setAssesseeAssessmentItemSaveResCall = (
  selectedAssociateInfo,
  dispatch,
  assesseeAssessmentStartData,
  itemId,
  assesseeId,
  currentQuestionChoice,
  itemTimeStart
) => {
  let ItemObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    assesseeAssignmentId: assesseeAssessmentStartData.assignmentId,
    assesseeAssignmentAssessmentId: assesseeAssessmentStartData.assessmentId,
    assesseeAssignmentAssessmentItemId: itemId,
    assesseeAssignmentAssessmentItemExplanation: '',
    assesseeAssignmentAssessmentItemResponseChoiceSelected: currentQuestionChoice,
    assesseeAssignmentAssessmentItemStatus: '',
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
      console.log('ans', ans);
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
  let responseSetInLocal = JSON.parse(localStorage.getItem('navigationItem')) || [];
  console.log(responseSetInLocal);
  if (responseSetInLocal.length > 0) {
    let find = responseSetInLocal.find((v) => v.assesseeAssignmentAssessmentItemId === itemId);
    find
      ? (find.assesseeAssignmentAssessmentItemResponseChoiceSelected = currentQuestionChoice)
      : responseSetInLocal.push(ItemObj);

    console.log('find', find);
  } else {
    responseSetInLocal.push(ItemObj);
  }
  // if (responseSetInLocal.length > 0) {
  //   responseSetInLocal.forEach((element, index) => {
  //     if (element.assesseeAssignmentAssessmentItemId === itemId) {
  //       responseSetInLocal[index] = ItemObj;
  //       isItemPresent = false;
  //     } else {
  //       isItemPresent = true;
  //     }
  //   });
  // } else {
  //   responseSetInLocal.push(ItemObj);
  // }
  // isItemPresent && responseSetInLocal.push(ItemObj);

  localStorage.setItem('navigationItem', JSON.stringify(responseSetInLocal));
};
