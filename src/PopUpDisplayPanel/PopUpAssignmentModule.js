import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  ASSIGNMENT_REVIEW_DISTINCT_SAGA,
  CLEAR_ASSIGNMENT_INFO,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  LOADER_START,
  SET_ASSIGNMENT_NEXT_POPUP,
  SET_ASSIGNMENT_PREVIOUS_POPUP,
  SET_ASSIGNMENT_SECONDARY_OPTION_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_PREVIOUS_SECTION_POPUP,
  SET_REQUEST_OBJECT
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  makeAssignmentGroupObj,
  makeAssignmentTypeObj,
  makeAssignmentReviewListRequestObject
} from '../Actions/GenericActions';
import { getInternalNodeApiCall } from '../Actions/AssociateModuleAction';
import {
  assignmentsDistinctApiCall,
  assignmentsGroupApiCall,
  assignmentTypeApiCall,
  createAssignmentPopupApiCall
} from '../Actions/AssignmentModuleAction';

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
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_ASSIGNMENT_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const resetDataFunction = () => {
    dispatch({
      type: SET_POPUP_SINGLE_STATE,
      payload: { stateName: 'cardValue', value: 'NoCard' }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'middlePaneSelectedValue', value: '' }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedFlagedArray', value: [] }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'unselectedFlagedArray', value: [] }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'selectedTagsArray', value: [] }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'unselectedTagsArray', value: [] }
    });
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'flagedValue', value: '' }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    dispatch({ type: CLEAR_ASSIGNMENT_INFO });
  };
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'information') {
      resetDataFunction();
      createAssignmentPopupApiCall(selectedAssociateInfo, secondaryOptionCheckValue, dispatch);
    } else if (targetValue === 'distinct') {
      assignmentsDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'groups') {
      assignmentsGroupApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'types') {
      assignmentTypeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'nodes') {
      getInternalNodeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue,
        '',
        'hierarchy',
        'assignments'
      );
      resetDataFunction();
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
