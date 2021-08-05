import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  GET_ASSESSEE_ASSIGNMENT_SAGA,
  POPUP_CLOSE,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_SECONDARY_CREATE_OPTION_VALUE,
  LOADER_START,
  SET_ASSESSEE_ASSESSMENT_ITEM_RES_SAGA,
  ASSESSEE_ASSESSMENT_FINISH_SAGA
} from '../actionType';
const PopUpDisplayPanelAssesseeAssessment = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupHeaderOneBadgeThree,
    popupOpenType,
    secondaryOptionCheckValue,
    tertiaryOptionCheckValue = 'all',
    forthOptionCheckValue
  } = useSelector((state) => state.PopUpReducer);
  const { selectedAssociateInfo, relatedReviewListDistinctData, reviewListReqObj } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { assesseeAssessmentStartData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const { assesseeAssignmentAssessmentData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const [isReviseMode, setIsReviseMode] = useState(false);
  const dispatch = useDispatch();
  const {
    headerPanelColour = 'displayPaneCentre',
    isActive,
    popupAllClose,
    typeOfMiddlePaneList
  } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_SECONDARY_CREATE_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const setSecondaryOptionValueTwo = (e) => {};
  const setSecondaryOptionValueThree = (e) => {};
  const ChangeOptionPopup = (e) => {
    let keyVal = e.currentTarget.getAttribute('data-key');
    let dataVal = e.currentTarget.getAttribute('data-value');
    console.log(dataVal);
    if (dataVal === 'finish') {
      if (JSON.parse(localStorage.getItem('assessmentItem')).length > 0) {
        dispatch({ type: LOADER_START });
        let reqObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assessmentItem: JSON.parse(localStorage.getItem('assessmentItem'))
        };
        console.log(JSON.parse(localStorage.getItem('assessmentItem')));
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_ITEM_RES_SAGA,
          payload: { request: reqObj }
        });
      }
      let reqObject = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assignmentId: assesseeAssessmentStartData.assignmentId,
        assessmentId: assesseeAssessmentStartData.assessmentId,
        assesseeAssignmentAssessmentStatus:
          popupHeaderOneBadgeOne === 'time-out' ? 'UNFINISHED' : 'FINISHED',
        attemptEndTime: new Date().getTime()
      };
      dispatch({
        type: ASSESSEE_ASSESSMENT_FINISH_SAGA,
        payload: { request: reqObject }
      });
    }
    if (dataVal === 'yes' && secondaryOptionCheckValue === 'assignment') {
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSESSEE_ASSIGNMENT_SAGA,
        payload: {
          request: reviewListReqObj,
          BadgeOne: 'active',
          BadgeTwo: '',
          BadgeThree: '',
          assessmentStarted: true,
          assignmentId: relatedReviewListDistinctData[0].assignmentId
        }
      });
    }
    if (dataVal === 'yes' && secondaryOptionCheckValue === 'sign-out') {
    }
    if (dataVal === 'yes' && secondaryOptionCheckValue === 'dashboard') {
      dispatch({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'isExamMode', value: false }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'typeOfMiddlePaneList', value: '' }
      });
    }

    dispatch({ type: POPUP_CLOSE });
  };
  const BackHandlerEvent = (e) => {
    dispatch({ type: SET_MIDDLEPANE_PREVIOUS_POPUP });
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + popupOpenType}
          headerOne={popupHeaderOne}
          headerOneBadgeOne={popupHeaderOneBadgeOne}
          headerOneBadgeTwo={popupHeaderOneBadgeTwo}
          headerOneBadgeThree={popupHeaderOneBadgeThree}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            setSecondaryOptionValueTwo={setSecondaryOptionValueTwo}
            setSecondaryOptionValueThree={setSecondaryOptionValueThree}
            ChangeOptionPopup={ChangeOptionPopup}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
            tertiaryOptionCheckValue={tertiaryOptionCheckValue}
            forthOptionCheckValue={forthOptionCheckValue}
          />
          {/* )} */}
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpDisplayPanelAssesseeAssessment;
