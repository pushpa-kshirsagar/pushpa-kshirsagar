import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import './DisplayPaneOne.css';
import Sections from '../../Molecules/Sections/Section';
import FooterIconOne from '../../Molecules/FooterIconOne/FooterIconOne';
import PopUpForCommonOnClick from '../../PopUpOption/PopUpForCommonOnClick';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_POPUP_STATE,
  ASSESSEE_CARD_POPUP_OPTIONS,
  ASSOCIATE_CARD_POPUP_OPTION
} from '../../actionType';

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
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);

  const dispatch = useDispatch();

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
      <FooterIconOne />
      <PopUpForCommonOnClick isActive={isPopUpValue === 'CARD_POPUP'} />
    </>
  );
};

export default DisplayPaneOne;
