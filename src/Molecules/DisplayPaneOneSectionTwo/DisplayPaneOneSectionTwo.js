import React from 'react';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../Card/Card';
import { setAssesseeCardPermissionInJson } from '../../Actions/GenericActions';
import { GROUP_NODE_ROLE_TYPE_POPUP_OPTION } from '../../PopUpConfig';
import { SET_POPUP_STATE } from '../../actionType';
import { useDispatch, useSelector } from 'react-redux';

const DisplayPaneOneSectionTwo = () => {
  const dispatch = useDispatch();
  const { assesseePermission = null } = useSelector((state) => state.UserReducer);
  const openDisplayPaneOneSectionTwoPopUp = (e) => {
    let popupContentArrValue = [];
    let popupHeaderOne = '';
    let popupHeaderOneBadgeOne = '';
    let value = '';
    if (e.currentTarget.getAttribute('data-value') !== '') {
      if (e.currentTarget.getAttribute('data-value') === 'career') {
        popupHeaderOne = 'igauge';
        popupHeaderOneBadgeOne = 'career';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_TWO_POPUP';
      }
      if (e.currentTarget.getAttribute('data-value') === 'education') {
        popupHeaderOne = 'igauge';
        popupHeaderOneBadgeOne = 'education';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_TWO_POPUP';
      }
      if (e.currentTarget.getAttribute('data-value') === 'occupation') {
        popupHeaderOne = 'igauge';
        popupHeaderOneBadgeOne = 'occupation';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_TWO_POPUP';
      }
      if (e.currentTarget.getAttribute('data-value') === 'pulse') {
        popupHeaderOne = 'igauge';
        popupHeaderOneBadgeOne = 'pulse';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_TWO_POPUP';
      }
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: popupHeaderOne,
          previousPopupHeaderOne: popupHeaderOne,
          popupHeaderOneBadgeOne: popupHeaderOneBadgeOne,
          isPopUpValue: value,
          popupOpenType: 'primary',
          popupContentArrValue: popupContentArrValue
        }
      });
    } else {
      console.log('openDisplayPaneOneSectionTwoPopUp in else ');
    }
  };
  return (
    <>
      <div
        className="paddingCard"
        onClick={openDisplayPaneOneSectionTwoPopUp}
        data-value={'career'}
      >
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="career" />
      </div>
      <div
        className="paddingCard"
        onClick={openDisplayPaneOneSectionTwoPopUp}
        data-value={'education'}
      >
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="education" />
      </div>
      <div
        className="paddingCard"
        onClick={openDisplayPaneOneSectionTwoPopUp}
        data-value={'occupation'}
      >
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="occupation" />
      </div>
      <div className="paddingCard" onClick={openDisplayPaneOneSectionTwoPopUp} data-value={'pulse'}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="pulse" />
      </div>
    </>
  );
};

export default DisplayPaneOneSectionTwo;
