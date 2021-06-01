import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  CLEAR_ASSOCIATE_INFO,
  ASSOCIATE_CREATE_INFO,
  ASSOCIATE_SIGN_ON,
  SET_ASSOCIATE_NEXT_POPUP,
  SET_ASSOCIATE_PREVIOUS_POPUP,
  SET_ASSOCIATE_SECONDARY_OPTION_VALUE,
  SET_PREVIOUS_SECTION_POPUP,
  SET_PAGE_COUNT,
  ASSOCIATE_POPUP_CLOSE,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  SET_MIDDLEPANE_STATE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_POPUP_SINGLE_STATE,
  CLEAR_ASSESSEE_INFO,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_SINGLE_ASSOCIATE_INFORMATION
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import { makeAssociateGroupObj, makeAssociateRoleObj } from '../Actions/GenericActions';
import {
  getAssociateDistinctApiCall,
  getAssociateNodeApiCall,
  getAssociateRoleDistinctApiCall,
  getAssociateGroupDistinctApiCall,
  associateCreatePopup,
  getAssociatesTypeApiCall,
  getInternalNodeApiCall
} from '../Actions/AssociateModuleAction';

const PopUpAssociatesModule = (props) => {
  const {
    associatesPopUpActive,
    currentPopUpOption,
    associatesPopUpType,
    associatesHeaderOne,
    associatesHeaderOneBadgeOne,
    secondaryOptionCheckValue,
    isBackToSectionPopUp
  } = useSelector((state) => state.AssociateCreateReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_ASSOCIATE_SECONDARY_OPTION_VALUE,
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
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: {
        stateName: 'scanString',
        value: ''
      }
    });
    dispatch({ type: ASSOCIATE_POPUP_CLOSE });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'information') {
      dispatch({ type: ASSOCIATE_CREATE_INFO });
      let parentAssociateId =
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary;
      associateCreatePopup(
        selectedAssociateInfo,
        dispatch,
        secondaryOptionCheckValue,
        targetValue,
        parentAssociateId
      );
      clearMiddlePaneInfo();
    } else if (targetValue === 'distinct') {
      if (secondaryOptionCheckValue === 'active') {
        getAssociateNodeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          targetValue,
          'distinct',
          'hierarchy'
        );
      } else {
        getAssociateDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          dispatch,
          countPage,
          targetValue
        );
      }

      resetDataFunction();
      // document.getElementById('middleComponentId').scrollTop = '0px';
    } else if (targetValue === 'roles') {
      getAssociateRoleDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'groups') {
      getAssociateGroupDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      resetDataFunction();
    } else if (targetValue === 'nodes') {
      // getAssociateNodeApiCall(
      //   selectedAssociateInfo,
      //   secondaryOptionCheckValue,
      //   countPage,
      //   dispatch,
      //   targetValue,
      //   'distinct',
      //   'hierarchy'
      // );

      getInternalNodeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue,
        '',
        'hierarchy',
        'associates'
      );
      resetDataFunction();
    } else if (targetValue === 'types') {
      getAssociatesTypeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'types'
      );
      resetDataFunction();
    } else {
      dispatch({
        type: SET_ASSOCIATE_NEXT_POPUP,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }
  };
  const clearMiddlePaneInfo = () => {
    dispatch({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: '',
        middlePaneHeaderBadgeOne: '',
        middlePaneHeaderBadgeTwo: '',
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: '',
        scanCount: null,
        showMiddlePaneState: false
      }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const BackHandlerEvent = (e) => {
    if (isBackToSectionPopUp) {
      dispatch({ type: CLEAR_ASSOCIATE_INFO });
      dispatch({ type: SET_PREVIOUS_SECTION_POPUP });
    } else {
      dispatch({ type: SET_ASSOCIATE_PREVIOUS_POPUP });
    }
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
            secondaryOptionCheckValue={secondaryOptionCheckValue}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAssociatesModule;
