import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  CLEAR_ASSESSMENT_INFO,
  FILTERMODE,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  LOADER_START,
  SET_ASSESSMENT_NEXT_POPUP,
  SET_ASSESSMENT_PREVIOUS_POPUP,
  SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_PREVIOUS_SECTION_POPUP,
  SET_REQUEST_OBJECT
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import { makeAssessmentGroupObj } from '../Actions/GenericActions';

const PopupAssessmentsModule = (props) => {
  const {
    assessmentsPopUpActive,
    currentPopUpOption,
    assessmentsPopUpType,
    assessmentsHeaderOne,
    assessmentsHeaderOneBadgeOne,
    secondaryOptionCheckValue,
    isBackToSectionPopUp
  } = useSelector((state) => state.assessmentReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;
  const { countPage } = useSelector((state) => state.DisplayPaneTwoReducer);

  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in assessments
    dispatch({
      type: SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'groups') {
      let requestObj = makeAssessmentGroupObj(secondaryOptionCheckValue, 0, countPage);
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assessmentGroupDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: true
        }
      });
      dispatch({ type: CLEAR_ASSESSMENT_INFO });
    } else {
      dispatch({
        type: SET_ASSESSMENT_NEXT_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
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
