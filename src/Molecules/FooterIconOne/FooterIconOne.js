import React from 'react';
import { Keyboard, Description, InsertDriveFile, BusinessCenter } from '@material-ui/icons';
import IconButton from '../IconButton/IconButton';
import '../FooterIconTwo/FooterIconTwo.css';
import { useDispatch, useSelector } from 'react-redux';

import { SET_POPUP_STATE, SET_GRID_COLUMN_COUNT_VALUE } from '../../actionType';
import PopUpIcon from '../../PopUpIcon/PopUpIcon';
import {
  CALCULATOR_POPUP_ARR,
  MANUSCRIPT_POPUP_ARR,
  WORKSHEET_POPUP_ARR,
  GAUGE_POPUP_ARR,
  INTERNET_POPUP_ARR,
  TOOLKIT_POPUP_ARR,
  TEMPLATE_POPUP_ARR,
  ALIGNMENT_POPUP_ARR
} from '../../PopUpConfig';
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
          popupOpenType: 'primary',
          popupContentArrValue: WORKSHEET_POPUP_ARR
        }
      });
    }
    if (clickedValue === 'toolkit') {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'toolkit',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'LEFTFOOTER',
          popupOpenType: 'primary',
          popupContentArrValue: TOOLKIT_POPUP_ARR
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
          popupOpenType: 'primary',
          popupContentArrValue: MANUSCRIPT_POPUP_ARR
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
          popupOpenType: 'primary',
          popupContentArrValue: CALCULATOR_POPUP_ARR
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
          popupOpenType: 'secondary',
          popupContentArrValue: TEMPLATE_POPUP_ARR
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
          popupOpenType: 'tertiary',
          popupContentArrValue: ALIGNMENT_POPUP_ARR
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
          popupOpenType: 'secondary',
          popupContentArrValue: GAUGE_POPUP_ARR
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
          popupOpenType: 'tertiary',
          popupContentArrValue: INTERNET_POPUP_ARR
        }
      });
    }
    if (clickedValue === 'textsheet') {
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
    if (clickedValue === 'spreadsheet') {
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
      valueArr = GAUGE_POPUP_ARR;
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
        onClickEvent={openFooterIconPopup}
      />
    </div>
  );
};

export default FooterIconOne;
