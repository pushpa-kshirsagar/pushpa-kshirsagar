import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  CLEAR_ASSESSMENT_INFO,
  SET_ASSESSMENT_NEXT_POPUP,
  SET_ASSESSMENT_PREVIOUS_POPUP,
  SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
  SET_PREVIOUS_SECTION_POPUP
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';

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

  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in assessments
    dispatch({
      type: SET_ASSESSMENT_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    dispatch({
      type: SET_ASSESSMENT_NEXT_POPUP,
      payload: e.currentTarget.getAttribute('data-value')
    });
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
