import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../../Molecules/Card/Card';
import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import CalculatorIcon from '@material-ui/icons/Keyboard';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import './DisplayPaneOne.css';
import Sections from '../../Molecules/Sections/Section';
import FooterIconOne from '../../Molecules/FooterIconOne/FooterIconOne';
import PopUpForCommonOnClick from '../../PopUpOption/PopUpForCommonOnClick';
import { useDispatch, useSelector } from 'react-redux';
import Worksheet from '@material-ui/icons/InsertDriveFile';
import GaugeIcon from '@material-ui/icons/Dashboard';
import ManuscriptIcon from '@material-ui/icons/Description';

import {
  SET_POPUP_STATE,
  ASSESSEE_CARD_POPUP_OPTIONS,
  ASSOCIATE_CARD_POPUP_OPTION,
  POPUP_OPEN,
  SET_GRID_COLUMN_COUNT_VALUE
} from '../../actionType';
import PopUpIcon from '../../PopUpComponent/PopUpIcon';
import TemplateIcon from '@material-ui/icons/BorderClear';

const DisplayPaneLeftSection1 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="assessees" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="assessments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="assignments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="associates" />
      </div>
    </>
  );
};
const DisplayPaneLeftSection2 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="career" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="education" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="occupation" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGauge" textTwoOne="pulse" />
      </div>
    </>
  );
};
const DisplayPaneLeftSection3 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="career" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="education" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="occupation" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGuru" textTwoOne="pulse" />
      </div>
    </>
  );
};
const DisplayPaneLeftSection4 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="assessees" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="assessments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="assignments" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="iGem" textTwoOne="associates" />
      </div>
    </>
  );
};

export const DisplayPaneOne = () => {
  const leftPaneSections = [
    {
      id: 'section1',
      sectionComponent: DisplayPaneLeftSection1,
      displayPaneLeftHeaderText: 'dashboard',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: DisplayPaneLeftSection2,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'analytics'
    },
    {
      id: 'section3',
      sectionComponent: DisplayPaneLeftSection3,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'marketplace'
    },
    {
      id: 'section4',
      sectionComponent: DisplayPaneLeftSection4,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'mine'
    }
  ];
  const [selectedSection, setSelectedSection] = useState(leftPaneSections[0]);
  const [selectedAllignmnetIcon, setSelectedAllignmnetIcon] = useState('');
  const { isPopUpValue, gridColumnCountValue, popupHeaderOneDuplicate } = useSelector(
    (state) => state.PopUpReducer
  );
  const dispatch = useDispatch();
  const openFooterIconPopup = (e) => {
    console.log(e.currentTarget.getAttribute('data-value'));
    console.log(popupHeaderOneDuplicate);
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
          popupHeaderOneDuplicate: 'toolkit',
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
          popupHeaderOneDuplicate: 'toolkit',
          isPopUpValue: 'LEFTFOOTER',
          isSecondaryPopup: true,
          popupContentArrValue: alignmentPopupArr
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
      setSelectedAllignmnetIcon(clickedValue);
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
  const openAssesseeCardPopup = (e) => {
    let popupContentArrValue = [];
    let popupHeaderOne = '';
    if (e.currentTarget.getAttribute('data-value') === 'assessee_card') {
      popupHeaderOne = 'assessee';
      popupContentArrValue = ASSESSEE_CARD_POPUP_OPTIONS;
    }
    if (e.currentTarget.getAttribute('data-value') === 'associate_card') {
      popupHeaderOne = 'associate';
      popupContentArrValue = ASSOCIATE_CARD_POPUP_OPTION;
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: popupHeaderOne,
        popupHeaderOneBadgeOne: '',
        isPopUpValue: 'CARD_POPUP',
        popupContentArrValue: popupContentArrValue
      }
    });
  };
  const BackHandlerEvent = () => {
    alert(popupHeaderOneDuplicate);
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: popupHeaderOneDuplicate,
        popupHeaderOneBadgeOne: '',
        isSecondaryPopup: false,
        popupContentArrValue: toolkitPopupArr
      }
    });
  };

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="left"
          headerOne={selectedSection.displayPaneLeftHeaderText}
          headerOneBadgeOne={selectedSection.displayPaneLeftBadgeText}
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        <div className="containerPadding">
          <Card
            ImageOne={PersonIcon}
            textOneOne="assesseeName"
            onClick={openAssesseeCardPopup}
            tag={'assessee_card'}
          />
        </div>
        <div className="containerPadding">
          <Card
            ImageOne={AssociateIcon}
            textOneOne="Boppo Technologies"
            onClick={openAssesseeCardPopup}
            tag={'associate_card'}
          />
        </div>
        <Sections
          listSections={leftPaneSections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      <FooterIconOne onClickEvent={openFooterIconPopup} />
      <PopUpIcon
        isActive={isPopUpValue === 'LEFTFOOTER'}
        headerPanelColour="displayPaneLeft"
        selectedIcon={selectedAllignmnetIcon}
        setSelectedIcon={setSelectedAllignmnetIcon}
        BackHandlerEvent={BackHandlerEvent}
      />
      <PopUpForCommonOnClick isActive={isPopUpValue === 'CARD_POPUP'} />
    </>
  );
};

export default DisplayPaneOne;
