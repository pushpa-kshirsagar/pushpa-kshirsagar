import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import { SET_ASSOCIATE_NEXT_POPUP, SET_ASSOCIATE_PREVIOUS_POPUP } from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';

const PopUpAssociatesModule = (props) => {
  const {
    associatesPopUpActive,
    currentPopUpOption,
    associatesPopUpType,
    associatesHeaderOne,
    associatesHeaderOneBadgeOne
  } = useSelector((state) => state.AssociateCreateReducer);

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
      type: SET_ASSOCIATE_NEXT_POPUP,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const BackHandlerEvent = (e) => {
    dispatch({ type: SET_ASSOCIATE_PREVIOUS_POPUP });
  };
  return (
    <div>
      <Popup isActive={associatesPopUpActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + associatesPopUpType}
          headerOne={associatesHeaderOne}
          headerOneBadgeOne={associatesHeaderOneBadgeOne}
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

export default PopUpAssociatesModule;
