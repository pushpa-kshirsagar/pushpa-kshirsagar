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
  assesseeCreateApiCalls,
  getAdminManagerDistinctApiCall,
  getAdminManagerRoleApiCall,
  getAssesseeDistinctApiCall,
  getAssesseeGroupDistinctApiCall,
  getAssesseeRoleDistinctApiCall,
  getAssesseeTypeApiCall,
  setFlagedArray
} from '../Actions/AssesseeModuleAction';
import {
  getAssociateDistinctApiCall,
  getAssociateGroupDistinctApiCall,
  getAssociateNodeApiCall,
  getAssociateRoleDistinctApiCall,
  getAssociatesTypeApiCall,
  getInternalNodeApiCall
} from '../Actions/AssociateModuleAction';
import {
  getItemGroupDistinctApiCall,
  getItemsDistinctApiCall,
  getItemsTypeApiCall
} from '../Actions/ItemModuleAction';
import {
  getAssessmentDistinctApiCall,
  getAssessmentGroupApiCall,
  getAssessmentTypeApiCall
} from '../Actions/AssessmentModuleAction';
import { assignmentsDistinctApiCall, assignmentsGroupApiCall, assignmentTypeApiCall } from '../Actions/AssignmentModuleAction';
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
      if (
        (middlePaneHeader === 'assessees' ||
          middlePaneHeader === 'administrators' ||
          middlePaneHeader === 'managers') &&
        middlePaneHeaderBadgeOne === 'distinct'
      ) {
        keyVal = 'assesseeCreate';
      }
      if (middlePaneHeaderBadgeOne !== 'distinct') {
        keyVal = 'createKey';
      }
    } else if (keyVal === 'distinctAPICall' && middlePaneHeader === 'assessees') {
      getAssesseeDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        dataVal
      );
      dispatch({ type: POPUP_CLOSE });
    } else if (
      keyVal === 'distinctAPICall' &&
      (middlePaneHeader === 'administrators' || middlePaneHeader === 'managers')
    ) {
      getAdminManagerDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        middlePaneHeader,
        dispatch
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
    } else if (keyVal === 'distinctAPICall' && middlePaneHeader === 'items') {
      getItemsDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        'items',
        dispatch
      );
      dispatch({ type: POPUP_CLOSE });
    } else if (keyVal === 'distinctAPICall' && middlePaneHeader === 'assessments') {
      getAssessmentDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'distinct'
      );
      dispatch({ type: POPUP_CLOSE });
    } else if (keyVal === 'distinctAPICall' && middlePaneHeader === 'assignments') {
      assignmentsDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'distinct'
      );
      dispatch({ type: POPUP_CLOSE });
    } else if (
      middlePaneHeader === 'assessees' ||
      middlePaneHeader === 'administrators' ||
      middlePaneHeader === 'managers'
    ) {
      if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'groups') {
        if (middlePaneHeader === 'assessees') {
          getAssesseeGroupDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            'groups'
          );
        }
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
          middlePaneHeader
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'roles') {
        if (middlePaneHeader === 'administrators' || middlePaneHeader === 'managers') {
          getAdminManagerRoleApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            popupHeaderOne,
            dispatch
          );
        } else {
          getAssesseeRoleDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            'roles',
            dispatch
          );
        }

        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'types') {
        getAssesseeTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          middlePaneHeader
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'groups') {
        if (middlePaneHeader === 'assessees') {
          getAssesseeGroupDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal
          );
        }
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'roles') {
        if (middlePaneHeader === 'administrators' || middlePaneHeader === 'managers') {
          getAdminManagerRoleApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            popupHeaderOne,
            dispatch
          );
        } else {
          getAssesseeRoleDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            'roles',
            dispatch
          );
        }
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
          middlePaneHeader
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'types') {
        getAssesseeTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          middlePaneHeader
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'information') {
        dispatch({ type: POPUP_CLOSE });
        if (
          (middlePaneHeader === 'assessees' ||
            middlePaneHeader === 'administrators' ||
            middlePaneHeader === 'managers') &&
          middlePaneHeaderBadgeOne === 'distinct'
        ) {
          assesseeCreateApiCalls(
            selectedAssociateInfo,
            dispatch,
            secondaryOptionCheckValue,
            middlePaneHeader === 'administrators'
              ? 'administrator'
              : middlePaneHeader === 'managers'
              ? 'manager'
              : 'assessee'
          );
        }
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
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'types') {
        getAssociatesTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          'associates'
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
      } else if (keyVal === 'types') {
        getAssociatesTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          'associates'
        );
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({
          type: SET_MIDDLEPANE_SECONDARY_OPTION,
          payload: { badgeValue: dataVal, keyValue: keyVal }
        });
      }
    } else if (middlePaneHeader === 'items') {
      if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'groups') {
        getItemGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'types') {
        getItemsTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          middlePaneHeader
        );
      } else if (keyVal === 'groups') {
        getItemGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'types') {
        getItemsTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          middlePaneHeader
        );
      } else {
        dispatch({
          type: SET_MIDDLEPANE_SECONDARY_OPTION,
          payload: { badgeValue: dataVal, keyValue: keyVal }
        });
      }
    } else if (middlePaneHeader === 'assessments') {
      if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'groups') {
        getAssessmentGroupApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'types') {
        getAssessmentTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types'
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
          'assessments'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'groups') {
        getAssessmentGroupApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'types') {
        getAssessmentTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'nodes') {
        getInternalNodeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'nodes',
          '',
          'hierarchy',
          'assessments'
        );
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({
          type: SET_MIDDLEPANE_SECONDARY_OPTION,
          payload: { badgeValue: dataVal, keyValue: keyVal }
        });
      }
    } else if (middlePaneHeader === 'assignments') {
      if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'groups') {
        assignmentsGroupApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'distinct' && popupHeaderOneBadgeOne === 'types') {
        assignmentTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types'
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
          'assignments'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'groups') {
        assignmentsGroupApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'types') {
        assignmentTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types'
        );
        dispatch({ type: POPUP_CLOSE });
      } else if (keyVal === 'nodes') {
        getInternalNodeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'nodes',
          '',
          'hierarchy',
          'assignments'
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
