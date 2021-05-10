import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  ASSESSEE_INFO_REVISE_SAGA,
  ASSOCIATE_INFO_REVISE_SAGA,
  GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSEE_INFO_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_INFO_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_INFO_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_INFO_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_MOBILE_PANE_STATE,
  SET_SECONDARY_CREATE_OPTION_VALUE,
  FILTERMODE,
  CLEAR_DISPLAY_PANE_THREE,
  LOADER_STOP,
  SET_POPUP_SINGLE_STATE,
  ASSESSEE_INFO_CREATE
} from '../actionType';
import {
  getAssesseeDistinctApiCall,
  getAssesseeGroupAssesseeDistinctApiCall,
  getAssesseeGroupAssesseeReqObj,
  getAssesseeGroupDistinctApiCall,
  getAssesseeRoleAssesseeDistinctApiCall,
  getAssesseeRoleAssesseeReqObj,
  getAssesseeRoleDistinctApiCall
} from '../Actions/AssesseeModuleAction';
import {
  getAssociateGroupAssociateDistinctApiCall,
  getAssociateGroupAssociateReqObj,
  getAssociateRoleAssociateDistinctApiCall,
  getAssociateRoleAssociateReqObj
} from '../Actions/AssociateModuleAction';
const PopUpMiddlePaneTrippleDot = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType,
    secondaryOptionCheckValue,
    selectedTagValue
  } = useSelector((state) => state.PopUpReducer);
  const { selectedAssociateInfo, countPage, middlePaneHeader } = useSelector(
    (state) => state.DisplayPaneTwoReducer
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
  const ChangeOptionPopup = (e) => {
    let keyVal = e.currentTarget.getAttribute('data-key');
    let dataVal = e.currentTarget.getAttribute('data-value');
    // alert(typeOfMiddlePaneList);
    if (dataVal === 'distinct') {
      if (typeOfMiddlePaneList === 'assesseesDistinctReviewList') {
        getAssesseeDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal
        );
      }
      if (typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList') {
        getAssesseeGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
      }
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        getAssesseeRoleDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          'roles',
          dispatch
        );
      }
      dispatch({ type: POPUP_CLOSE });
    } else if (dataVal === 'groups') {
      if (middlePaneHeader === 'assessees') {
        getAssesseeGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal
        );
        dispatch({ type: POPUP_CLOSE });
      }
    } else if (dataVal === 'roles') {
      if (middlePaneHeader === 'assessees') {
        getAssesseeRoleDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dataVal,
          dispatch
        );
      }
      dispatch({ type: POPUP_CLOSE });
    } else {
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: { badgeValue: dataVal, keyValue: keyVal }
      });
    }
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
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpMiddlePaneTrippleDot;
