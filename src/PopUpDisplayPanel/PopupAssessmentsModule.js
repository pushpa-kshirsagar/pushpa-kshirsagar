import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  CLEAR_ASSESSMENT_INFO,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  LOADER_START,
  SET_ASSESSMENT_NEXT_POPUP,
  SET_ASSESSMENT_PREVIOUS_POPUP,
  SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_VALUE,
  SET_PREVIOUS_SECTION_POPUP,
  SET_REQUEST_OBJECT
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  makeAssessmentGroupObj,
  makeAssessmentReviewListRequestObject,
  makeAssessmentTypeObj
} from '../Actions/GenericActions';
import { getInternalNodeApiCall } from '../Actions/AssociateModuleAction';
import {
  createAssessmentPopup,
  getAssessmentDistinctApiCall,
  getAssessmentGroupApiCall,
  getAssessmentTypeApiCall
} from '../Actions/AssessmentModuleAction';

const PopupAssessmentsModule = (props) => {
  const {
    assessmentsPopUpActive,
    currentPopUpOption,
    assessmentsPopUpType,
    assessmentsHeaderOne,
    assessmentsHeaderOneBadgeOne,
    secondaryOptionCheckValue,
    isBackToSectionPopUp
  } = useSelector((state) => state.AssessmentReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);

  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in assessments
    dispatch({
      type: SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'information') {
      resetDataFunction();
      createAssessmentPopup(
        selectedAssociateInfo,
        dispatch,
        secondaryOptionCheckValue,
        targetValue
      );
    } else if (targetValue === 'distinct') {
      getAssessmentDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'groups') {
      getAssessmentGroupApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'types') {
      getAssessmentTypeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'nodes') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'nodeViewState', value: 'hierarchy' }
      });
      getInternalNodeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue,
        '',
        'hierarchy',
        'assessments'
      );
      resetDataFunction();
    } else {
      dispatch({
        type: SET_ASSESSMENT_NEXT_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
  };
  const resetDataFunction = () => {
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    dispatch({ type: CLEAR_ASSESSMENT_INFO });
  };
  const BackHandlerEvent = (e) => {
    if (isBackToSectionPopUp) {
      dispatch({ type: CLEAR_ASSESSMENT_INFO });
      dispatch({ type: SET_PREVIOUS_SECTION_POPUP });
    } else {
      dispatch({ type: SET_ASSESSMENT_PREVIOUS_POPUP });
    }
  };

  return (
    <div>
      <Popup isActive={assessmentsPopUpActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + assessmentsPopUpType}
          headerOne={assessmentsHeaderOne}
          headerOneBadgeOne={assessmentsHeaderOneBadgeOne}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            currentPopUpOption={currentPopUpOption}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopupAssessmentsModule;
