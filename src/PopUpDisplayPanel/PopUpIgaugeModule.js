import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  SECTION_POPUP_CLOSE,
  SET_ASSESSEE_SECONDARY_POPUP,
  SET_ASSESSMENT_SECONDARY_POPUP,
  SET_ASSIGNMENT_SECONDARY_POPUP,
  SET_ASSOCIATE_SECONDARY_POPUP,
  SET_SECTION_TWO_SECONDARY_OPTION_VALUE
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';

const PopUpIgaugeModule = (props) => {
  const {
    sectionPopUpActive,
    currentPopUpOption,
    sectionPopUpType,
    sectionHeaderOne,
    sectionHeaderOneBadgeOne,
    secondaryOptionCheckValue
  } = useSelector((state) => state.IgaugeReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_SECTION_TWO_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    dispatch({ type: SECTION_POPUP_CLOSE });
    if (secondaryOptionCheckValue === 'assessees') {
      dispatch({
        type: SET_ASSESSEE_SECONDARY_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
    if (secondaryOptionCheckValue === 'assessments') {
      dispatch({
        type: SET_ASSESSMENT_SECONDARY_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
    if (secondaryOptionCheckValue === 'assignments') {
      dispatch({
        type: SET_ASSIGNMENT_SECONDARY_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
    if (secondaryOptionCheckValue === 'associates') {
      dispatch({
        type: SET_ASSOCIATE_SECONDARY_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
    // dispatch({ type: ASSESSEE_POPUP_OPEN });
    console.log('IN OPTION CLICK', e.currentTarget.getAttribute('data-value'));
  };
  const BackHandlerEvent = (e) => {
    dispatch({ type: SECTION_POPUP_CLOSE });
  };
  return (
    <div>
      <Popup isActive={sectionPopUpActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + sectionPopUpType}
          headerOne={sectionHeaderOne}
          headerOneBadgeOne={sectionHeaderOneBadgeOne}
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

export default PopUpIgaugeModule;
