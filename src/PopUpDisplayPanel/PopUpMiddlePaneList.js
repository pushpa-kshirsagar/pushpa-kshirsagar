import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_SECONDARY_CREATE_OPTION_VALUE,
} from '../actionType';
const PopUpMiddlePaneList = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupOpenType,
    secondaryOptionCheckValue
  } = useSelector((state) => state.PopUpReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneCentre', isActive, onClickInformation = null } = props;
  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_SECONDARY_CREATE_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    console.log(e.currentTarget.getAttribute('data-value'));
    console.log('ChangeOptionPopup');
    let clickVal = e.currentTarget.getAttribute('data-value');
    if (clickVal === 'information') {
      onClickInformation(secondaryOptionCheckValue);
    }
    else{
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: clickVal
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

export default PopUpMiddlePaneList;
