import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_SIGN_ON,
  CLEAR_ASSESSEE_INFO,
  SET_ASSESSEE_NEXT_POPUP,
  SET_ASSESSEE_PREVIOUS_POPUP,
  SET_ASSESSEE_SECONDARY_OPTION_VALUE,
  SET_PREVIOUS_SECTION_POPUP,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  LOADER_START,
  SET_REQUEST_OBJECT,
  SET_PAGE_COUNT,
  FILTERMODE,
  SET_MOBILE_PANE_STATE,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_MIDDLEPANE_STATE,
  SET_POPUP_SINGLE_STATE,
  SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  INTERNAL_NODE_LIST_SAGA
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  makeAssesseeGroupObj,
  makeAssesseeRoleCreateObj,
  makeAssesseeRoleObj,
  makeInternalNodeObj
} from '../Actions/GenericActions';
import {
  getAssesseeDistinctApiCall,
  getAssesseeGroupDistinctApiCall,
  getAssesseeRoleAssesseeDistinctApiCall,
  getAssesseeRoleDistinctApiCall
} from '../Actions/AssesseeModuleAction';
import { getInternalNodeApiCall } from '../Actions/AssociateModuleAction';

const PopUpAssesseesModule = (props) => {
  const {
    currentPopUpOption,
    assesseesPopUpType,
    assesseesHeaderOne,
    assesseesHeaderOneBadgeOne,
    secondaryOptionCheckValue,
    isBackToSectionPopUp,
    assesseesPopUpActive
  } = useSelector((state) => state.AssesseeCreateReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft' } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_ASSESSEE_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');

    if (targetValue === 'information') {
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Create' }
      });
      dispatch({ type: ASSESSEE_INFO_CREATE });
      dispatch({ type: CLEAR_ASSESSEE_INFO });
      dispatch({ type: LOADER_START });
      let requestObj = makeAssesseeGroupObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({
        type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      let roleRequestObj = makeAssesseeRoleCreateObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
      dispatch({
        type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: roleRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      let nodeRequestObj = makeInternalNodeObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: nodeRequestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: {
          request: nodeRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      dispatch({
        type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'assesseeGroup',
          actualStateName: 'assesseeGroupPrimary',
          value: []
        }
      });
      dispatch({
        type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'assesseeRole',
          actualStateName: 'assesseeRolePrimary',
          value: []
        }
      });
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEENAMEPOPUP', popupMode: 'ASSESSEE_CREATE' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'selectedInformationAllorKey', value: secondaryOptionCheckValue }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'typeOfAssesseeCreate',
          value: 'assessee'
        }
      });
      clearMiddlePaneInfo();
    } else if (targetValue === 'distinct') {
      getAssesseeDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'NoCard' }
      });
      dispatch({ type: ASSESSEE_INFO_CREATE });
      // document.getElementById('middleComponentId').scrollTop = '0px';
    } else if (targetValue === 'roles') {
      getAssesseeRoleDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        targetValue,
        dispatch
      );
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'NoCard' }
      });
      dispatch({ type: ASSESSEE_INFO_CREATE });
    } else if (targetValue === 'groups') {
      getAssesseeGroupDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue
      );
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'NoCard' }
      });
      dispatch({ type: ASSESSEE_INFO_CREATE });
    } else if (targetValue === 'nodes') {
      dispatch({ type: ASSESSEE_INFO_CREATE });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'nodeViewState', value: 'hierarchy' }
      });
      getInternalNodeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        targetValue,
        '',
        'hierarchy',
        'assessees'
      );
    } else {
      dispatch({
        type: SET_ASSESSEE_NEXT_POPUP,
        payload: targetValue
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
      dispatch({ type: CLEAR_ASSESSEE_INFO });
      dispatch({ type: SET_PREVIOUS_SECTION_POPUP });
    } else {
      dispatch({ type: SET_ASSESSEE_PREVIOUS_POPUP });
    }
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
            secondaryOptionCheckValue={secondaryOptionCheckValue}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAssesseesModule;
