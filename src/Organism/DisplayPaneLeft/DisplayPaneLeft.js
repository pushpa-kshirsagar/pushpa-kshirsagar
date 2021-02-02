import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import './DisplayPaneLeft';
import Sections from '../../Molecules/Sections/Section';
import LaftPaneFooter from '../../Molecules/LaftPaneFooter/LaftPaneFooter';

const displayPaneLeftSection1 = () => {
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
const displayPaneLeftSection2 = () => {
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
const displayPaneLeftSection3 = () => {
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
const displayPaneLeftSection4 = () => {
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

export const DisplayPaneLeft = () => {
  const leftPaneSections = [
    {
      id: 'section1',
      sectionComponent: displayPaneLeftSection1,
      displayPaneLeftHeaderText: 'dashboard',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: displayPaneLeftSection2,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'analytics'
    },
    {
      id: 'section3',
      sectionComponent: displayPaneLeftSection3,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'marketplace'
    },
    {
      id: 'section4',
      sectionComponent: displayPaneLeftSection4,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'mine'
    }
  ];
  const [selectedSection, setSelectedSection] = useState(leftPaneSections[0]);

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
      <div style={{ padding: '5px' }}>
        <div style={{ margin: '0 0 5px 0' }}>
          <Card ImageOne={PersonIcon} textOneOne="assesseeName" />
        </div>
        <div>
          <Card ImageOne={AssociateIcon} textOneOne="Boppo Technologies" />
        </div>
        <Sections
          listSections={leftPaneSections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
      <LaftPaneFooter />
    </>
  );
};

export default DisplayPaneLeft;
