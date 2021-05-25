import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  POPUP_CLOSE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_SECONDARY_CREATE_OPTION_VALUE,
  FILTERMODE
} from '../actionType';
import {
  getAssesseeDistinctApiCall,
  getAssesseeGroupDistinctApiCall,
  getAssesseeRoleDistinctApiCall,
  setFlagedArray
} from '../Actions/AssesseeModuleAction';
import {
  getAssociateDistinctApiCall,
  getAssociateGroupDistinctApiCall,
  getAssociateNodeApiCall,
  getAssociateRoleDistinctApiCall,
  getInternalNodeApiCall
} from '../Actions/AssociateModuleAction';
const PopUpMiddlePaneTrippleDot = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType,
    secondaryOptionCheckValue,
    selectedTagValue
  } = useSelector((state) => state.PopUpReducer);
  const {
    selectedAssociateInfo,
    countPage,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    reviewListDistinctData
  } = useSelector((state) => state.DisplayPaneTwoReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneCentre', isActive } = props;
  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_SECONDARY_CREATE_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = async (e) => {
    let keyVal = e.currentTarget.getAttribute('data-key');
    let dataVal = e.currentTarget.getAttribute('data-value');
    console.log(keyVal);
    console.log(dataVal);
    if (dataVal === 'create') {
      if (middlePaneHeader === 'assessees' && middlePaneHeaderBadgeOne === 'distinct') {
        keyVal = 'assesseeCreate';
      }
      if (middlePaneHeaderBadgeOne !== 'distinct') {
        keyVal = 'createKey';
      }
    }
    if (keyVal === 'distinctAPICall' && middlePaneHeader === 'assessees') {
      getAssesseeDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        dataVal
      );
      dispatch({ type: POPUP_CLOSE });
    } else if (keyVal === 'distinctAPICall' && middlePaneHeader === 'associates') {
      // getAssociateDistinctApiCall(
      //   selectedAssociateInfo,
      //   secondaryOptionCheckValue,
      //   dispatch,
      //   countPage,
      //   dataVal
      // );
      getAssociateNodeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'nodes',
        'distinct',
        'hierarchy'
      );
      dispatch({ type: POPUP_CLOSE });
    } else if (middlePaneHeader === 'assessees') {
      if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'groups') {
        getAssesseeGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'nodes') {
        getInternalNodeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'nodes',
          '',
          'hierarchy',
          'assessees'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'roles') {
        getAssesseeRoleDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          'roles',
          dispatch
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'groups') {
        getAssesseeGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'roles') {
        getAssesseeRoleDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dataVal,
          dispatch
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'nodes') {
        getInternalNodeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          '',
          'hierarchy',
          'assessees'
        );
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({
          type: SET_MIDDLEPANE_SECONDARY_OPTION,
          payload: { badgeValue: dataVal, keyValue: keyVal }
        });
      }
    } else if (middlePaneHeader === 'associates') {
      if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'groups') {
        getAssociateGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'nodes') {
        getAssociateNodeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'nodes',
          'distinct',
          'hierarchy'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'roles') {
        getAssociateRoleDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'roles'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'groups') {
        getAssociateGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'roles') {
        getAssociateRoleDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'roles'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'nodes') {
        getAssociateNodeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'nodes',
          'distinct',
          'hierarchy'
        );
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({
          type: SET_MIDDLEPANE_SECONDARY_OPTION,
          payload: { badgeValue: dataVal, keyValue: keyVal }
        });
      }
    } else if (dataVal === 'select') {
      // console.log(secondaryOptionCheckValue)
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: secondaryOptionCheckValue }
      });
      dispatch({ type: POPUP_CLOSE });
    } else if (dataVal === 'unselect') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: '' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'selectedTagsArray', value: [] }
      });
      dispatch({ type: POPUP_CLOSE });
    } else if (dataVal === 'flaged') {
      await setFlagedArray(reviewListDistinctData, 'assesseeFlag', dispatch);
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'flagedValue', value: secondaryOptionCheckValue + dataVal }
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeFlag' }
      });
      dispatch({ type: POPUP_CLOSE });
    } else if (dataVal === 'unflaged') {
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'flagedValue', value: '' }
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeDistinct' + middlePaneHeaderBadgeTwo }
      });
      dispatch({ type: POPUP_CLOSE });
    } else {
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: { badgeValue: dataVal, keyValue: keyVal }
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
          headerOneBadgeTwo={popupHeaderOneBadgeTwo}
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

export default PopUpMiddlePaneTrippleDot;
