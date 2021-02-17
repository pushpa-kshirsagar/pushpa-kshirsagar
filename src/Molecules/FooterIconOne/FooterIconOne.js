import React from 'react';
import { Keyboard, Description, InsertDriveFile, BusinessCenter } from '@material-ui/icons';
import IconButton from '../IconButton/IconButton';
import '../FooterIconTwo/FooterIconTwo.css';
import { useDispatch, useSelector } from 'react-redux';
import Worksheet from '@material-ui/icons/InsertDriveFile';
import GaugeIcon from '@material-ui/icons/Dashboard';
import ManuscriptIcon from '@material-ui/icons/Description';

import { SET_POPUP_STATE, SET_GRID_COLUMN_COUNT_VALUE } from '../../actionType';
import PopUpIcon from '../../PopUpComponent/PopUpIcon';
import TemplateIcon from '@material-ui/icons/BorderClear';
import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import CalculatorIcon from '@material-ui/icons/Keyboard';

export const FooterIconOne = (props) => {
  const {
    isPopUpValue,
    gridColumnCountValue,
    popupHeaderOne,
    popupHeaderOneBadgeOne
  } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const openFooterIconPopup = (e) => {
    console.log(e.currentTarget.getAttribute('data-value'));
    let clickedValue = e.currentTarget.getAttribute('data-value');
    if (clickedValue === 'worksheet') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'worksheet',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: false,
          popupContentArrValue: worksheetPopupArr
        }
      });
    }
    if (clickedValue === 'toolkit') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'toolkit',
          popupHeaderOneDuplicate: 'toolkit',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: false,
          popupContentArrValue: toolkitPopupArr
        }
      });
    }
    if (clickedValue === 'manuscript') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'manuscript',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: false,
          popupContentArrValue: manusriptPopupArr
        }
      });
    }
    if (clickedValue === 'calculator') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'calculator',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: false,
          popupContentArrValue: calculatorPopupArr
        }
      });
    }
    if (clickedValue === 'template') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'template',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: true,
          popupContentArrValue: templatePopupArr
        }
      });
    }
    if (clickedValue === 'alignment') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'template',
          popupHeaderOneBadgeOne: 'alignment',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: true,
          popupContentArrValue: alignmentPopupArr
        }
      });
    }
    if (clickedValue === 'gauge') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'gauge',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: true,
          popupContentArrValue: gaugePopupArr
        }
      });
    }
    if (clickedValue === 'internet') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'gauge',
          popupHeaderOneBadgeOne: 'internet',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: true,
          popupContentArrValue: internetPopupArr
        }
      });
    }
    if (
      clickedValue === 'oneColumn' ||
      clickedValue === 'twoColumn' ||
      clickedValue === 'threeColumn' ||
      clickedValue === 'fourColumn' ||
      clickedValue === 'fiveColumn' ||
      clickedValue === 'sixColumn'
    ) {
      let countval =
        (clickedValue === 'oneColumn' && 1) ||
        (clickedValue === 'twoColumn' && 2) ||
        (clickedValue === 'threeColumn' && 3) ||
        (clickedValue === 'fourColumn' && 4) ||
        (clickedValue === 'fiveColumn' && 5) ||
        (clickedValue === 'sixColumn' && 6);
      dispatch({
        type: SET_GRID_COLUMN_COUNT_VALUE,
        payload: countval
      });
      console.log(gridColumnCountValue + '*****');
    }
  };
  const calculatorPopupArr = [
    { lable: 'basic', dataValue: 'basic', Icon: CalculatorIcon },
    { lable: 'buisness', dataValue: 'buisness', Icon: CalculatorIcon },
    { lable: 'financial', dataValue: 'financial', Icon: CalculatorAdvancedIcon },
    { lable: 'scientific', dataValue: 'scientific', Icon: CalculatorAdvancedIcon }
  ];
  const toolkitPopupArr = [
    { lable: 'gauge', dataValue: 'gauge', Icon: GaugeIcon, onClickEvent: openFooterIconPopup },
    {
      lable: 'template',
      dataValue: 'template',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    }
  ];
  const manusriptPopupArr = [
    { lable: 'assessment', dataValue: 'assessment', Icon: ManuscriptIcon }
  ];
  const worksheetPopupArr = [
    { lable: 'google', labelTwo: 'spreadsheet', dataValue: 'google spreadsheet', Icon: Worksheet },
    { lable: 'google', labelTwo: 'textsheet', dataValue: 'google textsheet', Icon: Worksheet },
    {
      lable: 'microsoft',
      labelTwo: 'spreadsheet',
      dataValue: 'microsoft spreadsheet',
      Icon: Worksheet
    },
    {
      lable: 'microsoft',
      labelTwo: 'textsheet',
      dataValue: 'microsoft textsheet',
      Icon: Worksheet
    },
    { lable: 'spreadsheet', dataValue: 'spreadsheet', Icon: Worksheet },
    { lable: 'textsheet', dataValue: 'textsheet', Icon: Worksheet }
  ];
  const gaugePopupArr = [
    {
      lable: 'internet',
      dataValue: 'internet',
      Icon: GaugeIcon,
      onClickEvent: openFooterIconPopup
    }
  ];
  const internetPopupArr = [
    {
      lable: 'ookla speedtest',
      dataValue: 'ooklaspeedtest',
      Icon: GaugeIcon,
      onClickEvent: openFooterIconPopup
    }
  ];
  const templatePopupArr = [
    {
      lable: 'alignment',
      dataValue: 'alignment',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    }
  ];
  const alignmentPopupArr = [
    {
      id: 1,
      lable: 'one',
      labelTwo: 'column',
      dataValue: 'oneColumn',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    },
    {
      id: 2,
      lable: 'two',
      labelTwo: 'column',
      dataValue: 'twoColumn',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    },
    {
      id: 3,
      lable: 'three',
      labelTwo: 'column',
      dataValue: 'threeColumn',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    },
    {
      id: 4,
      lable: 'four',
      labelTwo: 'column',
      dataValue: 'fourColumn',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    },
    {
      id: 5,
      lable: 'five',
      labelTwo: 'column',
      dataValue: 'fiveColumn',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    },
    {
      id: 6,
      lable: 'six',
      labelTwo: 'column',
      dataValue: 'sixColumn',
      Icon: TemplateIcon,
      onClickEvent: openFooterIconPopup
    }
  ];
  const BackHandlerEvent = () => {
    let revisePopupHeaderOne = '';
    let valueArr = [];
    let ReviseIsSecondaryPopup = false;

    if (popupHeaderOne === 'template' && popupHeaderOneBadgeOne === 'alignment') {
      revisePopupHeaderOne = 'template';
      valueArr = templatePopupArr;
      ReviseIsSecondaryPopup = true;
    }
    if (popupHeaderOne === 'template' && popupHeaderOneBadgeOne === '') {
      revisePopupHeaderOne = 'tooltip';
      ReviseIsSecondaryPopup = false;
      valueArr = toolkitPopupArr;
    }
    if (popupHeaderOne === 'gauge' && popupHeaderOneBadgeOne === '') {
      revisePopupHeaderOne = 'tooltip';
      ReviseIsSecondaryPopup = false;
      valueArr = toolkitPopupArr;
    }
    if (popupHeaderOne === 'gauge' && popupHeaderOneBadgeOne === 'internet') {
      revisePopupHeaderOne = 'gauge';
      ReviseIsSecondaryPopup = true;
      valueArr = gaugePopupArr;
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: revisePopupHeaderOne,
        popupHeaderOneBadgeOne: '',
        isPopUpValue: 'LEFTFOOTER',
        isSecondaryPopup: ReviseIsSecondaryPopup,
        popupContentArrValue: valueArr
      }
    });
  };
  return (
    <div className={'middleFooterD'}>
      <div style={{ flex: 1, textAlign: 'center' }}></div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton
          Icon={Keyboard}
          className=""
          colour="displayPaneLeft"
          label="calculator"
          dataValue="calculator"
          onClick={openFooterIconPopup}
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton
          Icon={Description}
          className=""
          colour="displayPaneLeft"
          label="manuscript"
          dataValue="manuscript"
          onClick={openFooterIconPopup}
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton
          Icon={BusinessCenter}
          className=""
          colour="displayPaneLeft"
          label="toolkit"
          dataValue="toolkit"
          onClick={openFooterIconPopup}
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <IconButton
          Icon={InsertDriveFile}
          className=""
          colour="displayPaneLeft"
          label="worksheet"
          dataValue="worksheet"
          onClick={openFooterIconPopup}
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}></div>
      <PopUpIcon
        isActive={isPopUpValue === 'LEFTFOOTER'}
        headerPanelColour="displayPaneLeft"
        BackHandlerEvent={BackHandlerEvent}
      />
    </div>
  );
};

export default FooterIconOne;
