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
  FILTERMODE,
  SET_MOBILE_PANE_STATE,
  LOADER_START,
  SET_REQUEST_OBJECT,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  ASSOCIATE_POPUP_CLOSE,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  SET_MIDDLEPANE_STATE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_POPUP_SINGLE_STATE
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  makeAssociateGroupObj,
  makeAssociateReviewListRequestObject,
  makeAssociateRoleObj
} from '../Actions/GenericActions';

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
  const ChangeOptionPopup = (e) => {
    let targetValue = e.currentTarget.getAttribute('data-value');
    if (targetValue === 'information') {
      dispatch({ type: ASSOCIATE_CREATE_INFO });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Create' }
      });
      dispatch({
        type: ASSOCIATE_SIGN_ON,
        payload: { isPopUpValue: 'NAMEALIASPOPUP', popupMode: 'ASSOCIATE_CREATE' }
      });
      let requestObj = makeAssociateGroupObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      let roleRequestObj = makeAssociateRoleObj(selectedAssociateInfo, 'all', 0, -1);
      dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });

      dispatch({
        type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: roleRequestObj,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: false
        }
      });
      clearMiddlePaneInfo();
    } else if (targetValue === 'distinct') {
      let requestObect = makeAssociateReviewListRequestObject(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        0,
        countPage
      );
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'associateDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
        payload: {
          request: requestObect,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue
        }
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'NoCard' }
      });
      dispatch({ type: ASSOCIATE_POPUP_CLOSE });
      // document.getElementById('middleComponentId').scrollTop = '0px';
    } else if (targetValue === 'roles') {
      let requestObj = makeAssociateRoleObj(secondaryOptionCheckValue);
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'associateRoleDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: true
        }
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'NoCard' }
      });
      dispatch({ type: ASSOCIATE_POPUP_CLOSE });
    } else if (targetValue === 'groups') {
      let requestObj = makeAssociateGroupObj(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        0,
        countPage
      );
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'associateGroupDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: true
        }
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'NoCard' }
      });
      dispatch({ type: ASSOCIATE_POPUP_CLOSE });
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
