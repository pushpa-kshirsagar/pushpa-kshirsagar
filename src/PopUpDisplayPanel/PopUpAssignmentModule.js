import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  SET_ASSIGNMENT_NEXT_POPUP,
  SET_ASSIGNMENT_PREVIOUS_POPUP,
  SET_ASSIGNMENT_SECONDARY_OPTION_VALUE
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';

const PopUpAssignmentModule = (props) => {
  const {
    assignmentsPopUpActive,
    currentPopUpOption,
    assignmentsPopUpType,
    assignmentsHeaderOne,
    assignmentsHeaderOneBadgeOne,
    secondaryOptionCheckValue
  } = useSelector((state) => state.AssignmentReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_ASSIGNMENT_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    dispatch({
      type: SET_ASSIGNMENT_NEXT_POPUP,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const BackHandlerEvent = (e) => {
    dispatch({ type: SET_ASSIGNMENT_PREVIOUS_POPUP });
  };
  return (
    <div>
      <Popup isActive={assignmentsPopUpActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + assignmentsPopUpType}
          headerOne={assignmentsHeaderOne}
          headerOneBadgeOne={assignmentsHeaderOneBadgeOne}
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

export default PopUpAssignmentModule;
