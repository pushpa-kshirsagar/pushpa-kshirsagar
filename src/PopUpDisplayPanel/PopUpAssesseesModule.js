import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_SIGN_ON,
  CLEAR_ASSESSEE_INFO,
  SET_ASSESSEE_NEXT_POPUP,
  SET_ASSESSEE_PREVIOUS_POPUP,
  SET_ASSESSEE_SECONDARY_OPTION_VALUE,
  SET_PREVIOUS_SECTION_POPUP
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';

const PopUpAssesseesModule = (props) => {
  const {
    currentPopUpOption,
    assesseesPopUpType,
    assesseesHeaderOne,
    assesseesHeaderOneBadgeOne,
    secondaryOptionCheckValue,
    isBackToSectionPopUp
  } = useSelector((state) => state.AssesseeCreateReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_ASSESSEE_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    if (e.currentTarget.getAttribute('data-value') === 'information') {
      dispatch({ type: ASSESSEE_INFO_CREATE });
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
    } else {
      dispatch({
        type: SET_ASSESSEE_NEXT_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
  };
  const BackHandlerEvent = (e) => {
    if (isBackToSectionPopUp) {
      dispatch({ type: CLEAR_ASSESSEE_INFO });
      dispatch({ type: SET_PREVIOUS_SECTION_POPUP });
    } else {
      dispatch({ type: SET_ASSESSEE_PREVIOUS_POPUP });
    }
  };
  return (
    <div>
      <Popup isActive={props.isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + assesseesPopUpType}
          headerOne={assesseesHeaderOne}
          headerOneBadgeOne={assesseesHeaderOneBadgeOne}
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

export default PopUpAssesseesModule;
