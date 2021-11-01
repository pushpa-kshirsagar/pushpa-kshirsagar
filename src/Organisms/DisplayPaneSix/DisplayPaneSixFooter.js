import React, { useState } from 'react';
import { Keyboard, Description, InsertDriveFile, BusinessCenter } from '@material-ui/icons';
import Communique from '@material-ui/icons/EventNote';
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconButton from '../../Molecules/IconButton/IconButton';
import '../../Molecules/FooterIcon/FooterIconTwo.css';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import { useDispatch, useSelector } from 'react-redux';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import { CALCULATOR_POPUP_ARR, GAUGE_POPUP_ARR, TEMPLATE_POPUP_ARR, TOOLKIT_POPUP_ARR, WORKSHEET_POPUP_ARR } from '../../PopUpConfig';
import { SET_POPUP_STATE } from '../../actionType';
import PopUpIcon from '../../PopUpIcon/PopUpIcon';

export const DisplayPaneSixFooter = () => {
  const [isDisplayPaneShow, setIsDisplayPaneShow] = useState(true);
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();
  const {
    assesseeAssignmentAssessmentData,
    assesseeAssessmentStartData,
    isAssessmentStart,
    asssignmentStarted,
    currentSectionIndexValue
  } = useSelector((state) => state.AssesseeAssignmentAssessmentReducer);
  const { isPopUpValue, popupHeaderOne, popupHeaderOneBadgeOne } = useSelector(
    (state) => state.PopUpReducer
  );
  const openFooterIconPopup = (e) => {
    debugger;
    let clickedval = e.currentTarget.getAttribute('data-value');
    if (clickedval === 'calculator') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'calculator',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          popupOpenType: 'primary',
          popupContentArrValue: CALCULATOR_POPUP_ARR
        }
      });
    }
    if (clickedval === 'worksheet') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'worksheet',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          popupOpenType: 'primary',
          popupContentArrValue: WORKSHEET_POPUP_ARR
        }
      });
    }
    if (clickedval === 'textsheet') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'textsheet',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'TEXTSHEET_POPUP',
          popupOpenType: 'secondary',
          popupContentArrValue: []
        }
      });
    }
    if (clickedval === 'spreadsheet') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'spreadsheet',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'SPREADSHEET_POPUP',
          popupOpenType: 'secondary',
          popupContentArrValue: []
        }
      });
    }
    setIsDisplayPaneShow(true);
  }
  const BackHandlerEvent = () => {
    let revisePopupHeaderOne = '';
    let valueArr = [];
    let revisePopupType = '';
    let reviseIsPopUpValue = '';
    if (popupHeaderOne === 'template' && popupHeaderOneBadgeOne === 'alignment') {
      revisePopupHeaderOne = 'template';
      valueArr = TEMPLATE_POPUP_ARR;
      revisePopupType = 'secondary';
      reviseIsPopUpValue = 'LEFTFOOTER';
    }
    if (popupHeaderOne === 'template' && popupHeaderOneBadgeOne === '') {
      revisePopupHeaderOne = 'tooltip';
      revisePopupType = 'primary';
      valueArr = TOOLKIT_POPUP_ARR;
      reviseIsPopUpValue = 'LEFTFOOTER';
    }
    if (popupHeaderOne === 'gauge' && popupHeaderOneBadgeOne === '') {
      revisePopupHeaderOne = 'tooltip';
      revisePopupType = 'primary';
      valueArr = TOOLKIT_POPUP_ARR;
      reviseIsPopUpValue = 'LEFTFOOTER';
    }
    if (popupHeaderOne === 'gauge' && popupHeaderOneBadgeOne === 'internet') {
      revisePopupHeaderOne = 'gauge';
      revisePopupType = 'secondary';
      valueArr = GAUGE_POPUP_ARR  ;
      reviseIsPopUpValue = 'LEFTFOOTER';
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: revisePopupHeaderOne,
        popupHeaderOneBadgeOne: '',
        isPopUpValue: reviseIsPopUpValue,
        popupOpenType: revisePopupType,
        popupContentArrValue: valueArr
      }
    });
  };
  let aid = assesseeAssessmentStartData?.assessmentSection[currentSectionIndexValue]?.assessmentSectionAid;
  console.log('current aid setting', aid);

  const reviseSecondaryIcons = [
    { label: 'calculator', onClick: openFooterIconPopup, Icon: Keyboard, colour: "displayPaneLeft", disabled: aid?.assessmentSectionAidCalculatorPermission ? false : true 
  },
    { label: 'communiqué', onClick: openFooterIconPopup, Icon: Communique, colour: "displayPaneLeft", },
    { label: 'manuscript', onClick: openFooterIconPopup, Icon: Description, colour: "displayPaneLeft" },
    { label: 'synopsis', onClick: openFooterIconPopup, Icon: Description, colour: "displayPaneLeft" },
    { label: 'toolkit', onClick: openFooterIconPopup, Icon: BusinessCenter, colour: "displayPaneLeft" },
    { label: 'worksheet', onClick: openFooterIconPopup, Icon: InsertDriveFile, colour: "displayPaneLeft" }
  ];

  const onClickRevise = () => {
    setIsDisplayPaneShow(false);
  }
  const revisePrimaryIcon = [{ label: 'click', onClick: onClickRevise, Icon: ReviseIcon, colour: "displayPaneLeft" }];
  return (
    <>
      <FooterIconTwo
        //className={'widthDisplayPaneFive'}
        FilterModeEnable={isDisplayPaneShow}
        FilterMode={FilterMode}
        onClick={onClickRevise}
        primaryIcon={revisePrimaryIcon}
        secondaryIcon={reviseSecondaryIcons}
        backColour="displayPaneLeft"
      />
      <PopUpIcon
        isActive={isPopUpValue === 'LEFTFOOTER'}
        headerPanelColour="displayPaneLeft"
        BackHandlerEvent={BackHandlerEvent}
        onClickEvent={openFooterIconPopup}
      />
      {/* <div className={'middleFooterD'}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <IconButton Icon={Keyboard} className="" colour="displayPaneLeft" label="calculator" />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <IconButton Icon={Communique} className="" colour="displayPaneLeft" label="communiqué" />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <IconButton Icon={Description} className="" colour="displayPaneLeft" label="manuscript" />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <IconButton Icon={BusinessCenter} className="" colour="displayPaneLeft" label="toolkit" />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <IconButton Icon={AssessmentIcon} className="" colour="displayPaneLeft" label="trial" />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <IconButton
            Icon={InsertDriveFile}
            className=""
            colour="displayPaneLeft"
            label="worksheet"
          />
        </div>
      </div> */}
    </>



  );
};

export default DisplayPaneSixFooter;
