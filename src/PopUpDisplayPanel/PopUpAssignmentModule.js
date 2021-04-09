import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  CLEAR_ASSIGNMENT_INFO,
  FILTERMODE,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  LOADER_START,
  SET_ASSIGNMENT_NEXT_POPUP,
  SET_ASSIGNMENT_PREVIOUS_POPUP,
  SET_ASSIGNMENT_SECONDARY_OPTION_VALUE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_PREVIOUS_SECTION_POPUP,
  SET_REQUEST_OBJECT
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import { makeAssignmentGroupObj } from '../Actions/GenericActions';

const PopUpAssignmentModule = (props) => {
  const {
    assignmentsPopUpActive,
    currentPopUpOption,
    assignmentsPopUpType,
    assignmentsHeaderOne,
    assignmentsHeaderOneBadgeOne,
    secondaryOptionCheckValue,
    isBackToSectionPopUp
  } = useSelector((state) => state.AssignmentReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;
  const { countPage } = useSelector((state) => state.DisplayPaneTwoReducer);
  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_ASSIGNMENT_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'groups') {
      let requestObj = makeAssignmentGroupObj(secondaryOptionCheckValue, 0, countPage);
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assignmentGroupDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: true
        }
      });
      dispatch({ type: CLEAR_ASSIGNMENT_INFO });
    } else {
      dispatch({
        type: SET_ASSIGNMENT_NEXT_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
  };
  const BackHandlerEvent = (e) => {
    if (isBackToSectionPopUp) {
      dispatch({ type: CLEAR_ASSIGNMENT_INFO });
      dispatch({ type: SET_PREVIOUS_SECTION_POPUP });
    } else {
      dispatch({ type: SET_ASSIGNMENT_PREVIOUS_POPUP });
    }
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
