import React, { useState } from 'react';
import ArrowRight from '@material-ui/icons/ChevronRight';
import TelephoneVerified from '@material-ui/icons/Call';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import BasicCard from '../../Molecules/BasicCard/BasicCard';
import Card from '../../Molecules/Card/Card';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import Sections from '../../Molecules/Sections/Section';
import Accordian from '../../Molecules/Accordian/Accordian';
import './DisplayPaneRight';

const displayPaneRightSection1 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        {/* <Card isIcon IconOne={ArrowRight} textOneOne="alliance" /> */}
        <Accordian
          IconOne={TelephoneVerified}
          IconTwo={VerifiedUserIcon}
          className={null}
          headerOne="alliance"
          isListSelect
          labelTextOneOne="group"
          labelTextOneOneBadgeFour=""
          labelTextOneOneBadgeOne="primary"
          labelTextOneOneBadgeThree=""
          labelTextOneOneBadgeTwo="secondary"
          textOneOne="sample@gmail.com"
        />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="allocation" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="engagement" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="setup" />
      </div>
    </>
  );
};
const displayPaneRightSection2 = () => {
  return (
    <>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="career" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="contact" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="credential" />
      </div>
      <div style={{ padding: '2.5px' }}>
        <Card isIcon IconOne={ArrowRight} textOneOne="personal" />
      </div>
    </>
  );
};

export const DisplayPaneRight = () => {
  const rightPaneSections = [
    {
      id: 'section1',
      sectionComponent: displayPaneRightSection1,
      displayPaneLeftHeaderText: 'dashboard',
      displayPaneLeftBadgeText: ''
    },
    {
      id: 'section2',
      sectionComponent: displayPaneRightSection2,
      displayPaneLeftHeaderText: 'iGuru',
      displayPaneLeftBadgeText: 'analytics'
    }
  ];
  const [selectedSection, setSelectedSection] = useState(rightPaneSections[0]);

  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="right"
          headerOne="associate"
          headerOneBadgeOne="information"
          headerOneBadgeTwo="all"
          headerOneBadgeThree=""
          headerPanelColour="green"
        />
      </div>
      <div
        style={{
          padding: '5px',
          height: 'calc(100vh - 207px)',
          overflow: 'overlay',
          marginBottom: '10px'
        }}
      >
        <BasicCard
          isAlertActive
          isFlagActive
          className=""
          labelTextOneOne="name"
          labelTextOneTwo="alias"
          textOneOne="Sample Text"
          textOneTwo="No Information"
        />
        <Sections
          listSections={rightPaneSections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>
    </>
  );
};

export default DisplayPaneRight;
