import React from 'react';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../Card/Card';
import { MODULE_POPUP_OPTION } from '../../PopUpConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setAssesseeCardPermissionInJson } from '../../Actions/GenericActions';
import { ASSESSEE_POPUP_OPEN, SET_POPUP_STATE } from '../../actionType';

const DisplayPaneOneSectionOne = () => {
  const dispatch = useDispatch();
  const { assesseePermission = null } = useSelector((state) => state.userReducer);

  const openAssesseesPopUp = () => {
    dispatch({ type: ASSESSEE_POPUP_OPEN });
  };

  const openDisplayPaneOneSectionOnePopUp = (e) => {
    let popupContentArrValue = [];
    let popupHeaderOne = '';
    let value = '';
    if (e.currentTarget.getAttribute('data-value') !== '') {
      if (e.currentTarget.getAttribute('data-value') === 'assessees') {
        popupHeaderOne = 'assessees';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          MODULE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      }
      if (e.currentTarget.getAttribute('data-value') === 'assessments') {
        popupHeaderOne = 'assessments';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          MODULE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      }
      if (e.currentTarget.getAttribute('data-value') === 'assignments') {
        popupHeaderOne = 'assignments';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          MODULE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      }
      if (e.currentTarget.getAttribute('data-value') === 'associates') {
        popupHeaderOne = 'associates';
        popupContentArrValue = setAssesseeCardPermissionInJson(
          MODULE_POPUP_OPTION,
          assesseePermission
        );
        value = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      }
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: popupHeaderOne,
          previousPopupHeaderOne: popupHeaderOne,
          popupHeaderOneBadgeOne: '',
          isPopUpValue: value,
          popupOpenType: 'primary',
          popupContentArrValue: popupContentArrValue
        }
      });
    } else {
      console.log('openDisplayPaneOneSectionOnePopUp in else ');
    }
  };
  return (
    <>
      <div className="paddingCard" onClick={openAssesseesPopUp} data-value={'assessees'}>
        <Card isIcon IconOne={ArrowRight} textOneOne="assessees" />
      </div>
      <div
        className="paddingCard"
        onClick={openDisplayPaneOneSectionOnePopUp}
        data-value={'assessments'}
      >
        <Card isIcon IconOne={ArrowRight} textOneOne="assessments" />
      </div>
      <div
        className="paddingCard"
        onClick={openDisplayPaneOneSectionOnePopUp}
        data-value={'assignments'}
      >
        <Card isIcon IconOne={ArrowRight} textOneOne="assignments" />
      </div>
      <div
        className="paddingCard"
        onClick={openDisplayPaneOneSectionOnePopUp}
        data-value={'associates'}
      >
        <Card isIcon IconOne={ArrowRight} textOneOne="associates" />
      </div>
    </>
  );
};

export default DisplayPaneOneSectionOne;
