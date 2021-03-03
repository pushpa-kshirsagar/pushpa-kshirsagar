import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import { SET_ASSESSEE_NEXT_POPUP, SET_ASSESSEE_PREVIOUS_POPUP } from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';

const PopUpAssesseesModule = (props) => {
  const {
    assesseesPopUpActive,
    currentPopUpOption,
    assesseesPopUpType,
    assesseesHeaderOne,
    assesseesHeaderOneBadgeOne
  } = useSelector((state) => state.AssesseeCreateReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;

  const setSecondaryOptionValue = (e) => {
    //TODO: set secondary option in AssesseeCreateReducer
    // dispatch({
    //   type: SET_SECONDARY_OPTION_VALUE,
    //   payload: e.currentTarget.getAttribute('data-value')
    // });
  };
  const ChangeOptionPopup = (e) => {
    dispatch({
      type: SET_ASSESSEE_NEXT_POPUP,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const BackHandlerEvent = (e) => {
    dispatch({ type: SET_ASSESSEE_PREVIOUS_POPUP });
  };
  return (
    <div>
      <Popup isActive={assesseesPopUpActive}>
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
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAssesseesModule;
