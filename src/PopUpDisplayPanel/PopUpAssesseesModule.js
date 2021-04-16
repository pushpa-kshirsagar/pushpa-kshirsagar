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
  CLEAR_DISPLAY_PANE_THREE
} from '../actionType';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  makeAssesseeGroupObj,
  makeAssesseeReviewListRequestObject,
  makeAssesseeRoleObj
} from '../Actions/GenericActions';

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
  const { countPage } = useSelector((state) => state.DisplayPaneTwoReducer);

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
      dispatch({ type: ASSESSEE_INFO_CREATE });
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
    } else if (targetValue === 'distinct') {
      let requestObect = makeAssesseeReviewListRequestObject(
        secondaryOptionCheckValue,
        0,
        countPage
      );
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
      dispatch({
        type: ASSESSEE_REVIEW_DISTINCT_SAGA,
        payload: {
          HeaderOne: 'assessees',
          request: requestObect,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue
        }
      });
      dispatch({ type: ASSESSEE_INFO_CREATE });
      // document.getElementById('middleComponentId').scrollTop = '0px';
    } else if (targetValue === 'roles') {
      let requestObj = makeAssesseeRoleObj(secondaryOptionCheckValue);
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeRoleDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: true
        }
      });
      dispatch({ type: ASSESSEE_INFO_CREATE });
    } else if (targetValue === 'groups') {
      let requestObj = makeAssesseeGroupObj(secondaryOptionCheckValue, 0, countPage);
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseesGroupDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: targetValue,
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: true
        }
      });
      dispatch({ type: ASSESSEE_INFO_CREATE });
    } else {
      dispatch({
        type: SET_ASSESSEE_NEXT_POPUP,
        payload: targetValue
      });
    }
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
